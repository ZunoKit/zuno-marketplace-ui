import { AuctionDetail } from "@/modules/auctions/AuctionDetail";
import { mockAuctions } from "@/shared/utils/mock/auction";

interface AuctionDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: AuctionDetailPageProps) {
  const { slug } = await params;
  // In real app, fetch auction based on slug
  const auction = mockAuctions[0];

  return {
    title: `${auction.name} - Live Auction | NFT Marketplace`,
    description: `Bid on ${auction.name}. Current bid: ${auction.currentBid} ${auction.currency}`,
  };
}

export default async function AuctionDetailPage({ params }: AuctionDetailPageProps) {
  const { slug } = await params;
  // In real app, fetch auction data based on slug
  const auction = mockAuctions.find(a => a.id === slug) || mockAuctions[0];

  return <AuctionDetail auction={auction} />;
}
