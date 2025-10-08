import { AuctionsList } from "@/modules/auctions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Live NFT Auctions - Bid on Exclusive Digital Collectibles",
  description:
    "Join live NFT auctions and bid on rare digital art, collectibles, and exclusive drops. Real-time bidding, transparent pricing, and secure transactions on blockchain.",
  keywords: [
    "NFT auction",
    "live bidding",
    "NFT drops",
    "exclusive NFTs",
    "auction house",
    "bid on NFT",
  ],
  openGraph: {
    title: "Live NFT Auctions - Bid on Rare Digital Art",
    description: "Participate in exciting NFT auctions with real-time bidding",
    images: ["/auctions-og.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Live NFT Auctions",
    description: "Bid on exclusive NFTs in real-time auctions",
  },
  alternates: {
    canonical: "/auctions",
  },
};

export default function AuctionsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <AuctionsList />
    </div>
  );
}
