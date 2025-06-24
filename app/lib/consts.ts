export const CEIL_NUMBER_COLORS = [
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

export const DEFAULT_LEVEL: TLevel = `easy`

export const SOUNDS = {
  REVEAL_EMPTY: "reveal_empty.wav",
  REVEAL_NUMBER: "reveal_number.wav",
  FLAG_PLACE: "flag_place.wav",
  FLAG_REMOVE: "flag_remove.wav",
  GAME_OVER: "game_over.wav",
  GAME_WIN: "game_win.wav",
}
