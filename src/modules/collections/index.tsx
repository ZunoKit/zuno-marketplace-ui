"use client";

import { useState, useMemo } from "react";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { Badge } from "@/shared/components/ui/badge";
import { Search, TrendingUp, Users, Package } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { type Collection } from "@/shared/types/marketplace";
import { mockCollections } from "@/shared/utils/mock/marketplace";

export function CollectionsList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("volume");

  const extendedCollections = useMemo(() => {
    // Generate more collections for demo
    const extended: Collection[] = [];
    for (let i = 0; i < 20; i++) {
      const base = mockCollections[i % mockCollections.length];
      extended.push({
        ...base,
        address: `${base.address}-${i}`,
        name: `${base.name} ${i > 1 ? `#${i}` : ""}`,
        floorPrice: (Math.random() * 0.5).toFixed(3),
        volume24h: (Math.random() * 1000).toFixed(2),
        totalVolume: (Math.random() * 10000).toFixed(2),
        itemCount: Math.floor(Math.random() * 10000),
        ownerCount: Math.floor(Math.random() * 5000),
      });
    }
    return extended;
  }, []);

  const filteredAndSortedCollections = useMemo(() => {
    let filtered = [...extendedCollections];

    // Filter by search
    if (searchQuery) {
      filtered = filtered.filter(collection =>
        collection.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort collections
    switch (sortBy) {
      case "volume":
        filtered.sort(
          (a, b) => parseFloat(b.totalVolume || "0") - parseFloat(a.totalVolume || "0")
        );
        break;
      case "floor":
        filtered.sort((a, b) => parseFloat(b.floorPrice || "0") - parseFloat(a.floorPrice || "0"));
        break;
      case "items":
        filtered.sort((a, b) => b.itemCount - a.itemCount);
        break;
      case "owners":
        filtered.sort((a, b) => b.ownerCount - a.ownerCount);
        break;
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return filtered;
  }, [extendedCollections, searchQuery, sortBy]);

  const getCollectionSlug = (collection: Collection) => {
    return collection.name.toLowerCase().replace(/\s+/g, "-");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Explore Collections</h1>
        <p className="text-muted-foreground">Browse through our curated NFT collections</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search collections..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="volume">Total Volume</SelectItem>
            <SelectItem value="floor">Floor Price</SelectItem>
            <SelectItem value="items">Items</SelectItem>
            <SelectItem value="owners">Owners</SelectItem>
            <SelectItem value="name">Name</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Collections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredAndSortedCollections.map((collection, index) => (
          <Link key={collection.address} href={`/collections/${getCollectionSlug(collection)}`}>
            <Card className="overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-200 h-full">
              <div className="relative h-32">
                {collection.banner ? (
                  <Image
                    src={collection.banner}
                    alt={`${collection.name} banner`}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="h-full bg-gradient-to-br from-purple-500 to-pink-500" />
                )}
                <div className="absolute -bottom-8 left-4">
                  <div className="relative h-16 w-16 rounded-lg overflow-hidden border-4 border-background">
                    {collection.image ? (
                      <Image
                        src={collection.image}
                        alt={collection.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="h-full w-full bg-muted" />
                    )}
                  </div>
                </div>
                {index < 3 && (
                  <Badge className="absolute top-2 right-2" variant="secondary">
                    #{index + 1}
                  </Badge>
                )}
              </div>

              <CardContent className="pt-12 pb-4">
                <div className="flex items-center gap-1 mb-2">
                  <h3 className="font-semibold truncate">{collection.name}</h3>
                  {collection.verified && (
                    <Badge variant="outline" className="text-xs">
                      ✓
                    </Badge>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3 mt-4 text-sm">
                  <div>
                    <p className="text-muted-foreground text-xs mb-1">Floor</p>
                    <p className="font-medium">{collection.floorPrice || "—"} ETH</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs mb-1">24h Vol</p>
                    <p className="font-medium flex items-center gap-1">
                      {collection.volume24h || "—"} ETH
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs mb-1 flex items-center gap-1">
                      <Package className="h-3 w-3" />
                      Items
                    </p>
                    <p className="font-medium">{collection.itemCount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs mb-1 flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      Owners
                    </p>
                    <p className="font-medium">{collection.ownerCount.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
