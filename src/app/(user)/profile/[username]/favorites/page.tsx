import { UserFavorites } from "@/modules/profile/UserFavorites";
import { mockUserProfiles } from "@/shared/utils/mock/profile";

interface UserFavoritesPageProps {
  params: Promise<{
    username: string;
  }>;
}

export async function generateMetadata({ params }: UserFavoritesPageProps) {
  const { username } = await params;
  const profile = mockUserProfiles.find(p => p.username === username) || mockUserProfiles[1];

  return {
    title: `${profile.displayName}'s Favorites | NFT Marketplace`,
    description: `View NFTs favorited by ${profile.displayName}`,
  };
}

export default async function UserFavoritesPage({ params }: UserFavoritesPageProps) {
  const { username } = await params;
  const profile = mockUserProfiles.find(p => p.username === username) || mockUserProfiles[1];

  return <UserFavorites profile={profile} />;
}
