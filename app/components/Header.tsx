import GameStatus from "./GameStatus"
import TimerDisplay from "./TimerDisplay"

export default function Header({ timeDiff, startNewGame, ...props }: HeaderProps) {
  return (
    <header className="flex justify-between items-center py-2 font-bold text-md gap-1">
      <GameStatus {...props} />
      <button className="px-3 py-1 bg-zinc-700 text-zinc-50 rounded-md cursor-pointer" onClick={startNewGame}>
        Nowa gra
      </button>
      <TimerDisplay timeDiff={timeDiff} />
    </header>
  )
}
