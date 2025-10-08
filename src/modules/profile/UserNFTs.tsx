"use client";

import { useState } from "react";
import { ProfileHeader } from "./components/ProfileHeader";
import { NFTGrid } from "@/modules/marketplace/components/NFTGrid";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { Input } from "@/shared/components/ui/input";
import { Search } from "lucide-react";
import { type UserProfile } from "@/shared/types/profile";
import { mockNFTs } from "@/shared/utils/mock/marketplace";

interface UserNFTsProps {
  profile: UserProfile;
}

export function UserNFTs({ profile }: UserNFTsProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const [filterCollection, setFilterCollection] = useState("all");

  // Mock user's NFTs - in real app, fetch from API
  const userNFTs = mockNFTs.slice(0, profile.stats.nftsOwned);

  // Get unique collections
  const collections = Array.from(
    new Set(userNFTs.map((nft) => nft.collection.name))
  );

  // Filter and sort NFTs
  let filteredNFTs = [...userNFTs];

  if (searchQuery) {
    filteredNFTs = filteredNFTs.filter((nft) =>
      nft.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  if (filterCollection !== "all") {
    filteredNFTs = filteredNFTs.filter(
      (nft) => nft.collection.name === filterCollection
    );
  }

  // Sort NFTs
  switch (sortBy) {
    case "price_high":
      filteredNFTs.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
      break;
    case "price_low":
      filteredNFTs.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
      break;
    case "oldest":
      filteredNFTs.sort(
        (a, b) => a.createdAt.getTime() - b.createdAt.getTime()
      );
      break;
    case "recent":
    default:
      filteredNFTs.sort(
        (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
      );
      break;
  }

  return (
    <div className="min-h-screen">
      <ProfileHeader profile={profile} isCurrentUser={false} />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Owned NFTs</h2>
          <p className="text-muted-foreground">
            {filteredNFTs.length} of {userNFTs.length} items
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search NFTs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={filterCollection} onValueChange={setFilterCollection}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Collection" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Collections</SelectItem>
              {collections.map((collection) => (
                <SelectItem key={collection} value={collection}>
                  {collection}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Recently Acquired</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
              <SelectItem value="price_high">Price: High to Low</SelectItem>
              <SelectItem value="price_low">Price: Low to High</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {filteredNFTs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No NFTs found</p>
          </div>
        ) : (
          <NFTGrid nfts={filteredNFTs} viewMode="grid" />
        )}
      </div>
    </div>
  );
}
