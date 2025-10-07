export interface Auction {
  id: string;
  nftId: string;
  tokenId: string;
  contractAddress: string;
  name: string;
  description?: string;
  image: string;
  seller: {
    address: string;
    name?: string;
    avatar?: string;
  };
  startingPrice: string;
  currentBid: string;
  reservePrice?: string;
  currency: string;
  startTime: Date;
  endTime: Date;
  bids: AuctionBid[];
  status: "upcoming" | "active" | "ended" | "cancelled";
  winner?: {
    address: string;
    name?: string;
  };
}

export interface AuctionBid {
  id: string;
  bidder: {
    address: string;
    name?: string;
    avatar?: string;
  };
  amount: string;
  timestamp: Date;
  txHash?: string;
}

export interface AuctionFilter {
  status?: "upcoming" | "active" | "ended";
  priceRange?: [number, number];
  sortBy?: "ending_soon" | "newly_listed" | "highest_bid" | "most_bids";
  collection?: string;
}
