import { Profile } from "@/modules/profile";
import { mockUserProfiles } from "@/shared/utils/mock/profile";

interface UserProfilePageProps {
  params: {
    username: string;
  };
}

export async function generateMetadata({ params }: UserProfilePageProps) {
  const { username } = await params;
  // In real app, fetch user profile based on username
  const profile =
    mockUserProfiles.find((p) => p.username === username) ||
    mockUserProfiles[1];

  return {
    title: `${profile.displayName || profile.username} | NFT Marketplace`,
    description:
      profile.bio ||
      `View ${profile.displayName}'s NFT collection and activity`,
  };
}

export default async function UserProfilePage({
  params,
}: UserProfilePageProps) {
  const { username } = await params;
  // In real app, fetch user profile based on username
  const profile =
    mockUserProfiles.find((p) => p.username === username) ||
    mockUserProfiles[1];

  // Check if viewing own profile (in real app, compare with current user)
  const isCurrentUser = false;

  return <Profile profile={profile} isCurrentUser={isCurrentUser} />;
}
