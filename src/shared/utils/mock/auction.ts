import { type Auction, type AuctionBid } from "@/shared/types/auction";

// Generate mock bids
const generateMockBids = (auctionId: string, count: number): AuctionBid[] => {
  const bids: AuctionBid[] = [];
  let currentAmount = 0.1;

  for (let i = 0; i < count; i++) {
    currentAmount += Math.random() * 0.05;
    bids.push({
      id: `bid-${auctionId}-${i}`,
      bidder: {
        address: `0xBidder${i.toString().padStart(4, "0")}`,
        name: `Bidder${i}`,
        avatar: `https://picsum.photos/100/100?random=${300 + i}`,
      },
      amount: currentAmount.toFixed(3),
      timestamp: new Date(Date.now() - (count - i) * 60 * 60 * 1000),
      txHash: `0x${Math.random().toString(16).substring(2)}`,
    });
  }

  return bids.reverse();
};

// Generate mock auctions
const generateMockAuction = (index: number): Auction => {
  const statuses: Auction["status"][] = [
    "upcoming",
    "active",
    "ended",
    "active",
  ];
  const status = statuses[index % statuses.length];
  const bids =
    status === "active" || status === "ended"
      ? generateMockBids(`auction-${index}`, Math.floor(Math.random() * 15) + 1)
      : [];

  const now = new Date();
  let startTime: Date;
  let endTime: Date;

  if (status === "upcoming") {
    startTime = new Date(now.getTime() + (index + 1) * 24 * 60 * 60 * 1000);
    endTime = new Date(startTime.getTime() + 7 * 24 * 60 * 60 * 1000);
  } else if (status === "active") {
    startTime = new Date(now.getTime() - (index + 1) * 24 * 60 * 60 * 1000);
    endTime = new Date(now.getTime() + (7 - index) * 24 * 60 * 60 * 1000);
  } else {
    startTime = new Date(now.getTime() - (index + 7) * 24 * 60 * 60 * 1000);
    endTime = new Date(now.getTime() - index * 24 * 60 * 60 * 1000);
  }

  const startingPrice = (Math.random() * 0.5 + 0.1).toFixed(3);
  const currentBid = bids.length > 0 ? bids[0].amount : startingPrice;

  return {
    id: `auction-${index}`,
    nftId: `nft-${index}`,
    tokenId: `${2000 + index}`,
    contractAddress: `0xContract${index.toString().padStart(4, "0")}`,
    name: `Auction NFT #${2000 + index}`,
    description: `A rare NFT piece up for auction. Don't miss this opportunity!`,
    image: `https://picsum.photos/400/400?random=${500 + index}`,
    seller: {
      address: `0xSeller${index.toString().padStart(4, "0")}`,
      name: `Seller${index}`,
      avatar: `https://picsum.photos/100/100?random=${400 + index}`,
    },
    startingPrice,
    currentBid,
    reservePrice: (parseFloat(startingPrice) * 2).toFixed(3),
    currency: "ETH",
    startTime,
    endTime,
    bids,
    status,
    winner:
      status === "ended" && bids.length > 0
        ? {
            address: bids[0].bidder.address,
            name: bids[0].bidder.name,
          }
        : undefined,
  };
};

// Generate array of mock auctions
export const mockAuctions: Auction[] = Array.from({ length: 24 }, (_, i) =>
  generateMockAuction(i)
);

// Auction statistics
export const mockAuctionStats = {
  totalAuctions: mockAuctions.length,
  activeAuctions: mockAuctions.filter((a) => a.status === "active").length,
  totalVolume:
    mockAuctions
      .filter((a) => a.status === "ended")
      .reduce((sum, a) => sum + parseFloat(a.currentBid), 0)
      .toFixed(2) + " ETH",
  avgBidsPerAuction: Math.floor(
    mockAuctions.reduce((sum, a) => sum + a.bids.length, 0) /
      mockAuctions.length
  ),
};
