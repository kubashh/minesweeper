import Cell from "./Cell"
import { board } from "../lib/consts"

export default function Board() {
  board.bind()
  return board.value.map((row, rowIndex) => (
    <div key={rowIndex} className="flex">
      {row.map((cell, colIndex) => (
        <Cell key={colIndex} cell={cell} rowIndex={rowIndex} colIndex={colIndex} />
      ))}
    </div>
  ))
}
