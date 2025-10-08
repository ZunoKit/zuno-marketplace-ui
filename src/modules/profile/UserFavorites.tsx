"use client";

import { ProfileHeader } from "./components/ProfileHeader";
import { NFTGrid } from "@/modules/marketplace/components/NFTGrid";
import { type UserProfile } from "@/shared/types/profile";
import { mockNFTs } from "@/shared/utils/mock/marketplace";

interface UserFavoritesProps {
  profile: UserProfile;
}

export function UserFavorites({ profile }: UserFavoritesProps) {
  // Mock favorite NFTs - in real app, fetch from API
  const favoriteNFTs = mockNFTs.slice(10, 22);

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
          <NFTGrid nfts={favoriteNFTs} viewMode="grid" />
        )}
      </div>
    </div>
  );
}
