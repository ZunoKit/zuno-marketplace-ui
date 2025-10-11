/** ===== Common Primitives ===== */
export type ID = string;
export type ISODate = string; // "2025-08-13T12:34:56Z"
export type CAIP2 = string; // "eip155:1", "solana:mainnet"
export type Address = string; // "0x..." | base58...
export type UIntString = string; // big int an toàn: "0", "1234567890123"
export type DecimalString = string; // giá dạng "1.25" hoặc nguyên vị nhỏ nhất: "1000000000000000000"
export type CurrencySymbol = string; // "ETH" | "SOL" | "WETH" | ...

/** ===== Token Standards ===== */
export type TokenStandard = "ERC721" | "ERC1155" | "SPL" | "OTHER";

/** ===== Display Types (OpenSea-style) ===== */
export type DisplayType =
  | "number"
  | "boost_number"
  | "boost_percentage"
  | "date"
  | "properties"
  | "levels"
  | "stats";

/** ===== Value Types ===== */
export type ValueType = "string" | "number" | "date";

/** ===== Chain Family Types ===== */
export type ChainFamily =
  | "EVM"
  | "SOLANA"
  | "BITCOIN"
  | "APTOS"
  | "SUI"
  | "COSMOS"
  | "TON"
  | "TRON"
  | "OTHER";

/** ===== Marketplace Names ===== */
export type MarketplaceName = "opensea" | "zuno" | "blur" | "looksrare" | string;

/** ===== Metadata Standards ===== */
export type MetadataStandard = "opensea" | "zuno" | "custom";

/** ===== Rarity Methods ===== */
export type RarityMethod =
  | "statistical"
  | "trait_normalization"
  | "moonrank"
  | "howrare"
  | "opensea"
  | string;

/** ===== Activity Types ===== */
export type ActivityType =
  | "mint"
  | "transfer"
  | "list"
  | "cancel_list"
  | "offer"
  | "accept_offer"
  | "sale"
  | "burn"
  | "metadata_update";

/** ===== Sort Directions ===== */
export type SortDirection = "asc" | "desc";

/** ===== Range Types ===== */
export interface NumberRange {
  min?: number;
  max?: number;
}

export interface DateRange {
  from?: ISODate;
  to?: ISODate;
}

/** ===== Normalized Types ===== */
export type NormalizedName = string;
export type NormalizedValue = string;

/** ===== Raw metadata (OpenSea-style) ===== */
export interface RawAttribute {
  trait_type?: string; // e.g. "Background"
  value: string | number; // e.g. "Blue" | 90
  display_type?: "number" | "boost_number" | "boost_percentage" | "date";
  max_value?: number; // for levels/stats UI
}

export interface RawNftMetadata {
  name?: string;
  description?: string;
  image?: string; // ipfs/https
  animation_url?: string;
  external_url?: string;
  attributes?: RawAttribute[]; // OpenSea-style attributes
  // Anything else from tokenURI
  [k: string]: unknown;
}
