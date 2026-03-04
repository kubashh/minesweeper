import GameStatus from "./GameStatus";
import Timer from "./Timer";
import { startNewGame } from "../lib/util";

export default function Header() {
  return (
    <header className="grid grid-cols-3 cols-[auto_1fr_auto] items-center py-2 font-semibold text-md gap-1">
      <GameStatus />
      <button
        className="w-fit px-3 py-1 justify-self-center bg-zinc-900 text-zinc-50 rounded-md cursor-pointer"
        onClick={() => startNewGame()}
      >
        Nowa gra
      </button>
      <Timer />
    </header>
  );
}
