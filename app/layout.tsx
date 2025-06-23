import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Minesweeper",
  description: "Play Minesweeper free, no ads!",
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className="w-screen h-screen justify-center content-center bg-zinc-950 text-zinc-900 select-none">
        {children}
      </body>
    </html>
  )
}
