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
  async redirects() {
    return [
      { source: "/:locale(id|en)/rental", destination: "/:locale/autorev-rental", permanent: true },
      { source: "/:locale(id|en)/drivers", destination: "/:locale/founding-driver", permanent: true },
      { source: "/:locale(id|en)/business", destination: "/:locale/autorev-business", permanent: true },
      { source: "/:locale(id|en)/technology", destination: "/:locale/revauto", permanent: true },
    ];
  },
};

export default nextConfig;
