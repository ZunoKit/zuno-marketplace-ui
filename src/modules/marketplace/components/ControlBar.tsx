"use client";

import { Button } from "@/shared/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { LayoutGrid, List, Square, Filter } from "lucide-react";
import {
  type ViewMode,
  type MarketplaceFilter,
} from "@/shared/types/marketplace";

interface ControlBarProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  sortBy: MarketplaceFilter["sortBy"];
  onSortChange: (sort: MarketplaceFilter["sortBy"]) => void;
  showFilters: boolean;
  onToggleFilters: () => void;
  totalItems: number;
}

export function ControlBar({
  viewMode,
  onViewModeChange,
  sortBy,
  onSortChange,
  showFilters,
  onToggleFilters,
  totalItems,
}: ControlBarProps) {
  const viewModes: { mode: ViewMode; icon: React.ReactNode; label: string }[] =
    [
      { mode: "grid", icon: <LayoutGrid className="h-4 w-4" />, label: "Grid" },
      { mode: "list", icon: <List className="h-4 w-4" />, label: "List" },
      {
        mode: "compact",
        icon: <Square className="h-4 w-4" />,
        label: "Compact",
      },
    ];

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="sm"
          onClick={onToggleFilters}
          className="flex items-center gap-2"
        >
          <Filter className="h-4 w-4" />
          Filters
          {showFilters && (
            <span className="ml-1 px-1.5 py-0.5 text-xs bg-primary text-primary-foreground rounded">
              ON
            </span>
          )}
        </Button>

        <span className="text-sm text-muted-foreground">
          {totalItems} items
        </span>
      </div>

      <div className="flex items-center gap-4">
        <Select
          value={sortBy}
          onValueChange={(value) =>
            onSortChange(value as MarketplaceFilter["sortBy"])
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recent">Recently Listed</SelectItem>
            <SelectItem value="oldest">Oldest</SelectItem>
            <SelectItem value="price_asc">Price: Low to High</SelectItem>
            <SelectItem value="price_desc">Price: High to Low</SelectItem>
            <SelectItem value="most_liked">Most Liked</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex items-center rounded-md border">
          {viewModes.map((item) => (
            <Button
              key={item.mode}
              variant={viewMode === item.mode ? "default" : "ghost"}
              size="sm"
              onClick={() => onViewModeChange(item.mode)}
              className="rounded-none first:rounded-l-md last:rounded-r-md"
              title={item.label}
            >
              {item.icon}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
