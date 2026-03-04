import { resetTimer, startTimer } from "../components/Timer";
import { board, boardRefresh, DIRECTIONS, game, gameStatusSignal, minesLeftSignal } from "./consts";
import { sounds } from "./sfx";

export function startNewGame(cell?: GameCell) {
  if (cell) {
    const [row, col] = getRowCol(cell);
    // Create valid board
    do createBoard();
    while (board[row][col].value === `mine`);
    setTimeout(() => openCell(board[row][col]));
  } else {
    createBoard();
  }

  game.isFirstTime = true;
  gameStatusSignal.set(`playing`);
  resetTimer();
  refreshMinesLeft();
  boardRefresh.refresh();
}

export function createBoard() {
  let newBoard = createEmptyBoard();
  board.length = newBoard.length;
  for (const index in newBoard) {
    board.length = newBoard.length;
    board[index] = newBoard[index];
  }
  fillBoardMines();
  fillBoardNumbers();
}

function createEmptyBoard(): TBoard {
  return Array.from({ length: game.rows }, () =>
    Array.from({ length: game.cols }, () => ({
      value: 0,
      isFlagged: false,
      isOpened: false,
    })),
  );
}

function fillBoardMines() {
  for (let mines = 0; mines < game.totalMines; ) {
    const row = randIndex(game.rows);
    const col = randIndex(game.cols);

    if (board[row][col].value !== `mine`) {
      (board[row][col] as GameCell).value = `mine`;
      mines++;
    }
  }
}

function fillBoardNumbers() {
  board.map((row, rowIndex) => {
    row.map((cell, colIndex) => {
      if (cell.value !== `mine`) {
        let minesAround = 0;

        for (const [dRow, dCol] of DIRECTIONS) {
          const newRow = rowIndex + dRow;
          const newCol = colIndex + dCol;

          if (newRow in board && newCol in row && board[newRow][newCol].value === `mine`) minesAround++;
        }

        if (minesAround > 0) cell.value = minesAround;
      }
    });
  });
}

export function revealEmptyCells(cell: GameCell) {
  const queue: Point[] = [getRowCol(cell)];

  let n: Point | undefined;
  while ((n = queue.shift())) {
    const [currentRow, currentCol] = n;

    const cell = board[currentRow][currentCol];
    cell.isOpened = true;

    if (!cell.value) {
      for (const [dRow, dCol] of DIRECTIONS) {
        const newRow = currentRow + dRow;
        const newCol = currentCol + dCol;

        if (
          newRow in board &&
          newCol in board[0] &&
          !board[newRow][newCol].isOpened &&
          !board[newRow][newCol].isFlagged
        ) {
          queue.push([newRow, newCol]);
        }
      }
    }
  }
}

function getRowCol(cellToFind: GameCell): Point {
  const i = board.flat().findIndex((cell) => cell === cellToFind);
  return [Math.floor(i / game.cols), i % game.cols];
}

export function revealMines(highlightWin?: boolean) {
  for (const row of board)
    for (const cell of row)
      if (cell.value === `mine`) {
        cell.isOpened = true;
        if (highlightWin) cell.hightlight = `bg-[green]`;
      }
}

export function openCell(cell: GameCell) {
  startTimer();

  if (cell.value === `mine`) {
    if (game.isFirstTime) return startNewGame(cell);

    sounds.gameOver.play();
    cell.isOpened = true;
    cell.hightlight = `bg-[red]`;
    gameStatusSignal.set(`lose`);
    revealMines(false);
  } else {
    if (cell.value) {
      sounds.revealNumber.play();
      cell.isOpened = true;
    } else if (!cell.value) {
      sounds.revealEmpty.play();
      revealEmptyCells(cell);
    }

    if (checkGameWin()) {
      sounds.gameWin.play();
      revealMines(true);
      gameStatusSignal.set(`win`);
    }
  }

  game.isFirstTime = false;
  boardRefresh.refresh();
}

export function checkGameWin() {
  let unopenedCells = 0;

  for (const row of board) for (const cell of row) if (!cell.isOpened) unopenedCells++;

  return unopenedCells === game.totalMines;
}

export function refreshMinesLeft() {
  let mines = 0;

  for (const row of board)
    for (const cell of row) {
      if (cell.value === `mine`) mines++;
      if (cell.isFlagged) mines--;
    }

  minesLeftSignal.set(mines);
}

export function nowS() {
  return performance.now() / 1000;
}

function randIndex(max: number) {
  return Math.floor(Math.random() * max);
}
