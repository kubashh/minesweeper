import bombIcon from "@/public/icons/bomb.svg"
import { gameStatus, minesLeft } from "../lib/consts"

export default function GameStatus() {
  minesLeft.bind()
  gameStatus.bind()

  if (gameStatus.value === `win`) return <div>Wygrałeś!</div>
  if (gameStatus.value === `lose`) return <div>Koniec gry!</div>

  return (
    <div className="flex items-center">
      <img width="40" height="40" src={bombIcon.src} />
      {minesLeft.value}
    </div>
  )
}
