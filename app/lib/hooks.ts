import { useState } from "react"

export function useRefresh() {
  const f = useState(false)[1]
  return () => f((prev) => !prev)
}
