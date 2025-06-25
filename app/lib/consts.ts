import { Signal } from "./classes"
import { initGame } from "./util"

export const CELL_NUMBER_COLORS = [
  null,
  `text-[blue]`,
  `text-[green]`,
  `text-[tomato]`,
  `text-[darkviolet]`,
  `text-[darkred]`,
  `text-[steelblue]`,
  `text-[black]`,
  `text-[black]`,
]

export const DIRECTIONS = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
]

export const LEVELS = {
  easy: {
    rows: 9,
    cols: 9,
    totalMines: 10,
  },
  medium: {
    rows: 16,
    cols: 16,
    totalMines: 40,
  },
  expert: {
    rows: 16,
    cols: 30,
    totalMines: 99,
  },
}

export const SOUNDS = {
  REVEAL_EMPTY: "revealEmpty.wav",
  REVEAL_NUMBER: "revealNumber.wav",
  FLAG_PLACE: "flagPlace.wav",
  FLAG_REMOVE: "flagRemove.wav",
  GAME_OVER: "gameOver.wav",
  GAME_WIN: "gameWin.wav",
}

export const gameStatus = new Signal<TGameStatus>(`playing`)
export const level = new Signal<TLevel>(`easy`)
export const timer = new Signal(0)
export const minesLeft = new Signal(0)
export const board = new Signal<TBoard>(
  initGame(LEVELS[level.value].rows, LEVELS[level.value].cols, LEVELS[level.value].totalMines)
)
