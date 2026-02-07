/// <reference types="next" />
/// <reference types="next/image-types/global" />

module "*.css" {}

// Simple
type Point = [number, number]

// Props
type CellProps = { cell: GameCell }

// Game
type TGameStatus = `playing` | `lose` | `win`

type TLevel = `easy` | `medium` | `expert`

// Cell
type OpenedCail = {
  isOpened: true
  isFlagged: false
}

type ClosedCell = {
  isOpened: false
  isFlagged: boolean
}

type MineCell = {
  value: `mine`
  hightlight?: `bg-[red]` | `bg-[green]`
}

type NumberCell = {
  value: number
}

type OpenedMineCell = OpenedCail & MineCell
type ClosedMineCell = ClosedCell & MineCell
type OpenedNumberCell = OpenedCail & NumberCell
type ClosedNumberCell = ClosedCell & NumberCell

type GameCell = OpenedMineCell | ClosedMineCell | OpenedNumberCell | ClosedNumberCell

type TBoard = GameCell[][]

// Sounds
type TSoundName = `revealEmpty` | `revealNumber` | `flagPlace` | `flagRemove` | `gameOver` | `gameWin`

type TSoundList = Record<TSoundName, HTMLAudioElement>
