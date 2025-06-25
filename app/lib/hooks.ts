import { useEffect, useState } from "react"
import { checkGameWin, initGame, refreshMinesLeft, revealEmptyCells, revealMines } from "./util"
import { board, gameStatus, level, LEVELS, minesLeft } from "./consts"
import { getTimerRunning, resetTimer, startTimer, stopTimer } from "../components/Timer"
import { playSoundEffect } from "./sfx"

export function useRefresh() {
  const f = useState(false)[1]
  return () => f((prev) => !prev)
}

export function useMinesweeper() {
  const currentLevel = LEVELS[level.value]

  function startNewGame(row?: number, col?: number) {
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

  function openCell(row: number, col: number) {
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

  useEffect(() => startNewGame(), [level.value])

  useEffect(() => {
    if (gameStatus.value !== `playing`) stopTimer()
  })

  function handleCellLeftClick(row: number, col: number) {
    if (gameStatus.value === `lose` || board.value[row][col].isOpened || board.value[row][col].isFlagged) return

    openCell(row, col)
  }

  function handleCellRightClick(row: number, col: number) {
    if (gameStatus.value !== `playing` || board.value[row][col].isOpened) return
    if (minesLeft.value === 0 && !board.value[row][col].isFlagged) return

    const cell = board.value[row][col]

    if (cell.isFlagged) {
      playSoundEffect(`FLAG_REMOVE`)
    } else {
      playSoundEffect(`FLAG_REMOVE`)
    }

    cell.isFlagged = !cell.isFlagged

    refreshMinesLeft()

    board.refresh?.()
  }

  return { handleCellLeftClick, handleCellRightClick, startNewGame }
}
