import { useRefresh } from "./hooks"

export class Signal<T> {
  v: T
  refresh: (() => void) | undefined

  constructor(v: T, refresh?: () => void) {
    this.v = v
    if (refresh) this.refresh = refresh
  }

  bind() {
    this.refresh = useRefresh()
  }

  get value() {
    return this.v
  }
  set value(v: T) {
    this.v = v
    this.refresh?.()
  }
}
