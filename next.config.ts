import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  devIndicators: false,
  reactStrictMode: false,
  reactCompiler: true,
  output: `export`,
  distDir: `dist`,
  basePath: `/minesweeper`,
}

export default nextConfig
