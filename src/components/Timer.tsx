import timerImage from "@/public/icons/timer.svg"
import { timer } from "../lib/consts"
import { nowS } from "../lib/util"

let timeStarted = 0
let running = false

export function startTimer(upd?: boolean) {
  if (!upd) {
    if (running) return
    running = true
    timeStarted = nowS()
  }
  if (!running) return

  const realDiff = nowS() - timeStarted

  timer.value = Math.floor(realDiff)

  setTimeout(() => startTimer(true), (timer.value - realDiff + 1) * 1000)
}

export function stopTimer() {
  running = false
}

export function resetTimer() {
  timer.value = timeStarted = 0
  running = false
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

function timeToString() {
  return `${intToStringLen2(Math.floor(timer.value / 60))}:${intToStringLen2(timer.value % 60)}`
}

function intToStringLen2(n: number) {
  return `${n < 10 ? `0` : ``}${n}`
}
