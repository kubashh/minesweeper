import { useRefresh } from "./hooks"

export class Signal<T> {
  v: T
  refresh: (() => void) | undefined

  constructor(v: T, refresh?: () => void) {
    this.v = v
    if (refresh) this.refresh = refresh
  }

  bind(fn?: () => void) {
    if (fn) {
      const refresh = useRefresh()
      this.refresh = () => {
        fn()
        refresh()
      }
    } else this.refresh = useRefresh()
  }

  get value() {
    return this.v
  }
  set value(v: T) {
    this.v = v
    this.refresh?.()
  }
}
