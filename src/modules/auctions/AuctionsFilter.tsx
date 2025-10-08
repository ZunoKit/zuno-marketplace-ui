"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { type AuctionFilter } from "@/shared/types/auction";

interface AuctionsFilterProps {
  filter: AuctionFilter;
  onFilterChange: (filter: AuctionFilter) => void;
}

export function AuctionsFilter({
  filter,
  onFilterChange,
}: AuctionsFilterProps) {
  const handleSortChange = (value: string) => {
    onFilterChange({ ...filter, sortBy: value as AuctionFilter["sortBy"] });
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
      <div>
        <h2 className="text-2xl font-bold">Live Auctions</h2>
        <p className="text-muted-foreground">
          Bid on exclusive NFTs in real-time auctions
        </p>
      </div>

      <Select value={filter.sortBy} onValueChange={handleSortChange}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ending_soon">Ending Soon</SelectItem>
          <SelectItem value="newly_listed">Newly Listed</SelectItem>
          <SelectItem value="highest_bid">Highest Bid</SelectItem>
          <SelectItem value="most_bids">Most Bids</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
