import timerImage from "@/public/icons/timer.svg"
import { timer } from "../lib/consts"

export default function TimerDisplay() {
  return (
    <div className="flex items-center">
      <img width="40" height="40" src={timerImage.src} />
      {timer.value}
    </div>
  )
}
