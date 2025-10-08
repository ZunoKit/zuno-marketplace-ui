import { Marketplace } from "@/modules/marketplace";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "NFT Marketplace - Buy & Sell Digital Art, Collectibles & More",
  description:
    "Browse thousands of unique NFTs from verified creators. Buy, sell, and trade digital art, collectibles, gaming items, and more on our secure blockchain marketplace.",
  keywords: [
    "buy NFT",
    "sell NFT",
    "NFT trading",
    "digital art marketplace",
    "crypto collectibles",
    "NFT gallery",
  ],
  openGraph: {
    title: "NFT Marketplace - Buy & Sell Digital Collectibles",
    description: "Discover and trade unique NFTs from top creators worldwide",
    images: ["/marketplace-og.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NFT Marketplace - Buy & Sell NFTs",
    description: "Browse and trade thousands of unique digital collectibles",
  },
};

export default function MarketplacePage() {
  return <Marketplace />;
}
