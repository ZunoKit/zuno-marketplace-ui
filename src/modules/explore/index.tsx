"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Filter,
  Grid3X3,
  List,
  TrendingUp,
  Clock,
  DollarSign,
  SlidersHorizontal,
  X,
  Search,
} from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { Badge } from "@/shared/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/shared/components/ui/card";
import { Slider } from "@/shared/components/ui/slider";
import { Checkbox } from "@/shared/components/ui/checkbox";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/shared/utils/tailwind-utils";

interface NFTItem {
  id: string;
  name: string;
  collection: string;
  image: string;
  price: number;
  currency: string;
  likes: number;
  lastSale?: number;
  owner: {
    name: string;
    avatar: string;
    verified: boolean;
  };
  rarity?: string;
  blockchain: string;
  category: string;
  isAuction?: boolean;
  endTime?: Date;
}

// Mock data generation
const generateMockNFTs = (count: number): NFTItem[] => {
  const categories = ["Art", "Gaming", "Music", "Photography", "Sports", "Collectibles"];
  const blockchains = ["Ethereum", "Polygon", "Solana", "BNB Chain"];
  const rarities = ["Common", "Uncommon", "Rare", "Epic", "Legendary"];

  return Array.from({ length: count }, (_, i) => ({
    id: `nft-${i + 1}`,
    name: `NFT #${1000 + i}`,
    collection: `Collection ${Math.floor(i / 10) + 1}`,
    image: `https://picsum.photos/400/400?random=${i + 100}`,
    price: Math.random() * 10,
    currency: "ETH",
    likes: Math.floor(Math.random() * 1000),
    lastSale: Math.random() > 0.5 ? Math.random() * 8 : undefined,
    owner: {
      name: `User${Math.floor(Math.random() * 100)}`,
      avatar: `https://picsum.photos/100/100?random=${i + 200}`,
      verified: Math.random() > 0.5,
    },
    rarity: rarities[Math.floor(Math.random() * rarities.length)],
    blockchain: blockchains[Math.floor(Math.random() * blockchains.length)],
    category: categories[Math.floor(Math.random() * categories.length)],
    isAuction: Math.random() > 0.7,
    endTime:
      Math.random() > 0.7
        ? new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000)
        : undefined,
  }));
};

