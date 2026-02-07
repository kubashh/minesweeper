import { resetTimer, startTimer } from "../components/Timer"
import { board, DIRECTIONS, game, gameStatus, minesLeft } from "./consts"
import { sounds } from "./sfx"

export function startNewGame(cell?: GameCell) {
  if (cell) {
    const [row, col] = getRowCol(cell)
    board.value = getValidBoard(row, col)
    setTimeout(() => openCell(board.value[row][col]))
  } else {
    board.value = createBoard()
  }

  game.isFirstTime = true
  gameStatus.value = `playing`
  resetTimer()
  refreshMinesLeft()
}

export function createBoard() {
  let newBoard = createEmptyBoard()
  newBoard = fillBoardMines(newBoard)
  newBoard = fillBoardNumbers(newBoard)
  return newBoard
}

function createEmptyBoard(): TBoard {
  return Array.from({ length: game.rows }, () =>
    Array.from({ length: game.cols }, () => ({
      value: 0,
      isFlagged: false,
      isOpened: false,
    })),
  )
}

function fillBoardMines(newBoard: TBoard) {
  for (let mines = 0; mines < game.totalMines; ) {
    const row = randIndex(game.rows)
    const col = randIndex(game.cols)

    if (newBoard[row][col].value !== `mine`) {
      ;(newBoard[row][col] as GameCell).value = `mine`
      mines++
    }
  }

  return newBoard
}

function fillBoardNumbers(newBoard: TBoard) {
  newBoard.map((row, rowIndex) => {
    row.map((cell, colIndex) => {
      if (cell.value !== `mine`) {
        let minesAround = 0

        DIRECTIONS.map(([dRow, dCol]) => {
          const newRow = rowIndex + dRow
          const newCol = colIndex + dCol

          if (newRow in newBoard && newCol in row && newBoard[newRow][newCol].value === `mine`)
            minesAround++
        })

        if (minesAround > 0) cell.value = minesAround
      }
    })
  })

  return newBoard
}

export function revealEmptyCells(cell: GameCell) {
  const queue: Point[] = [getRowCol(cell)]

  let n: Point | undefined
  while ((n = queue.shift())) {
    const [currentRow, currentCol] = n

    const cell = board.value[currentRow][currentCol]
    cell.isOpened = true

    if (!cell.value) {
      for (const [dRow, dCol] of DIRECTIONS) {
        const newRow = currentRow + dRow
        const newCol = currentCol + dCol

        if (
          newRow in board.value &&
          newCol in board.value[0] &&
          !board.value[newRow][newCol].isOpened &&
          !board.value[newRow][newCol].isFlagged
        ) {
          queue.push([newRow, newCol])
        }
      }
    }
  }
}

export function revealMines(highlightWin?: boolean) {
  for (const row of board.value)
    for (const cell of row)
      if (cell.value === `mine`) {
        cell.isOpened = true
        if (highlightWin) cell.hightlight = `bg-[green]`
      }
}

export function openCell(cell: GameCell) {
  startTimer()

  if (cell.value === `mine`) {
    if (game.isFirstTime) return startNewGame(cell)

    sounds.gameOver.play()
    cell.isOpened = true
    cell.hightlight = `bg-[red]`
    gameStatus.value = `lose`
    revealMines(false)
  } else {
    if (typeof cell.value && !!cell.value) {
      sounds.revealNumber.play()
      cell.isOpened = true
    } else if (!cell.value) {
      sounds.revealEmpty.play()
      revealEmptyCells(cell)
    }

    if (checkGameWin()) {
      sounds.gameWin.play()
      revealMines(true)
      gameStatus.value = `win`
    }
  }

  game.isFirstTime = false
  board.refresh?.()
}

export function checkGameWin() {
  let unopenedCells = 0

  for (const row of board.value) for (const cell of row) if (!cell.isOpened) unopenedCells++

  return unopenedCells === game.totalMines
}

export function refreshMinesLeft() {
  let mines = 0

  for (const row of board.value)
    for (const cell of row) {
      if (cell.value === `mine`) mines++
      if (cell.isFlagged) mines--
    }

  minesLeft.value = mines
}

function getValidBoard(row: number, col: number) {
  let newBoard
  do newBoard = createBoard()
  while (newBoard[row][col].value === `mine`)

  return newBoard
}

function getRowCol(cellToFind: GameCell): Point {
  const i = board.value.flat().findIndex((cell) => cell === cellToFind)
  return [Math.floor(i / game.cols), i % game.cols]
}

export function nowS() {
  return performance.now() / 1000
}

function randIndex(max: number) {
  return Math.floor(Math.random() * max)
}
