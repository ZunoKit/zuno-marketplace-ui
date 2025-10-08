"use client";

import { ProfileHeader } from "./components/ProfileHeader";
import NFTGrid from "@/modules/marketplace/components/nft/NFTGrid";
import { type UserProfile } from "@/shared/types/profile";
import { type Nft, NftStatus } from "@/modules/marketplace/types/types";

interface UserFavoritesProps {
  profile: UserProfile;
}

export function UserFavorites({ profile }: UserFavoritesProps) {
  // Mock favorite NFTs - in real app, fetch from API
  const generateMockNft = (index: number): Nft => ({
    id: `fav-nft-${index}`,
    tokenId: `${index}`,
    name: `Favorite NFT #${index}`,
    description: `This is favorite NFT number ${index}`,
    image: `https://picsum.photos/400/400?random=${index + 100}`,
    contractAddress: "0x1234567890123456789012345678901234567890",
    chainId: "1",
    owner: "0xabcdef1234567890abcdef1234567890abcdef12",
    creator: "0x0987654321098765432109876543210987654321",
    status: NftStatus.Listed,
    mintPrice: (0.01 + Math.random() * 0.09).toFixed(3),
    listPrice: (0.02 + Math.random() * 0.08).toFixed(3),
    attributes: [
      {
        trait_type: "Background",
        value: ["Blue", "Red", "Green", "Purple"][index % 4],
      },
      {
        trait_type: "Rarity",
        value: ["Common", "Uncommon", "Rare", "Epic"][index % 4],
      },
    ],
    createdAt: new Date(
      Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
    ).toISOString(),
    updatedAt: new Date(
      Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000
    ).toISOString(),
  });

  const favoriteNFTs = Array.from({ length: 12 }, (_, i) =>
    generateMockNft(i + 1)
  );

  return (
    <div className="min-h-screen">
      <ProfileHeader profile={profile} isCurrentUser={false} />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Favorite NFTs</h2>
          <p className="text-muted-foreground">
            {favoriteNFTs.length} items favorited by{" "}
            {profile.displayName || profile.username}
          </p>
        </div>

        {favoriteNFTs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No favorites yet</p>
          </div>
        ) : (
          <NFTGrid
            type="seller"
            nfts={favoriteNFTs}
            view="grid"
            showFilters={false}
            isSliding={false}
            onSelect={() => {}}
            onCardClick={() => {}}
            selectedNFTs={[]}
          />
        )}
      </div>
    </div>
  );
}