export default function ExploreMarketplace() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("trending");
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBlockchains, setSelectedBlockchains] = useState<string[]>([]);
  const [showOnlyAuctions, setShowOnlyAuctions] = useState(false);
  const [showOnlyBuyNow, setShowOnlyBuyNow] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const allNFTs = useMemo(() => generateMockNFTs(100), []);

  const filteredNFTs = useMemo(() => {
    let filtered = [...allNFTs];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        nft =>
          nft.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          nft.collection.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(nft => selectedCategories.includes(nft.category));
    }

    // Blockchain filter
    if (selectedBlockchains.length > 0) {
      filtered = filtered.filter(nft => selectedBlockchains.includes(nft.blockchain));
    }

    // Price range filter
    filtered = filtered.filter(nft => nft.price >= priceRange[0] && nft.price <= priceRange[1]);

    // Auction/Buy Now filter
    if (showOnlyAuctions) {
      filtered = filtered.filter(nft => nft.isAuction);
    }
    if (showOnlyBuyNow) {
      filtered = filtered.filter(nft => !nft.isAuction);
    }

    // Sorting
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "recent":
        filtered.sort((a, b) => b.id.localeCompare(a.id));
        break;
      case "trending":
        filtered.sort((a, b) => b.likes - a.likes);
        break;
    }

    return filtered;
  }, [
    allNFTs,
    searchQuery,
    selectedCategories,
    selectedBlockchains,
    priceRange,
    showOnlyAuctions,
    showOnlyBuyNow,
    sortBy,
  ]);

  const FilterSidebar = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-3">Status</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="buy-now"
              checked={showOnlyBuyNow}
              onCheckedChange={checked => setShowOnlyBuyNow(checked as boolean)}
            />
            <label htmlFor="buy-now" className="text-sm cursor-pointer">
              Buy Now
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="on-auction"
              checked={showOnlyAuctions}
              onCheckedChange={checked => setShowOnlyAuctions(checked as boolean)}
            />
            <label htmlFor="on-auction" className="text-sm cursor-pointer">
              On Auction
            </label>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3">Price Range</h3>
        <div className="space-y-3">
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            max={100}
            step={0.1}
            className="w-full"
          />
          <div className="flex items-center justify-between text-sm">
            <Input
              type="number"
              value={priceRange[0]}
              onChange={e => setPriceRange([Number(e.target.value), priceRange[1]])}
              className="w-20 h-8"
            />
            <span>to</span>
            <Input
              type="number"
              value={priceRange[1]}
              onChange={e => setPriceRange([priceRange[0], Number(e.target.value)])}
              className="w-20 h-8"
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3">Categories</h3>
        <div className="space-y-2">
          {["Art", "Gaming", "Music", "Photography", "Sports", "Collectibles"].map(category => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={category}
                checked={selectedCategories.includes(category)}
                onCheckedChange={checked => {
                  if (checked) {
                    setSelectedCategories([...selectedCategories, category]);
                  } else {
                    setSelectedCategories(selectedCategories.filter(c => c !== category));
                  }
                }}
              />
              <label htmlFor={category} className="text-sm cursor-pointer">
                {category}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3">Blockchain</h3>
        <div className="space-y-2">
          {["Ethereum", "Polygon", "Solana", "BNB Chain"].map(chain => (
            <div key={chain} className="flex items-center space-x-2">
              <Checkbox
                id={chain}
                checked={selectedBlockchains.includes(chain)}
                onCheckedChange={checked => {
                  if (checked) {
                    setSelectedBlockchains([...selectedBlockchains, chain]);
                  } else {
                    setSelectedBlockchains(selectedBlockchains.filter(c => c !== chain));
                  }
                }}
              />
              <label htmlFor={chain} className="text-sm cursor-pointer">
                {chain}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Button
        variant="outline"
        className="w-full"
        onClick={() => {
          setSelectedCategories([]);
          setSelectedBlockchains([]);
          setPriceRange([0, 100]);
          setShowOnlyAuctions(false);
          setShowOnlyBuyNow(false);
        }}
      >
        Clear All Filters
      </Button>
    </div>
  );

  const NFTCard = ({ nft }: { nft: NFTItem }) => (
    <Link href={`/nft/${nft.id}`}>
      <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden">
        <div className="relative aspect-square">
          <Image
            src={nft.image}
            alt={nft.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
          />
          {nft.isAuction && nft.endTime && (
            <Badge className="absolute top-2 left-2 bg-red-500 text-white">
              <Clock className="w-3 h-3 mr-1" />
              Auction
            </Badge>
          )}
          {nft.rarity && (
            <Badge
              className={cn(
                "absolute top-2 right-2",
                nft.rarity === "Legendary" && "bg-yellow-500",
                nft.rarity === "Epic" && "bg-purple-500",
                nft.rarity === "Rare" && "bg-blue-500",
                nft.rarity === "Uncommon" && "bg-green-500",
                nft.rarity === "Common" && "bg-gray-500"
              )}
            >
              {nft.rarity}
            </Badge>
          )}
        </div>
        <CardContent className="pt-4">
          <p className="text-xs text-muted-foreground mb-1">{nft.collection}</p>
          <h3 className="font-semibold truncate">{nft.name}</h3>

          <div className="flex items-center gap-2 mt-2 mb-3">
            <Image
              src={nft.owner.avatar}
              alt={nft.owner.name}
              width={20}
              height={20}
              className="rounded-full"
            />
            <span className="text-xs text-muted-foreground">@{nft.owner.name}</span>
            {nft.owner.verified && (
              <Badge variant="secondary" className="text-xs px-1">
                Verified
              </Badge>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">
                {nft.isAuction ? "Current Bid" : "Price"}
              </p>
              <p className="font-bold">
                {nft.price.toFixed(2)} {nft.currency}
              </p>
            </div>
            {nft.lastSale && (
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Last Sale</p>
                <p className="text-sm">{nft.lastSale.toFixed(2)} ETH</p>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="pt-0">
          <Button className="w-full" size="sm">
            {nft.isAuction ? "Place Bid" : "Buy Now"}
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Explore NFTs</h1>
        <p className="text-muted-foreground">
          Discover and collect extraordinary NFTs from creators around the world
        </p>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card className="p-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-500" />
            <div>
              <p className="text-sm text-muted-foreground">Total Volume</p>
              <p className="text-xl font-bold">892.5K ETH</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-2">
            <Grid3X3 className="h-5 w-5 text-blue-500" />
            <div>
              <p className="text-sm text-muted-foreground">Total NFTs</p>
              <p className="text-xl font-bold">{allNFTs.length}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-yellow-500" />
            <div>
              <p className="text-sm text-muted-foreground">Floor Price</p>
              <p className="text-xl font-bold">0.08 ETH</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-purple-500" />
            <div>
              <p className="text-sm text-muted-foreground">Active Auctions</p>
              <p className="text-xl font-bold">{allNFTs.filter(n => n.isAuction).length}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Controls Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search NFTs, collections..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex gap-2">
          {/* Mobile Filter Toggle */}
          <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="md:hidden">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>
              <div className="mt-4">
                <FilterSidebar />
              </div>
            </SheetContent>
          </Sheet>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="trending">Trending</SelectItem>
              <SelectItem value="recent">Recently Listed</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex gap-1 border rounded-md p-1">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="icon"
              className="h-8 w-8"
              onClick={() => setViewMode("grid")}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="icon"
              className="h-8 w-8"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Active Filters Display */}
      {(selectedCategories.length > 0 ||
        selectedBlockchains.length > 0 ||
        showOnlyAuctions ||
        showOnlyBuyNow) && (
        <div className="flex flex-wrap gap-2 mb-4">
          {selectedCategories.map(category => (
            <Badge key={category} variant="secondary" className="gap-1">
              {category}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() =>
                  setSelectedCategories(selectedCategories.filter(c => c !== category))
                }
              />
            </Badge>
          ))}
          {selectedBlockchains.map(chain => (
            <Badge key={chain} variant="secondary" className="gap-1">
              {chain}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => setSelectedBlockchains(selectedBlockchains.filter(c => c !== chain))}
              />
            </Badge>
          ))}
          {showOnlyAuctions && (
            <Badge variant="secondary" className="gap-1">
              Auctions Only
              <X className="h-3 w-3 cursor-pointer" onClick={() => setShowOnlyAuctions(false)} />
            </Badge>
          )}
          {showOnlyBuyNow && (
            <Badge variant="secondary" className="gap-1">
              Buy Now Only
              <X className="h-3 w-3 cursor-pointer" onClick={() => setShowOnlyBuyNow(false)} />
            </Badge>
          )}
        </div>
      )}

      {/* Main Content */}
      <div className="flex gap-8">
        {/* Desktop Sidebar */}
        <aside className="hidden md:block w-64 shrink-0">
          <div className="sticky top-4">
            <h2 className="font-semibold mb-4 flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </h2>
            <FilterSidebar />
          </div>
        </aside>

        {/* NFT Grid/List */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-muted-foreground">{filteredNFTs.length} items</p>
          </div>

          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredNFTs.map(nft => (
                <NFTCard key={nft.id} nft={nft} />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredNFTs.map(nft => (
                <Link key={nft.id} href={`/nft/${nft.id}`}>
                  <Card className="p-4 hover:shadow-lg transition-all cursor-pointer">
                    <div className="flex gap-4">
                      <Image
                        src={nft.image}
                        alt={nft.name}
                        width={120}
                        height={120}
                        className="rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-sm text-muted-foreground">{nft.collection}</p>
                            <h3 className="font-semibold text-lg">{nft.name}</h3>
                            <div className="flex items-center gap-2 mt-1">
                              <Image
                                src={nft.owner.avatar}
                                alt={nft.owner.name}
                                width={16}
                                height={16}
                                className="rounded-full"
                              />
                              <span className="text-xs text-muted-foreground">
                                @{nft.owner.name}
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-muted-foreground">
                              {nft.isAuction ? "Current Bid" : "Price"}
                            </p>
                            <p className="font-bold text-lg">
                              {nft.price.toFixed(2)} {nft.currency}
                            </p>
                            {nft.lastSale && (
                              <p className="text-xs text-muted-foreground mt-1">
                                Last: {nft.lastSale.toFixed(2)} ETH
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2 mt-3">
                          <Badge variant="outline">{nft.blockchain}</Badge>
                          <Badge variant="outline">{nft.category}</Badge>
                          {nft.rarity && <Badge variant="outline">{nft.rarity}</Badge>}
                          {nft.isAuction && (
                            <Badge className="bg-red-500 text-white">Auction</Badge>
                          )}
                        </div>
                      </div>
                      <Button className="self-center">
                        {nft.isAuction ? "Place Bid" : "Buy Now"}
                      </Button>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          )}

          {filteredNFTs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No NFTs found matching your criteria</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSelectedCategories([]);
                  setSelectedBlockchains([]);
                  setPriceRange([0, 100]);
                  setShowOnlyAuctions(false);
                  setShowOnlyBuyNow(false);
                  setSearchQuery("");
                }}
              >
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
