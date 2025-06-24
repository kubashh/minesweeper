import bombIcon from "@/public/icons/bomb.svg"

export default function GameStatus({ gameState, minesLeft }: GameStatusProps) {
  if (gameState === `win`) return <div>Wygrałeś!</div>
  if (gameState === `lose`) return <div>Koniec gry!</div>

  return (
    <div className="flex items-center">
      <img width="40" height="40" src={bombIcon.src} />
      {minesLeft}
    </div>
  )
}
