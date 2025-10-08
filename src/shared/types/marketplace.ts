export interface NFT {
  id: string;
  tokenId: string;
  name: string;
  description?: string;
  image: string;
  price: string;
  currency: string;
  owner: {
    address: string;
    name?: string;
    avatar?: string;
  };
  collection: {
    address: string;
    name: string;
    verified: boolean;
  };
  attributes?: Array<{
    trait_type: string;
    value: string | number;
    display_type?: string;
  }>;
  status: "available" | "sold" | "reserved" | "cancelled";
  listingType: "fixed" | "auction" | "offer";
  createdAt: Date;
  updatedAt: Date;
  likes: number;
  views: number;
}

export interface MarketplaceFilter {
  status?: string;
  priceRange?: [number, number];
  collections?: string[];
  attributes?: Record<string, string[]>;
  sortBy?: "price_asc" | "price_desc" | "recent" | "oldest" | "most_liked";
}

export interface Collection {
  address: string;
  name: string;
  description?: string;
  image?: string;
  banner?: string;
  verified: boolean;
  floorPrice?: string;
  volume24h?: string;
  totalVolume?: string;
  itemCount: number;
  ownerCount: number;
  creator: {
    address: string;
    name?: string;
  };
}

export type ViewMode = "grid" | "list" | "compact";
