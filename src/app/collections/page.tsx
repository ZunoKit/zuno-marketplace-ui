import { CollectionsList } from "@/modules/collections";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "NFT Collections - Explore Top Digital Art Collections",
  description:
    "Discover curated NFT collections from verified artists and creators. Browse by category, trending collections, floor price, and volume. Find your next digital collectible.",
  keywords: [
    "NFT collections",
    "digital art collections",
    "crypto art",
    "NFT gallery",
    "trending NFTs",
    "top collections",
  ],
  openGraph: {
    title: "Explore NFT Collections - Top Digital Art & Collectibles",
    description: "Browse curated collections from verified creators worldwide",
    images: ["/collections-og.png"],
    type: "website",
  },
  alternates: {
    canonical: "/collections",
  },
};

export default function CollectionsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <CollectionsList />
    </div>
  );
}
