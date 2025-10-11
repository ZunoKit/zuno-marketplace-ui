import { Profile } from "@/modules/profile";
import { mockUserProfiles } from "@/shared/utils/mock/profile";

interface ProfileByAddressPageProps {
  params: Promise<{
    address: string;
  }>;
}

export async function generateMetadata({ params }: ProfileByAddressPageProps) {
  const { address } = await params;
  // In real app, fetch profile by wallet address
  const profile = mockUserProfiles.find(p => p.address.toLowerCase() === address.toLowerCase()) || {
    ...mockUserProfiles[0],
    address,
    username: undefined,
    displayName: undefined,
  };

  return {
    title: `${profile.displayName || address.slice(0, 8)} | NFT Marketplace`,
    description: `View NFT collection and activity for wallet ${address}`,
  };
}

export default async function ProfileByAddressPage({ params }: ProfileByAddressPageProps) {
  const { address } = await params;

  // In real app, fetch profile by wallet address
  // If no profile exists, create a basic one with just the address
  let profile = mockUserProfiles.find(p => p.address.toLowerCase() === address.toLowerCase());

  if (!profile) {
    // Create basic profile for unknown address
    profile = {
      id: `address-${address}`,
      address,
      username: undefined,
      displayName: undefined,
      bio: undefined,
      avatar: undefined,
      banner: undefined,
      email: undefined,
      website: undefined,
      twitter: undefined,
      discord: undefined,
      createdAt: new Date(),
      updatedAt: new Date(),
      verified: false,
      stats: {
        nftsOwned: Math.floor(Math.random() * 100),
        nftsCreated: 0,
        collections: Math.floor(Math.random() * 10),
        totalVolume: `${(Math.random() * 100).toFixed(2)} ETH`,
        floorPrice: `${(Math.random() * 1).toFixed(3)} ETH`,
        followers: 0,
        following: 0,
      },
    };
  }

  return <Profile profile={profile} isCurrentUser={false} />;
}
