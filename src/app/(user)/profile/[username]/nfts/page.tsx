import { UserNFTs } from "@/modules/profile/UserNFTs";
import { mockUserProfiles } from "@/shared/utils/mock/profile";

interface UserNFTsPageProps {
  params: Promise<{
    username: string;
  }>;
}

export async function generateMetadata({ params }: UserNFTsPageProps) {
  const { username } = await params;
  const profile = mockUserProfiles.find(p => p.username === username) || mockUserProfiles[1];

  return {
    title: `${profile.displayName}'s NFTs | NFT Marketplace`,
    description: `Browse NFTs owned by ${profile.displayName}`,
  };
}

export default async function UserNFTsPage({ params }: UserNFTsPageProps) {
  const { username } = await params;
  const profile = mockUserProfiles.find(p => p.username === username) || mockUserProfiles[1];

  return <UserNFTs profile={profile} />;
}
