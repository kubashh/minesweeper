import { useEffect, useState } from "react"
import { checkGameWin, getMinesLeft, initGame, nowS, revealEmptyCells, revealMines } from "./util"
import { board, gameStatus, level, LEVELS, minesLeft, SOUNDS, timer } from "./consts"

export function useRefresh() {
  const f = useState(false)[1]
  return () => f((prev) => !prev)
}

function useTimer() {
  const refresh = useRefresh()

  const [timeStarted, setTimeStarted] = useState<number>(0)

  const realDiff = nowS() - timeStarted

  if (timeStarted) timer.value = Math.floor(realDiff)

  function startTimer() {
    setTimeStarted(nowS())
  }

  function stopTimer() {
    setTimeStarted(0)
  }

  function resetTimer() {
    startTimer()
    // refresh()
    setTimeout(() => setTimeStarted(0))
  }

  useEffect(() => {
    if (timeStarted) setTimeout(refresh, (timer.value - realDiff + 1) * 1000)
  })

  return {
    startTimer,
    stopTimer,
    resetTimer,
    timerRunning: Boolean(timeStarted),
  }
}

function useSFX() {
  const [soundsList, setSoundsList] = useState<TSoundList | null>(null)

  useEffect(() => {
    if (!soundsList) {
      const list: TSoundList = {} as TSoundList

      for (const sound in SOUNDS) {
        list[sound as TSoundName] = new Audio(`${location.pathname}/sfx/${SOUNDS[sound as TSoundName]}`)
        list[sound as TSoundName].load()
      }

      setSoundsList(list)
    }
  })

  function playSoundEffect(name: TSoundName) {
    if (!soundsList) return
    const audio = soundsList[name]
    audio.pause()
    audio.currentTime = 0
    audio.play()
  }

  return { playSoundEffect }
}

export function useMinesweeper() {
  const currentLevel = LEVELS[level.value]
  const [, setTotalFlags] = useState(0)

  const { playSoundEffect } = useSFX()

  function startNewGame(row?: number, col?: number) {
    gameStatus.value = `playing`
    resetTimer()
    setTotalFlags(0)
    let newBoard = initGame(currentLevel.rows, currentLevel.cols, currentLevel.totalMines)
    if (row && col) {
      while (newBoard[row][col].value === `mine`) {
        newBoard = initGame(currentLevel.rows, currentLevel.cols, currentLevel.totalMines)
      }
      openCell(row, col)
    }
    board.value = newBoard
  }

  function openCell(row: number, col: number) {
    const isFirstTime = !timerRunning

    if (!timerRunning) startTimer()

    const newBoard = board.value

    const cell = newBoard[row][col]
    const isMineCell = cell.value === `mine`
    const isNumberCell = typeof cell.value && !!cell.value
    const isEmptyCell = !cell.value

    if (isMineCell) {
      if (isFirstTime) return startNewGame(row, col)

      playSoundEffect(`GAME_OVER`)
      cell.isOpened = true
      gameStatus.value = `lose`
      cell.hightlight = `bg-[red]`
      revealMines(newBoard, false)
    } else {
      if (isNumberCell) {
        playSoundEffect(`REVEAL_NUMBER`)
        cell.isOpened = true
      } else if (isEmptyCell) {
        playSoundEffect(`REVEAL_EMPTY`)
        revealEmptyCells(newBoard, row, col)
      }

      if (checkGameWin(newBoard, 10)) {
        playSoundEffect(`GAME_WIN`)
        revealMines(board.value, true)
        gameStatus.value = `win`
      }
    }

    board.value = newBoard
  }

  useEffect(() => startNewGame(), [level.value])

  minesLeft.value = getMinesLeft(board.value)
  const { startTimer, stopTimer, resetTimer, timerRunning } = useTimer()

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

    setTotalFlags((prev) => (cell.isFlagged ? -1 : 1 + prev))
    cell.isFlagged = !cell.isFlagged

    board.refresh?.()
  }

  return { handleCellLeftClick, handleCellRightClick, startNewGame }
}
