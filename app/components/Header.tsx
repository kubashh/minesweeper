import GameStatus from "./GameStatus"
import Timer from "./Timer"
import { startNewGame } from "../lib/util"

export default function Header() {
  return (
    <header className="flex justify-between items-center py-2 font-bold text-md gap-1">
      <GameStatus />
      <button
        className="px-3 py-1 bg-zinc-700 text-zinc-50 rounded-md cursor-pointer"
        onClick={() => startNewGame()}
      >
        Nowa gra
      </button>
      <Timer />
    </header>
  )
}
