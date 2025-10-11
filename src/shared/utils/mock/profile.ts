import { type UserProfile, type ProfileActivity } from "@/shared/types/profile";
import { mockNFTs } from "./marketplace";

// Mock user profiles
export const mockUserProfiles: UserProfile[] = [
  {
    id: "user-1",
    address: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb1",
    username: "cryptoartist",
    displayName: "Crypto Artist",
    bio: "Digital artist exploring the boundaries of NFT art. Creator of multiple successful collections.",
    avatar: "https://picsum.photos/200/200?random=600",
    banner: "https://picsum.photos/1200/300?random=601",
    email: "artist@example.com",
    website: "https://cryptoartist.com",
    twitter: "@cryptoartist",
    discord: "cryptoartist#1234",
    createdAt: new Date("2023-01-15"),
    updatedAt: new Date(),
    verified: true,
    stats: {
      nftsOwned: 156,
      nftsCreated: 89,
      collections: 5,
      totalVolume: "1,234.56 ETH",
      floorPrice: "0.08 ETH",
      followers: 12456,
      following: 234,
    },
  },
  {
    id: "user-2",
    address: "0x8765432109876543210987654321098765432109",
    username: "nftcollector",
    displayName: "NFT Collector",
    bio: "Passionate NFT collector and curator. Always on the lookout for the next big thing.",
    avatar: "https://picsum.photos/200/200?random=602",
    banner: "https://picsum.photos/1200/300?random=603",
    createdAt: new Date("2023-03-20"),
    updatedAt: new Date(),
    verified: false,
    stats: {
      nftsOwned: 432,
      nftsCreated: 0,
      collections: 28,
      totalVolume: "567.89 ETH",
      floorPrice: "0.05 ETH",
      followers: 5678,
      following: 456,
    },
  },
];

// Generate mock activities
const activityTypes: ProfileActivity["type"][] = [
  "purchase",
  "sale",
  "listing",
  "bid",
  "transfer",
  "mint",
];

export const generateMockActivities = (userId: string, count: number = 20): ProfileActivity[] => {
  const activities: ProfileActivity[] = [];

  for (let i = 0; i < count; i++) {
    const type = activityTypes[i % activityTypes.length];
    const nft = mockNFTs[i % mockNFTs.length];

    activities.push({
      id: `activity-${userId}-${i}`,
      type,
      nft: {
        id: nft.id,
        name: nft.name,
        image: nft.image,
        tokenId: nft.tokenId,
        collection: nft.collection.name,
      },
      from:
        type === "purchase" || type === "transfer"
          ? `0xFrom${i.toString().padStart(4, "0")}`
          : userId,
      to: type === "sale" || type === "transfer" ? `0xTo${i.toString().padStart(4, "0")}` : userId,
      price:
        type === "purchase" || type === "sale" || type === "listing" || type === "bid"
          ? (Math.random() * 0.5 + 0.01).toFixed(3)
          : undefined,
      currency:
        type === "purchase" || type === "sale" || type === "listing" || type === "bid"
          ? "ETH"
          : undefined,
      timestamp: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
      txHash: `0x${Math.random().toString(16).substring(2)}`,
    });
  }

  return activities.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
};

// Current user mock data
export const mockCurrentUser: UserProfile = mockUserProfiles[0];

// Mock user activities
export const mockUserActivities = generateMockActivities(mockCurrentUser.id);
