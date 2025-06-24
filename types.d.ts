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
  cell: GameCeil
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

type ClosedCeil = {
  isOpened: false
  isFlagged: boolean
}

type MineCeil = {
  value: `mine`
  hightlight?: `bg-[red]` | `bg-[green]`
}

type NumberCeil = {
  value: number
}

type EmptyCeil = {
  value: null
  isFlagged: false
  isOpened: false
}

type OpenedMineCeil = OpenedCail & MineCeil
type ClosedMineCeil = ClosedCeil & MineCeil
type OpenedNumberCeil = OpenedCail & NumberCeil
type ClosedNumberCeil = ClosedCeil & NumberCeil

type GameCeil = OpenedMineCeil | ClosedMineCeil | OpenedNumberCeil | ClosedNumberCeil | EmptyCeil

type TBoard = GameCeil[][]

// Sounds
type TSoundName = `REVEAL_EMPTY` | `REVEAL_NUMBER` | `FLAG_PLACE` | `FLAG_REMOVE` | `GAME_OVER` | `GAME_WIN`

type TSoundList = Record<TSoundName, HTMLAudioElement>
