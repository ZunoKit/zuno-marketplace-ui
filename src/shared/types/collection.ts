import {
  ID,
  ISODate,
  CAIP2,
  Address,
  TokenStandard,
  DisplayType,
  ValueType,
  CurrencySymbol,
  MarketplaceName,
  MetadataStandard,
  NumberRange,
  DateRange,
  NormalizedName,
  NormalizedValue,
  RawNftMetadata,
} from "./primitives";

/** ---------- Core entities ---------- */
export interface Collection {
  id: ID;
  slug: string; // marketplace slug
  name: string;
  description?: string;
  category?: string; // pfp, art, gaming, ...
  imageUrl?: string;
  bannerUrl?: string;
  socialLinks?: {
    discord?: string;
    twitter?: string;
    telegram?: string;
    instagram?: string;
    facebook?: string;
    youtube?: string;
    tiktok?: string;
  };
  websiteUrl?: string;
  isVerified?: boolean;
  totalSupply?: number;
  royaltyBps?: number; // 500 = 5%
  metadataStandard?: MetadataStandard;
  createdAt: ISODate;
  updatedAt: ISODate;

  // Minting related fields
  status?: "upcoming" | "live" | "ended" | "paused";
  mintStartDate?: ISODate;
  mintEndDate?: ISODate;
  publicMint?: PublicMint;
  totalMinted?: number;
  maxSupply?: number;
  mintPrice?: string; // e.g., "0.1 ETH", "2 SOL"
}

export interface PublicMint {
  startDate?: ISODate;
  endDate?: ISODate;
  mintPrice?: string; // e.g., "0.1 ETH", "2 SOL"
}

export interface ChainBinding {
  chainId: CAIP2; // ví dụ "eip155:1"
  tokenStandard: TokenStandard; // ERC721/1155/SPL/ORDINALS...
  contractAddress?: Address; // EVM contract
  mintAuthority?: string; // Solana (nếu cần)
  isPrimary?: boolean; // chain "chính" để hiển thị
}

export interface CollectionContract {
  id: ID;
  collectionId: ID;
  chain: ChainBinding;
  contractAddress?: string; // EVM: address; Solana: program/mint authority
  tokenStandard?: TokenStandard; // ERC721, ERC1155, SPL
}

export interface Token {
  id: ID;
  collectionId: ID;
  tokenNumber: string; // EVM token_id (string) or Solana mint
  name?: string;
  imageUrl?: string;
  metadataUrl?: string;
  ownerAddress?: string;
  mintedAt?: ISODate;
  lastRefreshAt?: ISODate;
  rawMetadata?: RawNftMetadata; // keep original JSON for reprocessing
}

/** ---------- Traits model (normalized) ---------- */
export interface Trait {
  id: ID;
  collectionId: ID;
  /** Original name shown to users, e.g. "Background" */
  name: string;
  /** Lowercased/trimmed for matching/filtering, e.g. "background" */
  normalizedName: string;
  valueType: ValueType; // string | number | date
  displayType?: DisplayType; // OpenSea display_type or UI grouping
  unit?: string; // e.g. "points", "%"
  sortOrder?: number; // optional for UI
}

/** Discriminated union for trait values */
export type TraitValue =
  | {
      id: ID;
      traitId: ID;
      valueType: "string";
      value: string; // display value, e.g. "Blue"
      normalizedValue: string; // e.g. "blue"
      occurrences?: number; // how many tokens have this exact value
      frequency?: number; // occurrences / items_count
      rarityScore?: number; // e.g. 1/frequency
    }
  | {
      id: ID;
      traitId: ID;
      valueType: "number";
      value: number; // numeric trait
      maxValue?: number; // for levels/stats
      unit?: string; // "points", "%", ...
      occurrences?: number;
      frequency?: number;
      rarityScore?: number;
    }
  | {
      id: ID;
      traitId: ID;
      valueType: "date";
      /** ISO 8601 if you normalize to string, or keep epochSeconds for math */
      value?: ISODate;
      epochSeconds?: number;
      occurrences?: number;
      frequency?: number;
      rarityScore?: number;
    };

/** Link table: which token has which trait/value */
export interface TokenTraitLink {
  tokenId: ID;
  traitId: ID;
  traitValueId: ID;
}

/** ---------- Marketplace & listings ---------- */
export interface Marketplace {
  id: ID;
  name: MarketplaceName;
}

export interface Listing {
  id: ID;
  tokenId: ID;
  marketplaceId: ID;
  priceNative: number; // price in native units (ETH, SOL, etc.)
  currencySymbol: CurrencySymbol;
  isActive: boolean;
  listedAt: ISODate;
  updatedAt: ISODate;
}

/** ---------- Aggregates / stats ---------- */
export interface CollectionStats {
  collectionId: ID;
  itemsCount?: number;
  ownersCount?: number;
  floorPrice?: number; // collection-level floor
  marketCapEst?: number;
  lastUpdatedAt: ISODate;
}

export interface TokenRarity {
  tokenId: ID;
  /** e.g. multiplicative product of each selected traitValue rarityScore */
  rarityScoreProduct: number;
}

/** Optional: floor by trait value (denormalized view) */
export interface TraitValueFloor {
  traitValueId: ID;
  floorPrice?: number;
  lastUpdatedAt: ISODate;
}

/** ---------- Sync/ETL state ---------- */
export interface SyncState {
  id: ID;
  collectionId: ID;
  source: MarketplaceName;
  cursor?: string; // pagination cursor/marker
  lastRunAt?: ISODate;
  note?: string;
}

/** Example of a filter you can pass around for search */
export type TraitFilter =
  | { kind: "string"; trait: NormalizedName; values: NormalizedValue[] } // OR within one trait
  | { kind: "number"; trait: NormalizedName; range: NumberRange }
  | { kind: "date"; trait: NormalizedName; range: DateRange };

/** Composite AND filter across multiple traits */
export interface TokenSearchParams {
  collectionId: ID;
  filters?: TraitFilter[]; // AND across entries
  marketplaces?: MarketplaceName[];
  onlyActiveListings?: boolean;
  sort?:
    | { by: "priceNative"; dir: "asc" | "desc" }
    | { by: "rarityScoreProduct"; dir: "asc" | "desc" }
    | { by: "tokenNumber"; dir: "asc" | "desc" };
  limit?: number;
  cursor?: string;
}
