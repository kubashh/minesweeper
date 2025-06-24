import { useEffect, useState } from "react"
import { checkGameWin, deepCopy, getMinesLeft, initGame, nowS, revealEmptyCells, revealMines } from "./util"
import { DEFAULT_LEVEL, LEVELS, SOUNDS } from "./consts"

function useRefresh() {
  const f = useState(false)[1]
  return () => f((prev) => !prev)
}

function useTimer() {
  const refresh = useRefresh()
  const [timeStarted, setTimeStarted] = useState<number>(0)

  const realDiff = nowS() - timeStarted
  const timeDiff = Math.floor(realDiff)

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
    if (timeStarted) setTimeout(refresh, (timeDiff - realDiff + 1) * 1000)
  })

  return {
    startTimer,
    stopTimer,
    resetTimer,
    timeDiff,
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
  const [level, setLevel] = useState(DEFAULT_LEVEL)
  const currentLevel = LEVELS[level]
  const [, setTotalFlags] = useState(0)

  const [board, setGameBoard] = useState(
    initGame(LEVELS[DEFAULT_LEVEL].rows, LEVELS[DEFAULT_LEVEL].cols, LEVELS[DEFAULT_LEVEL].totalMines)
  )
  const [gameState, setGameState] = useState<TGameStatus>(``)

  const { playSoundEffect } = useSFX()

  function startNewGame() {
    setGameState(``)
    resetTimer()
    setTotalFlags(0)
    setGameBoard(initGame(currentLevel.rows, currentLevel.cols, currentLevel.totalMines))
  }

  useEffect(() => startNewGame(), [level])

  const minesLeft = getMinesLeft(board)
  const { startTimer, stopTimer, resetTimer, timeDiff, timerRunning } = useTimer()

  useEffect(() => {
    if (gameState !== ``) stopTimer()
  })

  function handleCellLeftClick(row: number, col: number) {
    if (gameState === `lose` || board[row][col].isOpened || board[row][col].isFlagged) return

    const isFirstTime = !timerRunning

    if (!timerRunning) startTimer()

    const newBoard: TBoard = deepCopy(board)

    const cell = newBoard[row][col]
    const isMineCell = cell.value === `mine`
    const isNumberCell = typeof cell.value && !!cell.value
    const isEmptyCell = !cell.value

    if (isMineCell) {
      if (isFirstTime) {
        startNewGame()
        handleCellLeftClick(row, col)
        return
      }

      playSoundEffect(`GAME_OVER`)
      cell.isOpened = true
      setGameState(`lose`)
      cell.hightlight = `bg-[red]`
      revealMines(newBoard, false)
    } else {
      if (isNumberCell) {
        playSoundEffect(`REVEAL_NUMBER`)
        cell.isOpened = true
      } else if (isEmptyCell) {
        playSoundEffect(`REVEAL_EMPTY`)
        revealEmptyCells(newBoard, LEVELS[level].rows, LEVELS[level].cols, row, col)
      }

      if (checkGameWin(newBoard, 10)) {
        playSoundEffect(`GAME_WIN`)
        revealMines(board, true)
        setGameState(`win`)
      }
    }

    setGameBoard(newBoard)
  }

  function handleCellRightClick(e: React.MouseEvent<HTMLDivElement>, row: number, col: number) {
    e.preventDefault()

    if (gameState !== `` || board[row][col].isOpened) return
    if (minesLeft === 0 && !board[row][col].isFlagged) return

    setGameBoard((prev) => {
      const newBoard: TBoard = deepCopy(prev)
      const cell = newBoard[row][col]

      if (cell.isFlagged) {
        playSoundEffect(`FLAG_REMOVE`)
      } else {
        playSoundEffect(`FLAG_REMOVE`)
      }

      setTotalFlags((prev) => (cell.isFlagged ? -1 : 1 + prev))
      cell.isFlagged = !cell.isFlagged

      return newBoard
    })
  }

  return {
    board,
    level,
    setLevel,
    gameState,
    handleCellLeftClick,
    handleCellRightClick,
    timeDiff,
    minesLeft,
    startNewGame,
  }
}
