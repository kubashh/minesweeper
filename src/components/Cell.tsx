import clsx from "clsx";
import bombImage from "@/public/icons/bomb.svg";
import flagImage from "@/public/icons/redFlag.png";
import {
  boardRefresh,
  CELL_NUMBER_COLORS,
  gameStatusSignal,
  levelSignal,
  minesLeftSignal,
} from "../lib/consts";
import { openCell, refreshMinesLeft } from "../lib/util";
import { sounds } from "../lib/sfx";

export default function Cell({ cell }: CellProps) {
  const level = levelSignal.use();
  return (
    <div
      className={clsx(
        `w-[4.5vh] h-[4.5vh] border border-zinc-600 flex justify-center items-center text-[3vh] font-bold cursor-default relative`,
        typeof cell.value === `number` && CELL_NUMBER_COLORS[cell.value],
        !cell.isOpened &&
          `bg-zinc-300 border-4 border-t-zinc-200 border-l-zinc-200 border-r-zinc-400 border-b-zinc-400 shadow-sm`,
        !cell.isOpened && level === `easy` && `border-6`,
        cell.value === `mine` && cell.hightlight,
        level === `easy` && `w-[8vh] h-[8vh] text-[5.33vh]`,
        !cell.isOpened && `cursor-pointer`,
      )}
      onClick={() => handleCellLeftClick(cell)}
      onContextMenu={() => handleCellRightClick(cell)}
    >
      {(cell.isOpened && typeof cell.value === `number` && cell.value) || ``}
      {cell.isOpened && cell.value === `mine` && <img className="w-[80%] h-[80%]" src={bombImage.src} />}
      {!cell.isOpened && cell.isFlagged && <img className="w-[80%] h-[80%]" src={flagImage.src} />}
    </div>
  );
}

function handleCellLeftClick(cell: GameCell) {
  if (gameStatusSignal.get() === `lose` || cell.isOpened || cell.isFlagged) return;

  openCell(cell);
}

function handleCellRightClick(cell: GameCell) {
  if (gameStatusSignal.get() !== `playing` || cell.isOpened) return;
  if (minesLeftSignal.get() === 0 && !cell.isFlagged) return;

  if (cell.isFlagged) sounds.flagPlace.play();
  else sounds.flagRemove.play();

  cell.isFlagged = !cell.isFlagged;

  refreshMinesLeft();
  boardRefresh.refresh();
}
