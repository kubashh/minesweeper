import { useRefresh } from "wdwh/hooks";
import Cell from "./Cell";
import { board, boardRefresh } from "../lib/consts";

export default function Board() {
  boardRefresh.refresh = useRefresh();
  return board.map((row, rowIndex) => (
    <div className="flex" key={rowIndex}>
      {row.map((cell, colIndex) => (
        <Cell cell={cell} key={colIndex} />
      ))}
    </div>
  ));
}
