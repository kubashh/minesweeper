import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Minesweeper",
  description: "Play Minesweeper free, no ads!",
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/minesweeper/favicon.png" />
      </head>
      <body className="w-screen h-screen justify-center content-center bg-black text-zinc-950 select-none">
        {children}
      </body>
    </html>
  )
}
