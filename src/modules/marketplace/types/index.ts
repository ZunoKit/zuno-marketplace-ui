// NFT and marketplace types

export enum NftStatus {
  Listed = "LISTED",
  NotListed = "NOT_LISTED",
  Sold = "SOLD",
  Cancelled = "CANCELLED",
}

export interface Nft {
  id: string;
  tokenId: string;
  name: string;
  description?: string;
  image?: string;
  contractAddress: string;
  chainId: string;
  owner?: string;
  creator?: string;
  status: NftStatus;
  mintPrice?: string;
  listPrice?: string;
  lastSalePrice?: string;
  attributes?: NftAttribute[];
  metadata?: Record<string, unknown>;
  createdAt?: string;
  updatedAt?: string;
  selected?: boolean;
}

export interface NftAttribute {
  trait_type: string;
  value: string | number;
  display_type?: string;
}

export interface MarketplaceFilter {
  priceRange?: [number, number];
  status?: string;
  sortBy?: string;
  search?: string;
}

export interface CartItem extends Nft {
  quantity?: number;
  totalPrice?: string;
}
