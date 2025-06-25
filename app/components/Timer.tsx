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

function intToStringLen2(n: number) {
  return `${n < 10 ? `0` : ``}${n}`
}

function timeToString() {
  return `${intToStringLen2(Math.floor(timer.value / 60))}:${intToStringLen2(timer.value % 60)}`
}

export default function Timer() {
  timer.bind()
  return (
    <div className="flex items-center text-2xl">
      <img width="40" height="40" src={timerImage.src} />
      {timeToString()}
    </div>
  )
}
