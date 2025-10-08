import { Metadata } from "next";
import ExploreMarketplace from "@/modules/explore";

export const metadata: Metadata = {
  title: "Explore NFTs - Browse All Collections",
  description:
    "Browse and discover NFTs across all collections. Filter by price, category, blockchain, and more. Find your next digital collectible on Zuno Marketplace.",
  keywords: [
    "explore NFTs",
    "browse NFTs",
    "NFT collections",
    "digital art marketplace",
    "NFT discovery",
    "crypto art",
    "NFT filter",
    "NFT search",
  ],
  openGraph: {
    title: "Explore NFTs on Zuno Marketplace",
    description:
      "Discover thousands of NFTs from verified collections. Browse by category, price, and blockchain.",
    images: [
      {
        url: "/og-explore.png",
        width: 1200,
        height: 630,
        alt: "Explore NFTs on Zuno",
      },
    ],
  },
};

export default function ExplorePage() {
  return <ExploreMarketplace />;
}
