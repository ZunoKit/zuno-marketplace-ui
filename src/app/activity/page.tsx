import { Metadata } from "next";
import MarketplaceActivity from "@/modules/activity";

export const metadata: Metadata = {
  title: "Activity - Live Marketplace Feed",
  description:
    "Track real-time NFT sales, bids, listings, and transfers across Zuno Marketplace. See what's happening now.",
  keywords: [
    "NFT activity",
    "marketplace activity",
    "NFT sales",
    "recent transactions",
    "NFT transfers",
    "live feed",
    "trading history",
  ],
};

export default function ActivityPage() {
  return <MarketplaceActivity />;
}
