import { type NFTDetail, type NFTActivity, type NFTOffer } from "@/shared/types/nft-detail";
import { mockNFTs } from "./marketplace";

const generateNFTActivities = (tokenId: string): NFTActivity[] => {
  const activities: NFTActivity[] = [];
  const types: NFTActivity["type"][] = ["mint", "transfer", "sale", "listing", "offer"];

  for (let i = 0; i < 10; i++) {
    activities.push({
      id: `activity-${tokenId}-${i}`,
      type: types[i % types.length],
      from: {
        address: `0x${Math.random().toString(16).substring(2, 10)}`,
        name: `User${i}`,
      },
      to:
        i % 2 === 0
          ? {
              address: `0x${Math.random().toString(16).substring(2, 10)}`,
              name: `User${i + 100}`,
            }
          : undefined,
      price: i % 3 === 0 ? (Math.random() * 2).toFixed(3) : undefined,
      currency: "ETH",
      timestamp: new Date(Date.now() - i * 24 * 60 * 60 * 1000),
      txHash: `0x${Math.random().toString(16).substring(2)}`,
    });
  }

  return activities;
};

const generateNFTOffers = (tokenId: string): NFTOffer[] => {
  const offers: NFTOffer[] = [];
  const statuses: NFTOffer["status"][] = ["active", "accepted", "rejected", "expired"];

  for (let i = 0; i < 5; i++) {
    offers.push({
      id: `offer-${tokenId}-${i}`,
      offerer: {
        address: `0x${Math.random().toString(16).substring(2, 10)}`,
        name: `Offerer${i}`,
        avatar: `https://picsum.photos/100/100?random=${700 + i}`,
      },
      price: (Math.random() * 1.5 + 0.1).toFixed(3),
      currency: "ETH",
      expiresAt: new Date(Date.now() + (7 - i) * 24 * 60 * 60 * 1000),
      createdAt: new Date(Date.now() - i * 24 * 60 * 60 * 1000),
      status: statuses[i % statuses.length],
    });
  }

  return offers.filter(o => o.status === "active");
};

export const generateNFTDetail = (
  chain: string,
  contractAddress: string,
  tokenId: string
): NFTDetail => {
  const baseNFT = mockNFTs[parseInt(tokenId) % mockNFTs.length];

  return {
    ...baseNFT,
    blockchain: {
      chain,
      contractAddress,
      tokenStandard: "ERC-721",
      tokenId,
    },
    metadata: {
      description: `This is a unique NFT from the ${baseNFT.collection.name} collection. Each piece in this collection represents a unique digital artwork.`,
      externalUrl: `https://example.com/nft/${tokenId}`,
      animationUrl: undefined,
      backgroundColor: "#f3f4f6",
    },
    history: generateNFTActivities(tokenId),
    offers: generateNFTOffers(tokenId),
    moreFromCollection: mockNFTs.slice(0, 8),
    rarity: {
      rank: Math.floor(Math.random() * 1000) + 1,
      score: Math.random() * 100,
      totalSupply: 10000,
    },
  };
};
