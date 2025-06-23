import clsx from "clsx"
import { CEIL_NUMBER_COLORS } from "../lib/consts"

export default function Cell({ cell, rowIndex, colIndex, handleCellLeftClick, level }: CellProps) {
  return (
    <div
      className={clsx(
        `w-8 h-8 border-1 border-zinc-600 flex justify-center items-center text-2xl font-bold cursor-default relative`,
        typeof cell.value === `number` && CEIL_NUMBER_COLORS[cell.value],
        !cell.isOpened &&
          `bg-[#ccc] border-3 border-t-[#eee] border-l-[#eee] border-r-[#aaa] border-b-[#aaa] shadow-sm`,
        cell.value === `mine` && cell.hightlight,
        level === `easy` && `w-12 h-12 text-4xl`
      )}
      onClick={() => handleCellLeftClick(rowIndex, colIndex)}
    >
      {(cell.isOpened && typeof cell.value === `number` && cell.value) || ``}
      {cell.isOpened && cell.value === `mine` && <img className="w-[80%] h-[80%]" src="/icons/bomb.svg" />}
      {cell.isFlagged && <img className="w-[80%] h-[80%]" src="/icons/red-flag.png" />}
    </div>
  )
}
