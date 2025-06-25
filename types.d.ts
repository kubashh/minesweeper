/// <reference types="next" />
/// <reference types="next/image-types/global" />

// Props
type RootLayoutProps = Readonly<{ children: React.ReactNode }>

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
type TSoundName = `REVEAL_EMPTY` | `REVEAL_NUMBER` | `FLAG_PLACE` | `FLAG_REMOVE` | `GAME_OVER` | `GAME_WIN`

type TSoundList = Record<TSoundName, HTMLAudioElement>
