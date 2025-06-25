"use client"

import Header from "./components/Header"
import Board from "./components/Board"
import SelectLevel from "./components/SelectLevel"
import { level } from "./lib/consts"
import { startNewGame } from "./lib/util"
import { useClient } from "./lib/hooks"

function Game() {
  level.bind(startNewGame)

  return (
    <main className="py-2 px-6 bg-[#ccc] rounded-2xl w-fit m-auto">
      <Header />
      <Board />
      <SelectLevel />
    </main>
  )
}

export default function Home() {
  if (!useClient()) return

  return <Game />
}
