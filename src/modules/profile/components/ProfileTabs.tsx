"use client";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/ui/tabs";
import { NFTGrid } from "@/modules/marketplace/components/NFTGrid";
import { ActivityList } from "./ActivityList";
import { type UserProfile, type ProfileTab } from "@/shared/types/profile";
import { mockNFTs } from "@/shared/utils/mock/marketplace";
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
  const collectedNFTs = mockNFTs.slice(0, 12);
  const createdNFTs = mockNFTs.slice(12, 20);
  const favoriteNFTs = mockNFTs.slice(20, 28);

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
        <NFTGrid nfts={collectedNFTs} viewMode="grid" />
      </TabsContent>

      <TabsContent value="created" className="mt-6">
        <NFTGrid nfts={createdNFTs} viewMode="grid" />
      </TabsContent>

      <TabsContent value="favorites" className="mt-6">
        <NFTGrid nfts={favoriteNFTs} viewMode="grid" />
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
