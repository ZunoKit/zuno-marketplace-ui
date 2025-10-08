import { StatsPage } from "@/modules/stats";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "NFT Market Statistics - Rankings, Trends & Analytics",
  description:
    "Real-time NFT market statistics, top collections rankings, trending NFTs, volume analytics, and price trends across the marketplace.",
  keywords: [
    "NFT stats",
    "market analytics",
    "NFT rankings",
    "top collections",
    "trending NFTs",
    "volume stats",
  ],
};

export default function Stats() {
  return <StatsPage />;
}
