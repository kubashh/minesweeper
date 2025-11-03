import { signal } from "./signals"
import { createBoard } from "./util"

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

export const game = {
  isFirstTime: true,
}

export const gameStatus = signal<TGameStatus>(`playing`)
export const level = signal<TLevel>(`easy`)
export const timer = signal(0)
export const minesLeft = signal(LEVELS.easy.totalMines)
export const board = signal<TBoard>(createBoard())
