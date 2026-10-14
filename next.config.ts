import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  redirects: async () => [
    {
      source: "/results/lite",
      destination: "/results/medium",
      permanent: false,
    },
    {
      source: "/results/snapshot/lite",
      destination: "/results/snapshot/medium",
      permanent: false,
    },
  ],
};

export default nextConfig;
