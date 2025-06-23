/// <reference types="next" />
/// <reference types="next/image-types/global" />

type RootLayoutProps = Readonly<{ children: React.ReactNode }>

type BoardProps = {
  board: TBoard
  handleCellLeftClick: (a: number, b: number) => void
  level: TLevel
}

type CellProps = {
  cell: GameCeil
  handleCellLeftClick: (a: number, b: number) => void
  rowIndex: number
  colIndex: number
  level: TLevel
}

type TLevel = `easy` | `medium` | `expert`

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
