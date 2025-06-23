import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  devIndicators: false,
  reactStrictMode: false,
  output: "export",
  distDir: `dist`,
  basePath: `/minesweeper`,
}

export default nextConfig
