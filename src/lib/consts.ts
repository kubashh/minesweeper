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

export const game = {
  isFirstTime: true,
  ...LEVELS.easy,
}

export const gameStatus = signal<TGameStatus>(`playing`)
export const level = signal<TLevel>(`easy`)
export const timer = signal(0)
export const minesLeft = signal(game.totalMines)
export const board = signal<TBoard>(createBoard())
