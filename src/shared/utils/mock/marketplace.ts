import { type NFT, type Collection } from "@/shared/types/marketplace";

// Mock collections data
export const mockCollections: Collection[] = [
  {
    address: "0x1234567890abcdef",
    name: "Cosmic Dreams",
    description: "A collection of abstract cosmic art pieces",
    image: "https://picsum.photos/200/200?random=1",
    banner: "https://picsum.photos/1200/400?random=1",
    verified: true,
    floorPrice: "0.05",
    volume24h: "125.5",
    totalVolume: "3250.75",
    itemCount: 10000,
    ownerCount: 2456,
    creator: {
      address: "0xCreator123",
      name: "CosmicArtist",
    },
  },
  {
    address: "0xabcdef1234567890",
    name: "Pixel Warriors",
    description: "8-bit style warrior NFT collection",
    image: "https://picsum.photos/200/200?random=2",
    banner: "https://picsum.photos/1200/400?random=2",
    verified: true,
    floorPrice: "0.08",
    volume24h: "89.2",
    totalVolume: "1890.30",
    itemCount: 5000,
    ownerCount: 1234,
    creator: {
      address: "0xCreator456",
      name: "PixelMaster",
    },
  },
];

// Mock NFT data generator
const generateMockNFT = (index: number): NFT => {
  const collection = mockCollections[index % mockCollections.length];
  const statuses: NFT["status"][] = ["available", "sold", "reserved"];
  const listingTypes: NFT["listingType"][] = ["fixed", "auction", "offer"];

  return {
    id: `nft-${index}`,
    tokenId: `${1000 + index}`,
    name: `${collection.name} #${1000 + index}`,
    description: `A unique piece from the ${collection.name} collection`,
    image: `https://picsum.photos/400/400?random=${100 + index}`,
    price: (Math.random() * 0.5 + 0.01).toFixed(3),
    currency: "ETH",
    owner: {
      address: `0xOwner${index.toString().padStart(4, "0")}`,
      name: `Collector${index}`,
      avatar: `https://picsum.photos/100/100?random=${200 + index}`,
    },
    collection: {
      address: collection.address,
      name: collection.name,
      verified: collection.verified,
    },
    attributes: [
      {
        trait_type: "Background",
        value: ["Blue", "Red", "Green", "Purple"][index % 4],
      },
      {
        trait_type: "Rarity",
        value: ["Common", "Uncommon", "Rare", "Legendary"][index % 4],
      },
      {
        trait_type: "Power",
        value: Math.floor(Math.random() * 100),
        display_type: "number",
      },
    ],
    status: statuses[index % statuses.length],
    listingType: listingTypes[index % listingTypes.length],
    createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
    likes: Math.floor(Math.random() * 500),
    views: Math.floor(Math.random() * 5000),
  };
};

// Generate array of mock NFTs
export const mockNFTs: NFT[] = Array.from({ length: 48 }, (_, i) => generateMockNFT(i));

// Mock marketplace stats
export const mockMarketplaceStats = {
  totalVolume: "12,345.67 ETH",
  totalSales: "45,678",
  totalUsers: "23,456",
  avgPrice: "0.27 ETH",
  collections: mockCollections.length,
  nfts: mockNFTs.length,
};
