import timerImage from "@/public/icons/timer.svg"
import { timer } from "../lib/consts"
import { nowS } from "../lib/util"

let timeStarted = 0
let running = false

export function startTimer(b?: boolean) {
  if (!b) {
    running = true
    timeStarted = nowS()
  }

  const realDiff = nowS() - timeStarted

  timer.value = Math.floor(realDiff)

  if (!timeStarted) timer.value = 0
  if (!running) return

  setTimeout(() => startTimer(true), (timer.value - realDiff + 1) * 1000)
}

export function stopTimer() {
  running = false
}

export function resetTimer() {
  timeStarted = 0
  running = false
}

export function getTimerRunning() {
  return running
}

export default function Timer() {
  timer.bind()
  return (
    <div className="flex items-center">
      <img width="40" height="40" src={timerImage.src} />
      {timer.value}
    </div>
  )
}
