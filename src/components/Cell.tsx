import clsx from "clsx"
import bombImage from "@/public/icons/bomb.svg"
import flagImage from "@/public/icons/redFlag.png"
import { board, CELL_NUMBER_COLORS, gameStatus, level, minesLeft } from "../lib/consts"
import { openCell, refreshMinesLeft } from "../lib/util"
import { sounds } from "../lib/sfx"

function handleCellLeftClick(cell: GameCell) {
  if (gameStatus.value === `lose` || cell.isOpened || cell.isFlagged) return

  openCell(cell)
}

function handleCellRightClick(cell: GameCell) {
  if (gameStatus.value !== `playing` || cell.isOpened) return
  if (minesLeft.value === 0 && !cell.isFlagged) return

  if (cell.isFlagged) sounds.FLAG_PLACE.play()
  else sounds.FLAG_REMOVE.play()

  cell.isFlagged = !cell.isFlagged

  refreshMinesLeft()
  board.refresh?.()
}

export default function Cell({ cell }: CellProps) {
  return (
    <div
      className={clsx(
        `w-[4.5vh] h-[4.5vh] border-1 border-zinc-600 flex justify-center items-center text-[3vh] font-bold cursor-default relative`,
        typeof cell.value === `number` && CELL_NUMBER_COLORS[cell.value],
        !cell.isOpened &&
          `bg-zinc-300 border-4 border-t-zinc-200 border-l-zinc-200 border-r-zinc-400 border-b-zinc-400 shadow-sm`,
        !cell.isOpened && level.value === `easy` && `border-6`,
        cell.value === `mine` && cell.hightlight,
        level.value === `easy` && `w-[8vh] h-[8vh] text-[5.33vh]`,
        !cell.isOpened && `cursor-pointer`
      )}
      onClick={() => handleCellLeftClick(cell)}
      onContextMenu={() => handleCellRightClick(cell)}
    >
      {(cell.isOpened && typeof cell.value === `number` && cell.value) || ``}
      {cell.isOpened && cell.value === `mine` && <img className="w-[80%] h-[80%]" src={bombImage.src} />}
      {!cell.isOpened && cell.isFlagged && <img className="w-[80%] h-[80%]" src={flagImage.src} />}
    </div>
  )
}
