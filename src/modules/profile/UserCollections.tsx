"use client";

import { ProfileHeader } from "@/modules/profile/ProfileHeader";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { type UserProfile } from "@/shared/types/profile";
import { mockCollections } from "@/shared/utils/mock/marketplace";
import Image from "next/image";
import Link from "next/link";
import { Package, Users, TrendingUp } from "lucide-react";

interface UserCollectionsProps {
  profile: UserProfile;
}

export function UserCollections({ profile }: UserCollectionsProps) {
  // Mock user collections - in real app, fetch from API
  const userCollections = mockCollections.map((col, index) => ({
    ...col,
    role: index === 0 ? "Creator" : "Collaborator",
    itemsOwned: Math.floor(Math.random() * 50) + 1,
  }));

  return (
    <div className="min-h-screen">
      <ProfileHeader profile={profile} isCurrentUser={false} />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Collections</h2>
          <p className="text-muted-foreground">
            {userCollections.length} collections by{" "}
            {profile.displayName || profile.username}
          </p>
        </div>

        {userCollections.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No collections yet</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userCollections.map((collection) => (
              <Link
                key={collection.address}
                href={`/collections/${collection.name.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <Card className="overflow-hidden cursor-pointer hover:shadow-lg transition-all">
                  <div className="relative h-32">
                    {collection.banner ? (
                      <Image
                        src={collection.banner}
                        alt={collection.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="h-full bg-gradient-to-br from-purple-500 to-pink-500" />
                    )}
                    <Badge
                      className="absolute top-2 right-2"
                      variant={
                        collection.role === "Creator" ? "default" : "secondary"
                      }
                    >
                      {collection.role}
                    </Badge>
                  </div>

                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold truncate">
                        {collection.name}
                      </h3>
                      {collection.verified && (
                        <Badge variant="outline" className="text-xs">
                          ✓
                        </Badge>
                      )}
                    </div>

                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {collection.description}
                    </p>

                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div>
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mb-1">
                          <Package className="h-3 w-3" />
                          Items
                        </p>
                        <p className="font-medium">{collection.itemCount}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mb-1">
                          <Users className="h-3 w-3" />
                          Owners
                        </p>
                        <p className="font-medium">{collection.ownerCount}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mb-1">
                          <TrendingUp className="h-3 w-3" />
                          Floor
                        </p>
                        <p className="font-medium">
                          {collection.floorPrice} ETH
                        </p>
                      </div>
                    </div>

                    {collection.role === "Collaborator" && (
                      <div className="mt-3 pt-3 border-t">
                        <p className="text-xs text-muted-foreground">
                          Owns {collection.itemsOwned} items in this collection
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
