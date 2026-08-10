import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  output: "standalone",
  async redirects() {
    return [
      { source: "/scan", destination: "/", permanent: true },
      { source: "/scan/run", destination: "/security-scan", permanent: true },
      { source: "/scan/enter-email", destination: "/email", permanent: true },
      { source: "/scan/premium", destination: "/premium", permanent: true },
      { source: "/scan/download", destination: "/download", permanent: true },
      { source: "/scan/privacy", destination: "/privacy-policy", permanent: true },
      { source: "/scan/terms", destination: "/terms-of-use", permanent: true },
      { source: "/scan/refund", destination: "/refund-policy", permanent: true },
    ];
  },
};

export default nextConfig;
