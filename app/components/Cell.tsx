import clsx from "clsx"
import bombImage from "@/public/icons/bomb.svg"
import flagImage from "@/public/icons/redFlag.png"
import { board, CELL_NUMBER_COLORS, gameStatus, level, minesLeft } from "../lib/consts"
import { openCell, refreshMinesLeft } from "../lib/util"
import { playSoundEffect } from "../lib/sfx"

function handleCellLeftClick(row: number, col: number) {
  if (gameStatus.value === `lose` || board.value[row][col].isOpened || board.value[row][col].isFlagged) return

  openCell(row, col)
}

function handleCellRightClick(row: number, col: number) {
  if (gameStatus.value !== `playing` || board.value[row][col].isOpened) return
  if (minesLeft.value === 0 && !board.value[row][col].isFlagged) return

  const cell = board.value[row][col]

  if (cell.isFlagged) {
    playSoundEffect(`FLAG_REMOVE`)
  } else {
    playSoundEffect(`FLAG_REMOVE`)
  }

  cell.isFlagged = !cell.isFlagged

  refreshMinesLeft()

  board.refresh?.()
}

export default function Cell({ cell, rowIndex, colIndex }: CellProps) {
  return (
    <div
      className={clsx(
        `w-9 h-9 border-1 border-zinc-600 flex justify-center items-center text-2xl font-bold cursor-default relative`,
        typeof cell.value === `number` && CELL_NUMBER_COLORS[cell.value],
        !cell.isOpened &&
          `bg-[#ccc] border-3 border-t-[#eee] border-l-[#eee] border-r-[#aaa] border-b-[#aaa] shadow-sm`,
        !cell.isOpened && level.value === `easy` && `border-5`,
        cell.value === `mine` && cell.hightlight,
        level.value === `easy` && `w-16 h-16 text-4xl`,
        !cell.isOpened && `cursor-pointer`
      )}
      onClick={() => handleCellLeftClick(rowIndex, colIndex)}
      onContextMenu={() => handleCellRightClick(rowIndex, colIndex)}
    >
      {(cell.isOpened && typeof cell.value === `number` && cell.value) || ``}
      {cell.isOpened && cell.value === `mine` && <img className="w-[80%] h-[80%]" src={bombImage.src} />}
      {!cell.isOpened && cell.isFlagged && <img className="w-[80%] h-[80%]" src={flagImage.src} />}
    </div>
  )
}
