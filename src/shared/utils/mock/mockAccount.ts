import type { Platform, PlatformUser } from "@/shared/types/account";

const nowIso = () => new Date().toISOString();

export function makeMockAccount(
  platform: Platform = "opensea",
  overrides: Partial<PlatformUser> = {}
): PlatformUser {
  const base: PlatformUser = {
    platform,
    identity: {
      userId: platform === "opensea" ? "os_123" : "me_123",
      username: platform === "opensea" ? "eth_whale" : "sol_degen",
      displayName: platform === "opensea" ? "ETH Whale" : "SOL Degen",
      bio:
        platform === "opensea"
          ? "Collector of digital art on Ethereum"
          : "Cross-chain enjoyoor. SOL first.",
      pfpUrl: "https://avatars.githubusercontent.com/u/9919?s=200&v=4", // placeholder
      bannerUrl: undefined,
      profileUrl:
        platform === "opensea"
          ? "https://opensea.io/eth_whale"
          : "https://zuno.io/u/sol_degen",
      ensName: platform === "opensea" ? "whale.eth" : undefined,
    },
    socials: {
      x: platform === "opensea" ? "eth_whale" : "sol_degen",
      discord: platform === "zuno" ? "soldegen#1234" : undefined,
    },
    wallets: [
      // primary wallet per platform
      platform === "opensea"
        ? {
            chainId: "eip155:1",
            address: "0x1234567890abcdef1234567890ABCDEF12345678",
            isPublic: true,
            isPrimary: true,
          }
        : {
            chainId: "solana:mainnet",
            address: "5h8Vt7w2dCwE5bR9gkLqgq2nZVqsZgHc2bRkPpK8b9aQ",
            isPublic: true,
            isPrimary: true,
          },
      // plus an extra cross-chain wallet
      platform === "opensea"
        ? {
            chainId: "solana:mainnet",
            address: "7s9fWj2zKqQp1TxHMYjv9o4VZ2vJgJv6J1tU9m3P5xAz",
            isPublic: false,
          }
        : {
            chainId: "eip155:8453",
            address: "0xaAaAaAaaAaAaAaaAaAAAAAAAAaaaAaAaAaaAaaAa",
            isPublic: true,
          },
    ],
    preferences: {
      theme: "dark",
      email: {
        enabled: true,
        itemSold: true,
        bidActivity: true,
        priceChange: true,
        outbid: true,
        ownedItemUpdates: true,
        successfulPurchase: true,
        successfulMint: true,
        minimumOfferThreshold: "0.05",
      },
      watchlist: {
        collections:
          platform === "opensea"
            ? ["azuki", "thememeland-captains"]
            : ["degods", "madlads"],
        items: [],
      },
      chainSpecific:
        platform === "zuno"
          ? {
              defaultClick: "openItem",
              feeDisplay: "includeAllFees",
              raritySource: "moonrank",
              explorerPreference: "solscan",
              showInscriptionNumbers: true,
              mempoolProtection: true,
            }
          : undefined,
    },
    galleries:
      platform === "opensea"
        ? {
            galleries: [
              {
                id: "gal-1",
                name: "My ETH Gallery",
                description: "Favorites on Ethereum",
                itemRefs: ["eip155:1/0xabc.../1", "eip155:1/0xdef.../42"],
              },
            ],
          }
        : {
            showcases: [
              {
                name: "SOL Showcase",
                description: "Top SOL picks",
                itemRefs: [
                  "solana:mainnet/So1111...",
                  "solana:mainnet/Me1111...",
                ],
              },
            ],
          },
    stats: {
      itemsOwned: platform === "opensea" ? 24 : 57,
      offersMade: 10,
      offersReceived: 7,
      createdCollections: platform === "opensea" ? 1 : 0,
      followersCount: 1200,
      followingCount: 321,
    },
    rewards:
      platform === "zuno"
        ? {
            me: {
              season: "S1",
              meStaked: "1000",
              points: "42000",
              leaderboardRank: 1337,
            },
          }
        : undefined,
    createdAt: nowIso(),
    updatedAt: nowIso(),
  };

  // shallow override (you can deep-override as needed in tests)
  return { ...base, ...overrides };
}

/** Convenience wrappers */
export const mockOpenSeaAccount = (overrides: Partial<PlatformUser> = {}) =>
  makeMockAccount("opensea", overrides);

export const mockZunoAccount = (overrides: Partial<PlatformUser> = {}) =>
  makeMockAccount("zuno", overrides);
