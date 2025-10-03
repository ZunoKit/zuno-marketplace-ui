export type Platform = "opensea" | "magiceden" | "other";

export interface UserIdentity {
  userId?: string; // nội bộ hệ thống của bạn
  username?: string;
  displayName?: string;
  bio?: string;
  pfpUrl?: string;
  bannerUrl?: string;
  profileUrl?: string; // link trang profile
  ensName?: string; // OpenSea hỗ trợ ENS
}

export interface UserSocials {
  x?: string; // @handle
  discord?: string; // chỉ Magic Eden hỗ trợ
}

export interface UserWalletLink {
  chainId: string; // CAIP2
  address: string;
  isPublic?: boolean;
  isPrimary?: boolean; // ví active để hiển thị
}

export interface UserGalleries {
  galleries?: {
    // OpenSea Galleries
    id?: string;
    name: string;
    description?: string;
    itemRefs: string[]; // ref NFT
  }[];
  showcases?: {
    // Magic Eden cross-chain showcase
    name: string;
    description?: string;
    itemRefs: string[];
  }[];
}

export interface EmailNotificationPrefs {
  // OpenSea categories
  enabled: boolean;
  itemSold?: boolean;
  bidActivity?: boolean;
  priceChange?: boolean;
  outbid?: boolean;
  ownedItemUpdates?: boolean;
  successfulPurchase?: boolean;
  successfulMint?: boolean;
  minimumOfferThreshold?: string; // số/tiền dạng string
}

export interface ChainSpecificPrefs {
  // Magic Eden — Global
  defaultClick?: "addToCart" | "openItem";
  // Magic Eden — Solana
  feeDisplay?: "includeAllFees" | "excludeRoyalties";
  raritySource?: "moonrank" | "howrare";
  explorerPreference?: "solscan" | "solanafm" | "solanaExplorer";
  // Magic Eden — Bitcoin
  showInscriptionNumbers?: boolean;
  mempoolProtection?: boolean;
}

export interface UserPreferences {
  theme?: "light" | "dark";
  email?: EmailNotificationPrefs;
  watchlist?: { collections: string[]; items?: string[] };
  chainSpecific?: ChainSpecificPrefs;
}

export interface UserStats {
  itemsOwned?: number;
  offersMade?: number;
  offersReceived?: number;
  createdCollections?: number;
  followersCount?: number; // nếu bạn có social layer riêng
  followingCount?: number;
}

export interface UserRewardsME {
  // Magic Eden
  season?: string;
  meStaked?: string; // decimal string
  points?: string; // decimal string
  leaderboardRank?: number;
}

export interface PlatformUser {
  platform: Platform;
  identity: UserIdentity;
  socials?: UserSocials;
  wallets?: UserWalletLink[];
  preferences?: UserPreferences;
  galleries?: UserGalleries;
  stats?: UserStats;
  rewards?: { me?: UserRewardsME };
  createdAt?: string; // ISODate
  updatedAt?: string; // ISODate
}
