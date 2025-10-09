/**
 * Constants Index
 */

export * from "./chains";
export * from "./routes";
export * from "./contracts";

// General constants
export const APP_NAME = "Zuno Marketplace";
export const APP_DESCRIPTION =
  "NFT Marketplace for buying, selling, and trading digital assets";

// Pagination
export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 100;

// File upload
export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
export const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
];
export const ALLOWED_VIDEO_TYPES = ["video/mp4", "video/webm"];

// Time
export const MILLISECONDS_PER_SECOND = 1000;
export const SECONDS_PER_MINUTE = 60;
export const MINUTES_PER_HOUR = 60;
export const HOURS_PER_DAY = 24;

// NFT Categories
export const NFT_CATEGORIES = [
  "Art",
  "Gaming",
  "Music",
  "Photography",
  "Sports",
  "Virtual Worlds",
  "Trading Cards",
  "Collectibles",
  "Utility",
  "Domain Names",
] as const;

export type NFTCategory = (typeof NFT_CATEGORIES)[number];

// Sort options
export const SORT_OPTIONS = {
  PRICE_LOW_TO_HIGH: "price_asc",
  PRICE_HIGH_TO_LOW: "price_desc",
  RECENTLY_LISTED: "recent",
  MOST_VIEWED: "popular",
  ENDING_SOON: "ending_soon",
} as const;
