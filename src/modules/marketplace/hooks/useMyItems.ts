// Mock hook for fetching user's NFT items
import { useState, useEffect } from "react";
import { Nft, NftStatus } from "@/modules/marketplace/types";

interface UseMyItemsProps {
  contractAddress: string;
  address: string;
  isConnected: boolean;
}

// Generate mock NFTs
const generateMockNFTs = (count: number, contractAddress: string): Nft[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `nft-${i + 1}`,
    tokenId: `${i + 1}`,
    name: `NFT #${i + 1}`,
    description: `This is NFT number ${i + 1} from the collection`,
    image: `https://picsum.photos/400/400?random=${i + 1}`,
    contractAddress,
    chainId: "1",
    owner: "0x1234567890123456789012345678901234567890",
    creator: "0x0987654321098765432109876543210987654321",
    status: i % 3 === 0 ? NftStatus.Listed : NftStatus.NotListed,
    mintPrice: (0.01 + Math.random() * 0.09).toFixed(3),
    listPrice: i % 3 === 0 ? (0.02 + Math.random() * 0.08).toFixed(3) : undefined,
    attributes: [
      {
        trait_type: "Background",
        value: ["Blue", "Red", "Green", "Purple"][i % 4],
      },
      {
        trait_type: "Rarity",
        value: ["Common", "Uncommon", "Rare", "Epic"][i % 4],
      },
      { trait_type: "Level", value: Math.floor(Math.random() * 100) },
    ],
    createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
  }));
};

export function useMyItems({ contractAddress, address, isConnected }: UseMyItemsProps) {
  const [nfts, setNfts] = useState<Nft[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isConnected || !address) {
      setNfts([]);
      setIsLoading(false);
      return;
    }

    // Simulate API call delay
    const loadNFTs = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500));

      // Generate 20 mock NFTs for the user
      const mockNFTs = generateMockNFTs(20, contractAddress);
      setNfts(mockNFTs);
      setIsLoading(false);
    };

    loadNFTs();
  }, [contractAddress, address, isConnected]);

  return {
    nfts,
    isLoading,
  };
}
