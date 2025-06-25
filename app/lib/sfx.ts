const SOUNDS = {
  REVEAL_EMPTY: "revealEmpty.wav",
  REVEAL_NUMBER: "revealNumber.wav",
  FLAG_PLACE: "flagPlace.wav",
  FLAG_REMOVE: "flagRemove.wav",
  GAME_OVER: "gameOver.wav",
  GAME_WIN: "gameWin.wav",
}

const soundsList: TSoundList = {} as TSoundList

function loadSFX() {
  for (const sound in SOUNDS) {
    soundsList[sound as TSoundName] = new Audio(`${location.pathname}/sfx/${SOUNDS[sound as TSoundName]}`)
    soundsList[sound as TSoundName].load()
  }
}

if (typeof window !== `undefined`) loadSFX()

export function playSoundEffect(name: TSoundName) {
  const audio = soundsList[name]
  audio.pause()
  audio.currentTime = 0
  audio.play()
}
