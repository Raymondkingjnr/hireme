import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // This allows ALL external images (quick fix)
      },
    ],
  },
};

export default nextConfig;
