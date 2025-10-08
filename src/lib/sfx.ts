export const sounds: TSoundList = {} as TSoundList

if (typeof window !== `undefined`) {
  window.oncontextmenu = (e) => e.preventDefault()
  loadSFX()
}

function loadSFX() {
  class NewAudio extends Audio {
    constructor(src: string) {
      super(src)
      this.load()
    }

    override play(): any {
      this.currentTime = 0
      super.play()
    }
  }

  const SOUNDS = {
    REVEAL_EMPTY: "revealEmpty.wav",
    REVEAL_NUMBER: "revealNumber.wav",
    FLAG_PLACE: "flagPlace.wav",
    FLAG_REMOVE: "flagRemove.wav",
    GAME_OVER: "gameOver.wav",
    GAME_WIN: "gameWin.wav",
  }

  for (const sound in SOUNDS)
    sounds[sound as TSoundName] = new NewAudio(`${location.pathname}/sfx/${SOUNDS[sound as TSoundName]}`)
}
