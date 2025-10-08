import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "assets.coingecko.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.walletconnect.org",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.ledger.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "magiceden.io",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "zuno.io",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
