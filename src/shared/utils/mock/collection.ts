// Mock collection service - returns mock data instead of API calls
// Maintains exact same interface as original

export interface Collection {
  id: string;
  name: string;
  description?: string;
  contractAddress: string;
  chainId: string;
  symbol?: string;
  totalSupply?: number;
  floorPrice?: string;
  volume24h?: string;
  owners?: number;
  items?: number;
  image?: string;
  banner?: string;
  verified?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// Mock collections data
const mockCollections: Collection[] = [
  {
    id: "1",
    name: "Cosmic Creatures",
    description: "A collection of unique cosmic creatures from across the universe",
    contractAddress: "0xcosmiccreaturespadded00000000000000000",
    chainId: "1",
    symbol: "COSMIC",
    totalSupply: 10000,
    floorPrice: "0.05",
    volume24h: "125.5",
    owners: 3500,
    items: 10000,
    image: "https://picsum.photos/400/400?random=1",
    banner: "https://picsum.photos/1920/400?random=1",
    verified: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z",
  },
  {
    id: "2",
    name: "Digital Dreams",
    description: "Where imagination meets blockchain technology",
    contractAddress: "0xdigitaldreamspadded000000000000000000000",
    chainId: "1",
    symbol: "DREAM",
    totalSupply: 5000,
    floorPrice: "0.08",
    volume24h: "89.3",
    owners: 1800,
    items: 5000,
    image: "https://picsum.photos/400/400?random=2",
    banner: "https://picsum.photos/1920/400?random=2",
    verified: true,
    createdAt: "2024-01-10T00:00:00Z",
    updatedAt: "2024-01-20T00:00:00Z",
  },
  {
    id: "3",
    name: "Neon Nights",
    description: "Cyberpunk-inspired NFT collection",
    contractAddress: "0xneonnightspadded00000000000000000000000",
    chainId: "1",
    symbol: "NEON",
    totalSupply: 7500,
    floorPrice: "0.03",
    volume24h: "45.7",
    owners: 2200,
    items: 7500,
    image: "https://picsum.photos/400/400?random=3",
    banner: "https://picsum.photos/1920/400?random=3",
    verified: false,
    createdAt: "2024-01-05T00:00:00Z",
    updatedAt: "2024-01-18T00:00:00Z",
  },
];

export async function fetchCollection(
  chainId: string,
  contractAddress: string
): Promise<Collection> {
  // Simulate async API call with delay
  await new Promise(resolve => setTimeout(resolve, 100));

  // Find collection by contract address (mock)
  let collection = mockCollections.find(
    c => c.contractAddress.toLowerCase() === contractAddress.toLowerCase()
  );

  // If not found by exact match, use the contract address to deterministically select a collection
  if (!collection) {
    // Use first few chars of address to select a collection
    const index = parseInt(contractAddress.slice(2, 4), 16) % mockCollections.length;
    collection = {
      ...mockCollections[index],
      contractAddress: contractAddress,
      chainId: chainId,
    };
  }

  if (!collection) {
    throw new Error("Collection not found");
  }

  return collection;
}
