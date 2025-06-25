import Cell from "./Cell"
import { board, level } from "../lib/consts"

export default function Board({ handleCellLeftClick, handleCellRightClick }: BoardProps) {
  board.bind()
  // level.bind()
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
