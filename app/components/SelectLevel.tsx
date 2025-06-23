import { LEVELS } from "../lib/consts"

type SelectLevelProps = {
  level: string
  setLevel: (a: TLevel) => void
}

export default function SelectLevel({ level, setLevel }: SelectLevelProps) {
  return (
    <ul className="flex justify-around">
      {Object.keys(LEVELS).map((levelName) => (
        <li key={levelName}>
          <button
            className="mt-2 px-4 py-1 bg-zinc-800 text-zinc-50 rounded-md cursor-pointer"
            onClick={() => setLevel(levelName as TLevel)}
          >
            {levelName}
          </button>
        </li>
      ))}
    </ul>
  )
}
