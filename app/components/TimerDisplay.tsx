import timerImage from "@/public/icons/timer.svg"

export default function TimerDisplay({ timeDiff }: TimerDisplayProps) {
  return (
    <div className="flex items-center">
      <img width="40" height="40" src={timerImage.src} />
      {timeDiff}
    </div>
  )
}
