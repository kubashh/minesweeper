import clsx from "clsx";
import { game, levelSignal, LEVELS } from "../lib/consts";
import { startNewGame } from "../lib/util";

export default function SelectLevel() {
  return (
    <ul className="flex justify-around">
      {Object.keys(LEVELS).map((levelName) => (
        <li key={levelName}>
          <SelectLevelButton levelName={levelName as TLevel} />
        </li>
      ))}
    </ul>
  );
}

function SelectLevelButton({ levelName }: { levelName: TLevel }) {
  const level = levelSignal.use();
  return (
    <button
      className={clsx(
        `mt-2 px-4 py-1 text-zinc-50 font-semibold rounded-md cursor-pointer`,
        level === levelName ? `bg-zinc-700` : `bg-zinc-900`,
      )}
      onClick={() => {
        Object.assign(game, LEVELS[levelName as TLevel]);
        levelSignal.set(levelName);
        startNewGame();
      }}
    >
      {levelName}
    </button>
  );
}
