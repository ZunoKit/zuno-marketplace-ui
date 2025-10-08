"use client";

import { useState } from "react";
import { ProfileHeader } from "./components/ProfileHeader";
import NFTGrid from "@/modules/marketplace/components/nft/NFTGrid";
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
import { type Nft, NftStatus } from "@/modules/marketplace/types/types";

interface UserNFTsProps {
  profile: UserProfile;
}

export function UserNFTs({ profile }: UserNFTsProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const [filterCollection, setFilterCollection] = useState("all");

  // Mock user's NFTs - in real app, fetch from API
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

  const userNFTs = Array.from(
    { length: Math.min(profile.stats.nftsOwned, 20) },
    (_, i) => generateMockNft(i + 1)
  );

  // Get unique collections
  const collections = ["Collection 1", "Collection 2", "Collection 3"];

  // Filter and sort NFTs
  let filteredNFTs = [...userNFTs];

  if (searchQuery) {
    filteredNFTs = filteredNFTs.filter((nft) =>
      nft.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  if (filterCollection !== "all") {
    // Filter by mock collection
    filteredNFTs = filteredNFTs.filter(
      (nft) =>
        `Collection ${(parseInt(nft.tokenId) % 3) + 1}` === filterCollection
    );
  }

  // Sort NFTs
  switch (sortBy) {
    case "price_high":
      filteredNFTs.sort(
        (a, b) =>
          parseFloat(b.mintPrice || "0") - parseFloat(a.mintPrice || "0")
      );
      break;
    case "price_low":
      filteredNFTs.sort(
        (a, b) =>
          parseFloat(a.mintPrice || "0") - parseFloat(b.mintPrice || "0")
      );
      break;
    case "oldest":
      filteredNFTs.sort(
        (a, b) =>
          new Date(a.createdAt || 0).getTime() -
          new Date(b.createdAt || 0).getTime()
      );
      break;
    case "recent":
    default:
      filteredNFTs.sort(
        (a, b) =>
          new Date(b.createdAt || 0).getTime() -
          new Date(a.createdAt || 0).getTime()
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
          <NFTGrid
            type="seller"
            nfts={filteredNFTs}
            view="grid"
            showFilters={false}
            isSliding={false}
            onSelect={() => {}}
            onCardClick={() => {}}
            selectedNFTs={[]}
          />
        )}
      </div>
    </div>
  );
}
