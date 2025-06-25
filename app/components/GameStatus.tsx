import bombIcon from "@/res/icons/bomb.svg"
import { gameStatus, minesLeft } from "../lib/consts"
import { stopTimer } from "./Timer"

export default function GameStatus() {
  minesLeft.bind()
  gameStatus.bind(() => {
    if (gameStatus.value !== `playing`) stopTimer()
  })

  if (gameStatus.value === `win`) return <div>Wygrałeś!</div>
  if (gameStatus.value === `lose`) return <div>Koniec gry!</div>

  return (
    <div className="flex items-center text-2xl">
      <img width="40" height="40" src={bombIcon.src} />
      {minesLeft.value}
    </div>
  )
}
