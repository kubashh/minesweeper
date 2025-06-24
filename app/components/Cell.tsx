import clsx from "clsx"
import bombImage from "@/public/icons/bomb.svg"
import flagImage from "@/public/icons/red-flag.png"
import { CEIL_NUMBER_COLORS } from "../lib/consts"

export default function Cell({
  cell,
  rowIndex,
  colIndex,
  level,
  handleCellLeftClick,
  handleCellRightClick,
}: CellProps) {
  return (
    <div
      className={clsx(
        `w-8 h-8 border-1 border-zinc-600 flex justify-center items-center text-2xl font-bold cursor-default relative`,
        typeof cell.value === `number` && CEIL_NUMBER_COLORS[cell.value],
        !cell.isOpened &&
          `bg-[#ccc] border-3 border-t-[#eee] border-l-[#eee] border-r-[#aaa] border-b-[#aaa] shadow-sm`,
        cell.value === `mine` && cell.hightlight,
        level === `easy` && `w-12 h-12 text-4xl`,
        !cell.isOpened && `cursor-pointer`
      )}
      onClick={() => handleCellLeftClick(rowIndex, colIndex)}
      onContextMenu={(e) => handleCellRightClick(e, rowIndex, colIndex)}
    >
      {(cell.isOpened && typeof cell.value === `number` && cell.value) || ``}
      {cell.isOpened && cell.value === `mine` && <img className="w-[80%] h-[80%]" src={bombImage.src} />}
      {cell.isFlagged && <img className="w-[80%] h-[80%]" src={flagImage.src} />}
    </div>
  )
}
