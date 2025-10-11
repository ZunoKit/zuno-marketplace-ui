import {
  ID,
  ISODate,
  CAIP2,
  Address,
  UIntString,
  DecimalString,
  CurrencySymbol,
  DisplayType,
  MarketplaceName,
  RarityMethod,
  ActivityType,
} from "./primitives";

/* ========== Chain-aware NFT reference (không phụ thuộc DB) ========== */
export type NftRef =
  | {
      family: "EVM";
      chainId: CAIP2;
      contract: `0x${string}`;
      tokenId: UIntString;
      standard?: "ERC721" | "ERC1155";
    }
  | { family: "SOLANA"; chainId: CAIP2; mint: string; standard?: "SPL" }
  | {
      family: "BITCOIN";
      chainId: CAIP2;
      inscriptionId: string;
      standard?: "ORDINALS";
    }
  | { family: "OTHER"; chainId: CAIP2; uniqueKey: string; standard?: string };

/* ========== Media / Content ========== */
export interface NftMedia {
  imageUrl?: string; // png/jpg/gif/svg
  animationUrl?: string; // mp4/webm/mp3/glb/…
  thumbnailUrl?: string; // ảnh nhỏ cho grid
  mimeTypeImage?: string; // "image/png"
  mimeTypeAnimation?: string; // "video/mp4"
  width?: number; // nếu biết
  height?: number;
  contentHashSha256?: string; // nếu có
}

/* ========== Attributes (OpenSea-style) ========== */
export interface NftAttribute {
  trait: string; // "Background"
  value: string | number; // "Blue" | 90
  displayType?: DisplayType; // opensea display_type
  maxValue?: number; // dùng cho levels/stats
  // chuẩn hoá (tuỳ ETL có thể rỗng)
  normalizedTrait?: string; // "background"
  normalizedValue?: string; // "blue"
}

/* ========== Rarity (không ràng buộc thuật toán) ========== */
export interface NftRarity {
  score?: number; // ví dụ 1/frequency
  rank?: number;
  method?: RarityMethod;
  source?: MarketplaceName | "howrare" | "moonrank" | string;
  updatedAt?: ISODate;
}

/* ========== Ownership / Creators / Royalties ========== */
export interface NftOwnership {
  ownerAddress?: Address;
  quantity?: UIntString; // ERC1155
  lastTransferAt?: ISODate;
}

export interface NftCreatorInfo {
  creators?: Address[]; // Solana có nhiều creator
  verifiedCreator?: Address; // nếu biết
  royaltiesBps?: number; // 500 = 5%
}

/* ========== Market data (Listings / Offers / Sales) ========== */
export interface Price {
  native: DecimalString; // "1000000000000000000" (wei) hoặc "1.25" — tuỳ bạn thống nhất
  currency: CurrencySymbol; // "ETH" | "SOL" | "WETH" | ...
  usd?: DecimalString; // quy đổi (nếu có)
}

export interface NftListing {
  marketplace: MarketplaceName;
  isActive: boolean;
  price: Price;
  seller?: Address;
  createdAt: ISODate;
  expiresAt?: ISODate;
  url?: string; // deep-link marketplace
}

export interface NftOffer {
  marketplace?: MarketplaceName;
  from?: Address;
  price: Price;
  createdAt: ISODate;
  expiresAt?: ISODate;
}

export interface NftLastSale {
  marketplace?: string;
  price: Price;
  txHash?: string;
  occurredAt: ISODate;
}

/* ========== Activity (provenance đơn giản) ========== */
export interface NftActivityEvent {
  type: ActivityType;
  from?: Address;
  to?: Address;
  price?: Price;
  txHash?: string;
  blockNumberOrSlot?: string | number;
  timestamp: ISODate;
  marketplace?: string;
}

/* ========== Liên kết tiện ích / kỹ thuật ========== */
export interface NftLinks {
  itemPage?: string; // URL trang NFT trên marketplace
  explorer?: string; // link explorer token/tx
  tokenUri?: string; // EVM tokenURI / SPL metadata URL
  metadataGateway?: string; // ipfs:// đã resolve
}

/* ========== Flags / trạng thái hiển thị ========== */
export interface NftFlags {
  isFlagged?: boolean; // bị gắn cờ (spam/phishing)
  isSpam?: boolean;
  isFrozen?: boolean; // media/metadata bị đóng băng
  isNsfw?: boolean;
  refreshable?: boolean; // có hỗ trợ refresh metadata
}

/* ========== NFT Item (normalized, hiển thị) ========== */
export interface NftItem {
  id: ID; // id nội bộ client/app
  ref: NftRef; // định danh theo chain
  chainId: CAIP2; // lặp lại để filter nhanh
  collectionSlug?: string; // liên kết mềm tới collection (nếu có)

  name?: string;
  description?: string;
  media?: NftMedia;

  attributes?: NftAttribute[];
  rarity?: NftRarity;

  ownership?: NftOwnership;
  creatorInfo?: NftCreatorInfo;

  listings?: NftListing[]; // có thể trống
  offers?: NftOffer[]; // có thể trống
  lastSale?: NftLastSale;

  activities?: NftActivityEvent[]; // tuỳ bạn có nạp hay không
  links?: NftLinks;
  flags?: NftFlags;

  mintedAt?: ISODate; // on-chain
  createdAt?: ISODate; // khi object được tạo trong app
  updatedAt?: ISODate; // lần update gần nhất
}

/* ========== Type guards hữu ích (tuỳ chọn) ========== */
export const isEvmRef = (r: NftRef): r is Extract<NftRef, { family: "EVM" }> => r.family === "EVM";
export const isSolanaRef = (r: NftRef): r is Extract<NftRef, { family: "SOLANA" }> =>
  r.family === "SOLANA";
export const isBitcoinRef = (r: NftRef): r is Extract<NftRef, { family: "BITCOIN" }> =>
  r.family === "BITCOIN";
