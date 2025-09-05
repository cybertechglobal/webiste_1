import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname, ".."),
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dhx0gpexmeekh.cloudfront.net",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
