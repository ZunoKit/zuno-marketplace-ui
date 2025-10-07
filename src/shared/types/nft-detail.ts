import { type NFT } from "./marketplace";

export interface NFTDetail extends NFT {
  blockchain: {
    chain: string;
    contractAddress: string;
    tokenStandard: string;
    tokenId: string;
  };
  metadata: {
    description?: string;
    externalUrl?: string;
    animationUrl?: string;
    backgroundColor?: string;
  };
  history: NFTActivity[];
  offers: NFTOffer[];
  moreFromCollection: NFT[];
  rarity?: {
    rank: number;
    score: number;
    totalSupply: number;
  };
}

export interface NFTActivity {
  id: string;
  type: "mint" | "transfer" | "sale" | "listing" | "offer" | "bid";
  from: {
    address: string;
    name?: string;
  };
  to?: {
    address: string;
    name?: string;
  };
  price?: string;
  currency?: string;
  timestamp: Date;
  txHash: string;
}

export interface NFTOffer {
  id: string;
  offerer: {
    address: string;
    name?: string;
    avatar?: string;
  };
  price: string;
  currency: string;
  expiresAt?: Date;
  createdAt: Date;
  status: "active" | "accepted" | "rejected" | "expired";
}
