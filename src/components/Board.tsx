import Cell from "./Cell"
import { board } from "../lib/consts"

export default function Board() {
  board.bind()
  return board.value.map((row, rowIndex) => (
    <div className="flex" key={rowIndex}>
      {row.map((cell, colIndex) => (
        <Cell cell={cell} key={colIndex} />
      ))}
    </div>
  ))
}
