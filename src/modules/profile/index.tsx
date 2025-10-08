"use client";

import { useState } from "react";
import { ProfileHeader } from "./ProfileHeader";
import { ProfileTabs } from "./ProfileTabs";
import { type UserProfile, type ProfileTab } from "@/shared/types/profile";
import { mockCurrentUser } from "@/shared/utils/mock/profile";

interface ProfileProps {
  profile?: UserProfile;
  isCurrentUser?: boolean;
}

export function Profile({
  profile = mockCurrentUser,
  isCurrentUser = false,
}: ProfileProps) {
  const [activeTab, setActiveTab] = useState<ProfileTab>("collected");
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollow = () => {
    setIsFollowing(true);
    // Add follow logic
  };

  const handleUnfollow = () => {
    setIsFollowing(false);
    // Add unfollow logic
  };

  return (
    <div className="min-h-screen">
      <ProfileHeader
        profile={profile}
        isCurrentUser={isCurrentUser}
        onFollow={handleFollow}
        onUnfollow={handleUnfollow}
        isFollowing={isFollowing}
      />

      <div className="container mx-auto px-4">
        <ProfileTabs
          profile={profile}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </div>
    </div>
  );
}

export { ProfileHeader } from "./ProfileHeader";
export { ProfileTabs } from "./ProfileTabs";
export { ActivityList } from "./ActivityList";
