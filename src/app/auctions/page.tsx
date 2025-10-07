import { AuctionsList } from "@/modules/auctions";

export const metadata = {
  title: "Live Auctions | NFT Marketplace",
  description:
    "Participate in live NFT auctions and bid on exclusive digital collectibles",
};

export default function AuctionsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <AuctionsList />
    </div>
  );
}
