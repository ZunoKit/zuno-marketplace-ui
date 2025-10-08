import { Profile } from "@/modules/profile";
import { mockCurrentUser } from "@/shared/utils/mock/profile";

export const metadata = {
  title: "My Profile | NFT Marketplace",
  description:
    "Manage your NFT collection, view activity, and customize your profile",
};

export default function MyProfilePage() {
  // In real app, get current user from auth context
  return <Profile profile={mockCurrentUser} isCurrentUser={true} />;
}
