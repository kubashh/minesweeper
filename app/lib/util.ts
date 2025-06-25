import { DIRECTIONS } from "./consts"

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

export function revealEmptyCells(board: TBoard, row: number, col: number) {
  const queue: [number, number][] = [[row, col]]

  while (queue.length > 0) {
    const n = queue.shift()
    if (!n) return
    const [currentRow, currentCol] = n

    const cell = board[currentRow][currentCol]
    cell.isOpened = true

    if (!cell.value) {
      for (const [dRow, dCol] of DIRECTIONS) {
        const newRow = currentRow + dRow
        const newCol = currentCol + dCol

        if (
          newRow in board &&
          newCol in board[0] &&
          !board[newRow][newCol].isOpened &&
          !board[newRow][newCol].isFlagged
        ) {
          queue.push([newRow, newCol])
        }
      }
    }
  }
}

export function revealMines(board: TBoard, highlightWin?: boolean) {
  for (const row of board)
    for (const cell of row)
      if (cell.value === `mine`) {
        cell.isOpened = true
        if (highlightWin) cell.hightlight = `bg-[green]`
      }
}

export function checkGameWin(board: TBoard, totalMines: number) {
  let unopenedCells = 0

  for (const row of board) for (const cell of row) if (!cell.isOpened) unopenedCells++

  return unopenedCells === totalMines
}

export function getMinesLeft(board: TBoard) {
  let minesLeft = 0

  for (const row of board)
    for (const cell of row) {
      if (cell.value === `mine`) minesLeft++
      if (cell.isFlagged) minesLeft--
    }

  return minesLeft
}
