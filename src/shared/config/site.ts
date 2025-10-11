/**
 * Site Configuration
 */

export const siteConfig = {
  name: "Zuno Marketplace",
  description: "NFT Marketplace for buying, selling, and trading digital assets",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  ogImage: "/images/og-image.png",
  links: {
    twitter: "https://twitter.com/zuno",
    github: "https://github.com/ZunoKit",
    discord: "https://discord.gg/zuno",
    docs: "https://docs.zuno.xyz",
  },
  creator: {
    name: "ZunoKit",
    twitter: "@zuno",
  },
} as const;

export type SiteConfig = typeof siteConfig;
