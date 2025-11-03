import clsx from "clsx"
import { game, level, LEVELS } from "../lib/consts"

export default function SelectLevel() {
  return (
    <ul className="flex justify-around">
      {Object.keys(LEVELS).map((levelName) => (
        <li key={levelName}>
          <button
            className={clsx(
              `mt-2 px-4 py-1 text-zinc-50 font-semibold rounded-md cursor-pointer`,
              level.value === levelName ? `bg-zinc-700` : `bg-zinc-900`
            )}
            onClick={() => {
              Object.assign(game, LEVELS[levelName as TLevel])
              level.value = levelName as TLevel
            }}
          >
            {levelName}
          </button>
        </li>
      ))}
    </ul>
  )
}
