/// <reference types="next" />
/// <reference types="next/image-types/global" />

// Props
type RootLayoutProps = Readonly<{ children: React.ReactNode }>

type BoardProps = {
  board: TBoard
  level: TLevel
  handleCellLeftClick: (a: number, b: number) => void
  handleCellRightClick: (a: React.MouseEvent<HTMLDivElement>, row: number, col: number) => void
}

type CellProps = {
  cell: GameCell
  rowIndex: number
  colIndex: number
  level: TLevel
  handleCellLeftClick: (a: number, b: number) => void
  handleCellRightClick: (a: React.MouseEvent<HTMLDivElement>, row: number, col: number) => void
}

type HeaderProps = GameStatusProps &
  TimerDisplayProps & {
    startNewGame: () => void
  }

type GameStatusProps = {
  gameState: TGameStatus
  minesLeft: number
}

type TimerDisplayProps = {
  timeDiff: number
}

// Game
type TGameStatus = `` | `lose` | `win`
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

type EmptyCell = {
  value: null
  isFlagged: false
  isOpened: false
}

type OpenedMineCell = OpenedCail & MineCell
type ClosedMineCell = ClosedCell & MineCell
type OpenedNumberCell = OpenedCail & NumberCell
type ClosedNumberCell = ClosedCell & NumberCell

type GameCell = OpenedMineCell | ClosedMineCell | OpenedNumberCell | ClosedNumberCell | EmptyCell

type TBoard = GameCell[][]

// Sounds
type TSoundName = `REVEAL_EMPTY` | `REVEAL_NUMBER` | `FLAG_PLACE` | `FLAG_REMOVE` | `GAME_OVER` | `GAME_WIN`

type TSoundList = Record<TSoundName, HTMLAudioElement>
