import Cell from "./Cell"
import { board } from "../lib/consts"

export default function Board({ handleCellLeftClick, handleCellRightClick }: BoardProps) {
  board.bind()
  return board.value.map((row, rowIndex) => (
    <div key={rowIndex} className="flex">
      {row.map((cell, colIndex) => (
        <Cell
          key={colIndex}
          cell={cell}
          handleCellLeftClick={handleCellLeftClick}
          handleCellRightClick={handleCellRightClick}
          rowIndex={rowIndex}
          colIndex={colIndex}
        />
      ))}
    </div>
  ))
}
