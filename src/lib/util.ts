import { getTimerRunning, resetTimer, startTimer } from "../components/Timer"
import { board, DIRECTIONS, gameStatus, level, LEVELS, minesLeft } from "./consts"
import { sounds } from "./sfx"

export function nowS() {
  return performance.now() / 1000
}

function createBoard() {
  const { rows, cols } = LEVELS[level.value]

  const newBoard: TBoard = []

  for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
    newBoard[rowIndex] = []

    for (let cellIndex = 0; cellIndex < cols; cellIndex++) {
      newBoard[rowIndex][cellIndex] = {
        value: 0,
        isFlagged: false,
        isOpened: false,
      }
    }
  }

  return newBoard
}

function randIndex(max: number) {
  return Math.floor(Math.random() * max)
}

export function initGame() {
  const { rows, cols, totalMines } = LEVELS[level.value]
  const newBoard = createBoard()

  for (let mines = 0; mines < totalMines; ) {
    const row = randIndex(rows)
    const col = randIndex(cols)

    if (newBoard[row][col].value !== `mine`) {
      ;(newBoard[row][col] as GameCell).value = `mine`
      mines++
    }
  }

  newBoard.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      if (cell.value !== `mine`) {
        let minesAround = 0

        DIRECTIONS.forEach(([dRow, dCol]) => {
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
  const queue: [number, number][] = [getRowCol(cell)]

  let n: [number, number] | undefined
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
  const isFirstTime = !getTimerRunning()

  if (!getTimerRunning()) startTimer()

  if (cell.value === `mine`) {
    if (isFirstTime) return startNewGame(cell)

    sounds.GAME_OVER.play()
    cell.isOpened = true
    cell.hightlight = `bg-[red]`
    gameStatus.value = `lose`
    revealMines(false)
  } else {
    if (typeof cell.value && !!cell.value) {
      sounds.REVEAL_NUMBER.play()
      cell.isOpened = true
    } else if (!cell.value) {
      sounds.REVEAL_EMPTY.play()
      revealEmptyCells(cell)
    }

    if (checkGameWin()) {
      sounds.GAME_WIN.play()
      revealMines(true)
      gameStatus.value = `win`
    }
  }

  board.refresh?.()
}

export function checkGameWin() {
  let unopenedCells = 0

  for (const row of board.value) for (const cell of row) if (!cell.isOpened) unopenedCells++

  return unopenedCells === LEVELS[level.value].totalMines
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
  let newBoard = initGame()
  while (newBoard[row][col].value === `mine`) {
    newBoard = initGame()
  }

  return newBoard
}

export function startNewGame(cell?: GameCell) {
  if (cell) {
    const [row, col] = getRowCol(cell)
    board.value = getValidBoard(row, col)
    setTimeout(() => openCell(board.value[row][col]))
  } else {
    board.value = initGame()
  }

  gameStatus.value = `playing`
  resetTimer()
  refreshMinesLeft()
}

function getRowCol(cellToFind: GameCell): [number, number] {
  const { rows, cols } = LEVELS[level.value]
  for (let row = 0; row < rows; row++)
    for (let col = 0; col < cols; col++) {
      if (board.value[row][col] === cellToFind) return [row, col]
    }

  throw Error(`No such cell!`)
}
