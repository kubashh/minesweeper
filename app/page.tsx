"use client"

if (typeof window !== `undefined`) window.oncontextmenu = (e) => e.preventDefault()

import { useEffect, useState } from "react"
import Board from "./components/Board"
import { useMinesweeper } from "./lib/hooks"
import SelectLevel from "./components/SelectLevel"
import Header from "./components/Header"

export default function Home() {
  const {
    board,
    minesLeft,
    level,
    setLevel,
    gameState,
    handleCellLeftClick,
    handleCellRightClick,
    timeDiff,
    startNewGame,
  } = useMinesweeper()
  const [isClient, setIsClient] = useState(false)
  useEffect(() => setIsClient(true))

  if (!isClient) return

  return (
    <main className="py-2 px-6 bg-[#ccc] rounded-2xl w-fit m-auto">
      <Header gameState={gameState} minesLeft={minesLeft} timeDiff={timeDiff} startNewGame={startNewGame} />
      <Board
        board={board}
        level={level}
        handleCellLeftClick={handleCellLeftClick}
        handleCellRightClick={handleCellRightClick}
      />
      <SelectLevel level={level} setLevel={setLevel} />
    </main>
  )
}
