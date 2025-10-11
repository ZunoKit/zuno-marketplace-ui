import { UserCollections } from "@/modules/profile/UserCollections";
import { mockUserProfiles } from "@/shared/utils/mock/profile";

interface UserCollectionsPageProps {
  params: Promise<{
    username: string;
  }>;
}

export async function generateMetadata({ params }: UserCollectionsPageProps) {
  const { username } = await params;
  const profile = mockUserProfiles.find(p => p.username === username) || mockUserProfiles[1];

  return {
    title: `${profile.displayName}'s Collections | NFT Marketplace`,
    description: `Browse collections created by ${profile.displayName}`,
  };
}

export default async function UserCollectionsPage({ params }: UserCollectionsPageProps) {
  const { username } = await params;
  const profile = mockUserProfiles.find(p => p.username === username) || mockUserProfiles[1];

  return <UserCollections profile={profile} />;
}
