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

  const SOUNDS = [`revealEmpty`, `revealNumber`, `flagPlace`, `flagRemove`, `gameOver`, `gameWin`]

  for (const sound of SOUNDS)
    sounds[sound as TSoundName] = new NewAudio(`${location.pathname}/sfx/${sound}.wav`)
}
