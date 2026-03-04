import timerImage from "@/public/icons/timer.svg";
import { timerSignal } from "../lib/consts";
import { nowS } from "../lib/util";

let timeStarted = 0;
let running = false;

export function startTimer(upd?: boolean) {
  if (!upd) {
    if (running) return;
    running = true;
    timeStarted = nowS();
  }
  if (!running) return;

  const realDiff = nowS() - timeStarted;

  timerSignal.set(Math.floor(realDiff));

  setTimeout(() => startTimer(true), (timerSignal.get() - realDiff + 1) * 1000);
}

export function stopTimer() {
  running = false;
}

export function resetTimer() {
  timeStarted = 0;
  timerSignal.set(0);
  running = false;
}

export default function Timer() {
  return (
    <div className="flex items-center text-2xl justify-self-end">
      <img width="36" height="36" src={timerImage.src} />
      <TimePlayed />
    </div>
  );
}

function TimePlayed() {
  const timer = timerSignal.use();
  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;

  return `${minutes.toString().padStart(2, `0`)}:${seconds.toString().padStart(2, `0`)}`;
}
