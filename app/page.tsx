"use client"

if (typeof window !== `undefined`) window.oncontextmenu = (e) => e.preventDefault()

import { useEffect, useState } from "react"
import Board from "./components/Board"
import SelectLevel from "./components/SelectLevel"
import Header from "./components/Header"
import { useMinesweeper } from "./lib/hooks"
import { level } from "./lib/consts"

export default function Home() {
  level.bind()
  const { handleCellLeftClick, handleCellRightClick, startNewGame } = useMinesweeper()
  const [isClient, setIsClient] = useState(false)
  useEffect(() => setIsClient(true))

  if (!isClient) return

  return (
    <main className="py-2 px-6 bg-[#ccc] rounded-2xl w-fit m-auto">
      <Header startNewGame={startNewGame} />
      <Board handleCellLeftClick={handleCellLeftClick} handleCellRightClick={handleCellRightClick} />
      <SelectLevel />
    </main>
  )
}
