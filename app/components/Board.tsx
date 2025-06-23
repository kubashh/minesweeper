import Cell from "./Cell"

export default function Board({ board, handleCellLeftClick, level }: BoardProps) {
  let i = 0
  return (
    <div>
      {board.map((row, rowIndex) => {
        i++
        return (
          <div key={i} className="flex">
            {row.map((cell, colIndex) => {
              i++
              return (
                <Cell
                  key={i}
                  cell={cell}
                  handleCellLeftClick={handleCellLeftClick}
                  rowIndex={rowIndex}
                  colIndex={colIndex}
                  level={level}
                />
              )
            })}
          </div>
        )
      })}
    </div>
  )
}
