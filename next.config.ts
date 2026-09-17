import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Allow production validation alongside the running development preview.
  distDir: process.env.NEXT_DIST_DIR || ".next",
};

export default nextConfig;
