import { useEffect, useState } from "react"
import { checkGameWin, initGame, revealEmptyCells, revealMines } from "./util"
import { DEFAULT_LEVEL, LEVELS } from "./consts"

export function useMinesweeper() {
  const [level, setLevel] = useState(DEFAULT_LEVEL)
  const currentLevel = LEVELS[level]

  const [board, setGameBoard] = useState(
    initGame(LEVELS[DEFAULT_LEVEL].rows, LEVELS[DEFAULT_LEVEL].cols, LEVELS[DEFAULT_LEVEL].totalMines)
  )
  const [gameState, setGameState] = useState<`` | `lose` | `win`>(``)

  function resetBoard() {
    setGameState(``)
    setGameBoard(initGame(currentLevel.rows, currentLevel.cols, currentLevel.totalMines))
  }

  useEffect(() => resetBoard(), [level])

  function handleCellLeftClick(row: number, col: number) {
    if (gameState === `lose` || board[row][col].isOpened || board[row][col].isFlagged) return

    const newBoard: TBoard = JSON.parse(JSON.stringify(board))

    const cell = newBoard[row][col]
    const isMineCell = cell.value === `mine`
    const isNumberCell = typeof cell.value && !!cell.value
    const isEmptyCell = !cell.value

    if (isMineCell) {
      cell.isOpened = true
      setGameState(`lose`)
      cell.hightlight = `bg-[red]`
      revealMines(newBoard, false)
    } else {
      if (isNumberCell) cell.isOpened = true
      else if (isEmptyCell) revealEmptyCells(newBoard, LEVELS[level].rows, LEVELS[level].cols, row, col)

      if (checkGameWin(newBoard, 10)) {
        setGameState(`win`)
        revealMines(board, true)
      }
    }

    setGameBoard(newBoard)
  }

  return { board, handleCellLeftClick, level, setLevel }
}
