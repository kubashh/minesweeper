import { getTimerRunning, resetTimer, startTimer } from "../components/Timer"
import { board, DIRECTIONS, gameStatus, level, LEVELS, minesLeft } from "./consts"
import { playSoundEffect } from "./sfx"

export function nowS() {
  return performance.now() / 1000
}

function createBoard(rows: number, cols: number) {
  const board: TBoard = []

  for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
    board[rowIndex] = []

    for (let cellIndex = 0; cellIndex < cols; cellIndex++) {
      board[rowIndex][cellIndex] = {
        value: null,
        isFlagged: false,
        isOpened: false,
      }
    }
  }

  return board
}

function randIndex(max: number) {
  return Math.floor(Math.random() * max)
}

export function initBoard(rows: number, cols: number, totalMines: number) {
  const newBoard = createBoard(rows, cols)

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

          if (newRow in newBoard && newCol in row && newBoard[newRow][newCol].value === `mine`) minesAround++
        })

        if (minesAround > 0) cell.value = minesAround
      }
    })
  })

  return newBoard
}

export function initGame(rows: number, cols: number, totalMines: number) {
  return initBoard(rows, cols, totalMines)
}

export function revealEmptyCells(row: number, col: number) {
  const queue: [number, number][] = [[row, col]]

  while (queue.length > 0) {
    const n = queue.shift()
    if (!n) return
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

export function checkGameWin(totalMines: number) {
  let unopenedCells = 0

  for (const row of board.value) for (const cell of row) if (!cell.isOpened) unopenedCells++

  return unopenedCells === totalMines
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

export function startNewGame(row?: number, col?: number) {
  const currentLevel = LEVELS[level.value]

  gameStatus.value = `playing`
  resetTimer()

  let newBoard = initGame(currentLevel.rows, currentLevel.cols, currentLevel.totalMines)
  if (row && col) {
    while (newBoard[row][col].value === `mine`) {
      newBoard = initGame(currentLevel.rows, currentLevel.cols, currentLevel.totalMines)
    }
    openCell(row, col)
  }
  board.value = newBoard
  refreshMinesLeft()
}

export function openCell(row: number, col: number) {
  const isFirstTime = !getTimerRunning()

  if (!getTimerRunning()) startTimer()

  const cell = board.value[row][col]
  const isMineCell = cell.value === `mine`
  const isNumberCell = typeof cell.value && !!cell.value
  const isEmptyCell = !cell.value

  if (isMineCell) {
    if (isFirstTime) return startNewGame(row, col)

    playSoundEffect(`GAME_OVER`)
    cell.isOpened = true
    gameStatus.value = `lose`
    cell.hightlight = `bg-[red]`
    revealMines(false)
  } else {
    if (isNumberCell) {
      playSoundEffect(`REVEAL_NUMBER`)
      cell.isOpened = true
    } else if (isEmptyCell) {
      playSoundEffect(`REVEAL_EMPTY`)
      revealEmptyCells(row, col)
    }

    if (checkGameWin(10)) {
      playSoundEffect(`GAME_WIN`)
      revealMines(true)
      gameStatus.value = `win`
    }
  }

  board.refresh?.()
}
