import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  allowedDevOrigins: ["192.168.1.161", "192-168-1-161.nip.io"],
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 90, 92],
    minimumCacheTTL: 31_536_000,
  },
};

export default nextConfig;
