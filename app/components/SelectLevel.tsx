import { level, LEVELS } from "../lib/consts"

export default function SelectLevel() {
  return (
    <ul className="flex justify-around">
      {Object.keys(LEVELS).map((levelName) => (
        <li key={levelName}>
          <button
            className="mt-2 px-4 py-1 bg-zinc-800 text-zinc-50 rounded-md cursor-pointer"
            onClick={() => (level.value = levelName as TLevel)}
          >
            {levelName}
          </button>
        </li>
      ))}
    </ul>
  )
}
