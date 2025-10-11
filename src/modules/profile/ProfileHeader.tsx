"use client";

import { useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar";
import { Badge } from "@/shared/components/ui/badge";
import { Globe, Twitter, Copy, Check, Settings, Share2, UserPlus, UserMinus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { type UserProfile } from "@/shared/types/profile";

interface ProfileHeaderProps {
  profile: UserProfile;
  isCurrentUser?: boolean;
  onFollow?: () => void;
  onUnfollow?: () => void;
  isFollowing?: boolean;
}

export function ProfileHeader({
  profile,
  isCurrentUser = false,
  onFollow,
  onUnfollow,
  isFollowing = false,
}: ProfileHeaderProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(profile.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: profile.displayName || profile.username || "User Profile",
        url: window.location.href,
      });
    }
  };

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="relative">
      {/* Banner */}
      <div className="relative h-48 md:h-64 lg:h-80 w-full overflow-hidden rounded-xl">
        {profile.banner ? (
          <Image src={profile.banner} alt="Profile banner" fill className="object-cover" />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-purple-500 to-pink-500" />
        )}
      </div>

      {/* Profile Info */}
      <div className="relative px-4 md:px-8 -mt-16 md:-mt-20">
        <div className="flex flex-col md:flex-row items-start md:items-end gap-4">
          {/* Avatar */}
          <Avatar className="h-32 w-32 md:h-40 md:w-40 border-4 border-background">
            <AvatarImage src={profile.avatar} alt={profile.displayName} />
            <AvatarFallback className="text-2xl">
              {profile.displayName?.[0] || profile.username?.[0] || "?"}
            </AvatarFallback>
          </Avatar>

          {/* User Info */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-2xl md:text-3xl font-bold">
                {profile.displayName || profile.username || truncateAddress(profile.address)}
              </h1>
              {profile.verified && (
                <Badge variant="secondary" className="gap-1">
                  <Check className="h-3 w-3" />
                  Verified
                </Badge>
              )}
            </div>

            {profile.username && <p className="text-muted-foreground mb-2">@{profile.username}</p>}

            <div className="flex items-center gap-2 mb-4">
              <code className="text-sm bg-muted px-2 py-1 rounded">
                {truncateAddress(profile.address)}
              </code>
              <Button variant="ghost" size="sm" onClick={handleCopyAddress} className="h-8 w-8 p-0">
                {copied ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-2">
              {profile.website && (
                <Button variant="ghost" size="sm" asChild>
                  <a href={profile.website} target="_blank" rel="noopener noreferrer">
                    <Globe className="h-4 w-4" />
                  </a>
                </Button>
              )}
              {profile.twitter && (
                <Button variant="ghost" size="sm" asChild>
                  <a
                    href={`https://twitter.com/${profile.twitter.replace("@", "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Twitter className="h-4 w-4" />
                  </a>
                </Button>
              )}
              <Button variant="ghost" size="sm" onClick={handleShare}>
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            {isCurrentUser ? (
              <Button variant="outline" asChild>
                <Link href="/profile/settings/">
                  <Settings className="h-4 w-4 mr-2" />
                  Edit Profile
                </Link>
              </Button>
            ) : (
              <>
                {isFollowing ? (
                  <Button variant="outline" onClick={onUnfollow}>
                    <UserMinus className="h-4 w-4 mr-2" />
                    Unfollow
                  </Button>
                ) : (
                  <Button onClick={onFollow}>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Follow
                  </Button>
                )}
              </>
            )}
          </div>
        </div>

        {/* Bio */}
        {profile.bio && <p className="mt-4 text-muted-foreground max-w-3xl">{profile.bio}</p>}

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mt-6">
          <StatsCard label="NFTs Owned" value={profile.stats.nftsOwned} />
          <StatsCard label="NFTs Created" value={profile.stats.nftsCreated} />
          <StatsCard label="Collections" value={profile.stats.collections} />
          <StatsCard label="Volume" value={profile.stats.totalVolume} />
          <StatsCard label="Floor Price" value={profile.stats.floorPrice} />
          <StatsCard label="Followers" value={profile.stats.followers.toLocaleString()} />
          <StatsCard label="Following" value={profile.stats.following.toLocaleString()} />
        </div>
      </div>
    </div>
  );
}

function StatsCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="bg-card rounded-lg p-3 border">
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      <p className="font-semibold">{value}</p>
    </div>
  );
}
