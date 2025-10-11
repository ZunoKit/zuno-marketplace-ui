import { Profile } from "@/modules/profile";

export const metadata = {
  title: "My Profile | NFT Marketplace",
  description: "Manage your NFT collection, view activity, and customize your profile",
};

export default function ProfilePage() {
  // In a real app, this would check if viewing own profile
  const isCurrentUser = true;

  return <Profile isCurrentUser={isCurrentUser} />;
}
