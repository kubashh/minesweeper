import bombIcon from "@/public/icons/bomb.svg";
import { gameStatusSignal, minesLeftSignal } from "../lib/consts";
import { stopTimer } from "./Timer";

export default function GameStatus() {
  const gameStatus = gameStatusSignal.use();
  if (gameStatus !== `playing`) stopTimer();

  return (
    <div className="flex items-center text-2xl">
      {gameStatus === `lose` ? (
        `Przegrałeś!`
      ) : gameStatus === `win` ? (
        `Wygrałeś!`
      ) : (
        <>
          <img width="36" height="36" src={bombIcon.src} />
          <MinesLeft />
        </>
      )}
    </div>
  );
}

function MinesLeft() {
  const minesLeft = minesLeftSignal.use();
  return minesLeft;
}
