export interface UserProfile {
  id: string;
  address: string;
  username?: string;
  displayName?: string;
  bio?: string;
  avatar?: string;
  banner?: string;
  email?: string;
  website?: string;
  twitter?: string;
  discord?: string;
  createdAt: Date;
  updatedAt: Date;
  verified: boolean;
  stats: ProfileStats;
}

export interface ProfileStats {
  nftsOwned: number;
  nftsCreated: number;
  collections: number;
  totalVolume: string;
  floorPrice: string;
  followers: number;
  following: number;
}

export interface ProfileActivity {
  id: string;
  type: "purchase" | "sale" | "listing" | "bid" | "transfer" | "mint";
  nft: {
    id: string;
    name: string;
    image: string;
    tokenId: string;
    collection: string;
  };
  from?: string;
  to?: string;
  price?: string;
  currency?: string;
  timestamp: Date;
  txHash?: string;
}

export interface ProfileCollection {
  id: string;
  name: string;
  image: string;
  itemCount: number;
  floorPrice?: string;
  totalValue?: string;
}

export type ProfileTab = "collected" | "created" | "favorites" | "activity" | "offers";
