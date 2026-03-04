import { useEffect } from "react";
import { useRefresh } from "wdwh/hooks";
import Cell from "./Cell";
import { board, boardRefresh, levelSignal } from "../lib/consts";

export default function Board() {
  boardRefresh.refresh = useRefresh();
  const needFlip = useNeedFlip();
  let tmpBoard = !needFlip ? board : getTransposedBoard();

  return tmpBoard.map((row, rowIndex) => (
    <div className="flex" key={rowIndex}>
      {row.map((cell, colIndex) => (
        <Cell cell={cell} key={colIndex} />
      ))}
    </div>
  ));
}

function useNeedFlip() {
  let isDesctop = levelSignal.get() !== `expert` || window.innerWidth > window.innerHeight;
  useEffect(() => {
    const handleResize = () => {
      if (levelSignal.get() !== `expert`) return;
      if (
        (window.innerWidth > window.innerHeight && !isDesctop) ||
        (window.innerWidth <= window.innerHeight && isDesctop)
      ) {
        isDesctop = !isDesctop;
        boardRefresh.refresh();
      }
    };
    window.addEventListener(`resize`, handleResize);
    return () => window.removeEventListener(`resize`, handleResize);
  }, []);

  return !isDesctop;
}

function getTransposedBoard() {
  // matrix[0].map → iterate over columns
  return board[0].map((_, colIndex) => board.map((row) => row[colIndex]));
}
