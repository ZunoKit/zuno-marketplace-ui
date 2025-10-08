"use client";

import { useState } from "react";
import { ProfileHeader } from "./components/ProfileHeader";
import { ActivityList } from "./components/ActivityList";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/ui/tabs";
import { type UserProfile } from "@/shared/types/profile";
import { generateMockActivities } from "@/shared/utils/mock/profile";

interface UserActivityProps {
  profile: UserProfile;
}

export function UserActivity({ profile }: UserActivityProps) {
  const [activityFilter, setActivityFilter] = useState("all");

  // Generate activities for this user
  const allActivities = generateMockActivities(profile.id, 30);

  // Filter activities
  const filteredActivities = allActivities.filter((activity) => {
    if (activityFilter === "all") return true;
    if (activityFilter === "sales") return activity.type === "sale";
    if (activityFilter === "purchases") return activity.type === "purchase";
    if (activityFilter === "listings") return activity.type === "listing";
    if (activityFilter === "bids") return activity.type === "bid";
    if (activityFilter === "transfers") return activity.type === "transfer";
    return true;
  });

  return (
    <div className="min-h-screen">
      <ProfileHeader profile={profile} isCurrentUser={false} />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Activity</h2>
          <p className="text-muted-foreground">
            Recent transactions and activities
          </p>
        </div>

        <Tabs value={activityFilter} onValueChange={setActivityFilter}>
          <TabsList className="mb-6">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="sales">Sales</TabsTrigger>
            <TabsTrigger value="purchases">Purchases</TabsTrigger>
            <TabsTrigger value="listings">Listings</TabsTrigger>
            <TabsTrigger value="bids">Bids</TabsTrigger>
            <TabsTrigger value="transfers">Transfers</TabsTrigger>
          </TabsList>

          <TabsContent value={activityFilter}>
            {filteredActivities.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No activity found</p>
              </div>
            ) : (
              <ActivityList activities={filteredActivities} />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
