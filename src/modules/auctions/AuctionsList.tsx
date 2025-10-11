"use client";

import { useState, useMemo } from "react";
import { AuctionCard } from "@/modules/auctions/AuctionCard";
import { AuctionsFilter } from "@/modules/auctions/AuctionsFilter";
import { type Auction, type AuctionFilter } from "@/shared/types/auction";
import { mockAuctions } from "@/shared/utils/mock/auction";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";

interface AuctionsListProps {
  initialAuctions?: Auction[];
}

export function AuctionsList({ initialAuctions = mockAuctions }: AuctionsListProps) {
  const [filter, setFilter] = useState<AuctionFilter>({
    status: "active",
    sortBy: "ending_soon",
  });

  const filteredAndSortedAuctions = useMemo(() => {
    let filtered = [...initialAuctions];

    // Filter by status
    if (filter.status) {
      filtered = filtered.filter(auction => auction.status === filter.status);
    }

    // Filter by price range
    if (filter.priceRange) {
      filtered = filtered.filter(auction => {
        const currentBid = parseFloat(auction.currentBid);
        return currentBid >= filter.priceRange![0] && currentBid <= filter.priceRange![1];
      });
    }

    // Sort auctions
    switch (filter.sortBy) {
      case "ending_soon":
        filtered.sort((a, b) => {
          if (a.status !== "active" && b.status !== "active") return 0;
          if (a.status !== "active") return 1;
          if (b.status !== "active") return -1;
          return a.endTime.getTime() - b.endTime.getTime();
        });
        break;
      case "newly_listed":
        filtered.sort((a, b) => b.startTime.getTime() - a.startTime.getTime());
        break;
      case "highest_bid":
        filtered.sort((a, b) => parseFloat(b.currentBid) - parseFloat(a.currentBid));
        break;
      case "most_bids":
        filtered.sort((a, b) => b.bids.length - a.bids.length);
        break;
    }

    return filtered;
  }, [initialAuctions, filter]);

  const handleFilterChange = (newFilter: AuctionFilter) => {
    setFilter(newFilter);
  };

  const handleBidClick = (auction: Auction) => {
    // Handle bid placement
    console.log("Place bid on:", auction);
  };

  const activeCount = initialAuctions.filter(a => a.status === "active").length;
  const upcomingCount = initialAuctions.filter(a => a.status === "upcoming").length;
  const endedCount = initialAuctions.filter(a => a.status === "ended").length;

  return (
    <div className="space-y-6">
      <AuctionsFilter filter={filter} onFilterChange={handleFilterChange} />

      <Tabs
        value={filter.status || "active"}
        onValueChange={value =>
          handleFilterChange({
            ...filter,
            status: value as AuctionFilter["status"],
          })
        }
      >
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="active">Active ({activeCount})</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming ({upcomingCount})</TabsTrigger>
          <TabsTrigger value="ended">Ended ({endedCount})</TabsTrigger>
        </TabsList>

        <TabsContent value={filter.status || "active"} className="mt-6">
          {filteredAndSortedAuctions.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No auctions found in this category</p>
            </div>
          ) : (
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredAndSortedAuctions.map(auction => (
                <AuctionCard key={auction.id} auction={auction} onBidClick={handleBidClick} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
