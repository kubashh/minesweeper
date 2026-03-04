import bombIcon from "@/public/icons/bomb.svg";
import { gameStatus, minesLeft } from "../lib/consts";
import { stopTimer } from "./Timer";

export default function GameStatus() {
  minesLeft.bind();
  gameStatus.bind();
  if (gameStatus.value !== `playing`) stopTimer();

  return (
    <div className="flex items-center text-2xl">
      {gameStatus.value === `lose` ? (
        `Przegrałeś!`
      ) : gameStatus.value === `win` ? (
        `Wygrałeś!`
      ) : (
        <>
          <img width="40" height="40" src={bombIcon.src} />
          {minesLeft.value}
        </>
      )}
    </div>
  );
}
