/**
 * Application Routes
 */

export const ROUTES = {
  // Public routes
  HOME: "/",
  EXPLORE: "/explore",
  MARKETPLACE: "/marketplace",
  ACTIVITY: "/activity",

  // Collections
  COLLECTIONS: "/collections",
  COLLECTION_DETAIL: (id: string) => `/collections/${id}`,

  // NFT
  NFT_DETAIL: (id: string) => `/nft/${id}`,

  // Auctions
  AUCTIONS: "/auctions",
  AUCTION_DETAIL: (id: string) => `/auctions/${id}`,

  // Creator
  CREATE: "/create",
  MINT: "/mint",

  // Launchpad
  LAUNCHPAD: "/launchpad",
  LAUNCHPAD_DETAIL: (id: string) => `/launchpad/${id}`,

  // User
  PROFILE: (address: string) => `/profile/${address}`,
  PROFILE_OWNED: (address: string) => `/profile/${address}?tab=owned`,
  PROFILE_CREATED: (address: string) => `/profile/${address}?tab=created`,
  PROFILE_ACTIVITY: (address: string) => `/profile/${address}?tab=activity`,
  WALLETS: "/wallets",

  // Analytics
  STATS: "/stats",
} as const;

export type RouteKey = keyof typeof ROUTES;
