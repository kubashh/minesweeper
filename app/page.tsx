"use client"

import { useEffect, useState } from "react"
import Board from "./components/Board"
import SelectLevel from "./components/SelectLevel"
import Header from "./components/Header"
import { level } from "./lib/consts"
import { startNewGame } from "./lib/util"

export default function Home() {
  level.bind(startNewGame)

  const [isClient, setIsClient] = useState(false)
  useEffect(() => setIsClient(true))

  if (!isClient) return

  return (
    <main className="py-2 px-6 bg-[#ccc] rounded-2xl w-fit m-auto">
      <Header />
      <Board />
      <SelectLevel />
    </main>
  )
}
