import { UserActivity } from "@/modules/profile/UserActivity";
import { mockUserProfiles } from "@/shared/utils/mock/profile";

interface UserActivityPageProps {
  params: Promise<{
    username: string;
  }>;
}

export async function generateMetadata({ params }: UserActivityPageProps) {
  const { username } = await params;
  const profile = mockUserProfiles.find(p => p.username === username) || mockUserProfiles[1];

  return {
    title: `${profile.displayName}'s Activity | NFT Marketplace`,
    description: `View recent activity by ${profile.displayName}`,
  };
}

export default async function UserActivityPage({ params }: UserActivityPageProps) {
  const { username } = await params;
  const profile = mockUserProfiles.find(p => p.username === username) || mockUserProfiles[1];

  return <UserActivity profile={profile} />;
}
