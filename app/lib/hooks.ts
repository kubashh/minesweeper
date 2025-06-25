import { useEffect, useState } from "react"

export function useRefresh() {
  const f = useState(false)[1]
  return () => f((prev) => !prev)
}

export function useClient() {
  const [isClient, setIsClient] = useState(false)
  useEffect(() => setIsClient(true), [isClient])

  return isClient
}
