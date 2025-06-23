"use client"

import { useEffect, useState } from "react"
import Board from "./components/Board"
import { useMinesweeper } from "./lib/hooks"
import SelectLevel from "./components/SelectLevel"

export default function Home() {
  const { level, setLevel, board, handleCellLeftClick } = useMinesweeper()
  const [isClient, setIsClient] = useState(false)
  useEffect(() => setIsClient(true))

  if (!isClient) return

  return (
    <main className="py-2 px-6 bg-[#ccc] rounded-2xl w-fit m-auto">
      <Board board={board} handleCellLeftClick={handleCellLeftClick} level={level} />
      <SelectLevel level={level} setLevel={setLevel} />
    </main>
  )
}
