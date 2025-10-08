"use client";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/ui/tabs";
import NFTGrid from "@/modules/marketplace/components/nft/NFTGrid";
import { ActivityList } from "./ActivityList";
import { type UserProfile, type ProfileTab } from "@/shared/types/profile";
import { type Nft, NftStatus } from "@/modules/marketplace/types/types";
import { mockUserActivities } from "@/shared/utils/mock/profile";
import { Package, Heart, Activity, Tag, Grid3x3 } from "lucide-react";

interface ProfileTabsProps {
  profile: UserProfile;
  activeTab?: ProfileTab;
  onTabChange?: (tab: ProfileTab) => void;
}

export function ProfileTabs({
  profile,
  activeTab = "collected",
  onTabChange,
}: ProfileTabsProps) {
  const tabs = [
    {
      value: "collected",
      label: "Collected",
      icon: Grid3x3,
      count: profile.stats.nftsOwned,
    },
    {
      value: "created",
      label: "Created",
      icon: Package,
      count: profile.stats.nftsCreated,
    },
    { value: "favorites", label: "Favorites", icon: Heart, count: 42 },
    {
      value: "activity",
      label: "Activity",
      icon: Activity,
      count: mockUserActivities.length,
    },
    { value: "offers", label: "Offers", icon: Tag, count: 5 },
  ];

  // Mock data - in real app, these would be fetched based on profile
  const generateMockNft = (index: number): Nft => ({
    id: `nft-${index}`,
    tokenId: `${index}`,
    name: `NFT #${index}`,
    description: `This is NFT number ${index}`,
    image: `https://picsum.photos/400/400?random=${index}`,
    contractAddress: "0x1234567890123456789012345678901234567890",
    chainId: "1",
    owner: profile.address,
    creator: "0x0987654321098765432109876543210987654321",
    status: index % 3 === 0 ? NftStatus.Listed : NftStatus.NotListed,
    mintPrice: (0.01 + Math.random() * 0.09).toFixed(3),
    listPrice:
      index % 3 === 0 ? (0.02 + Math.random() * 0.08).toFixed(3) : undefined,
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

  const collectedNFTs = Array.from({ length: 12 }, (_, i) =>
    generateMockNft(i + 1)
  );
  const createdNFTs = Array.from({ length: 8 }, (_, i) =>
    generateMockNft(i + 13)
  );
  const favoriteNFTs = Array.from({ length: 8 }, (_, i) =>
    generateMockNft(i + 21)
  );

  return (
    <Tabs
      value={activeTab}
      onValueChange={(value) => onTabChange?.(value as ProfileTab)}
      className="mt-8"
    >
      <TabsList className="w-full justify-start overflow-x-auto">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className="flex items-center gap-2"
          >
            <tab.icon className="h-4 w-4" />
            <span>{tab.label}</span>
            <span className="ml-1 text-xs text-muted-foreground">
              ({tab.count})
            </span>
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContent value="collected" className="mt-6">
        <NFTGrid
          type="seller"
          nfts={collectedNFTs}
          view="grid"
          showFilters={false}
          isSliding={false}
          onSelect={() => {}}
          onCardClick={() => {}}
          selectedNFTs={[]}
        />
      </TabsContent>

      <TabsContent value="created" className="mt-6">
        <NFTGrid
          type="seller"
          nfts={createdNFTs}
          view="grid"
          showFilters={false}
          isSliding={false}
          onSelect={() => {}}
          onCardClick={() => {}}
          selectedNFTs={[]}
        />
      </TabsContent>

      <TabsContent value="favorites" className="mt-6">
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
      </TabsContent>

      <TabsContent value="activity" className="mt-6">
        <ActivityList activities={mockUserActivities} />
      </TabsContent>

      <TabsContent value="offers" className="mt-6">
        <div className="text-center py-12">
          <p className="text-muted-foreground">No active offers</p>
        </div>
      </TabsContent>
    </Tabs>
  );
}
