import React, { useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/shared/components/ui/sheet";
import {
  Grid3X3,
  LayoutGrid,
  List,
  Filter,
  Search,
  X,
  ArrowUpDown,
} from "lucide-react";

interface ControlBarProps {
  view: "grid" | "list" | "compact";
  setView: (view: "grid" | "list" | "compact") => void;
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
  searchValue: string;
  onSearch: (value: string) => void;
  sortValue: string;
  onSort: (value: string) => void;
}

export default function ControlBar({
  view,
  setView,
  showFilters,
  setShowFilters,
  searchValue,
  onSearch,
  sortValue,
  onSort,
}: ControlBarProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [sortSheetOpen, setSortSheetOpen] = useState(false);

  // Mobile Control Bar - Icons take full width
  const mobileControls = (
    <div className="md:hidden border-b">
      {/* Search - Expandable */}
      {searchOpen ? (
        <div className="flex items-center gap-2 p-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search..."
            className="flex-1"
            value={searchValue}
            onChange={(e) => onSearch(e.target.value)}
            autoFocus
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSearchOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-4 divide-x">
          {/* Search */}
          <Button
            variant="ghost"
            className="rounded-none h-12"
            onClick={() => setSearchOpen(true)}
          >
            <Search className="h-4 w-4" />
          </Button>

          {/* Filter */}
          <Button
            variant={showFilters ? "secondary" : "ghost"}
            className="rounded-none h-12"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4" />
          </Button>

          {/* Sort */}
          <Button
            variant="ghost"
            className="rounded-none h-12"
            onClick={() => setSortSheetOpen(true)}
          >
            <ArrowUpDown className="h-4 w-4" />
          </Button>

          {/* View Toggle */}
          <Button
            variant="ghost"
            className="rounded-none h-12"
            onClick={() => {
              // Cycle through views
              if (view === "compact") setView("grid");
              else if (view === "grid") setView("list");
              else setView("compact");
            }}
          >
            {view === "compact" && <Grid3X3 className="h-4 w-4" />}
            {view === "grid" && <LayoutGrid className="h-4 w-4" />}
            {view === "list" && <List className="h-4 w-4" />}
          </Button>
        </div>
      )}
    </div>
  );

  // Desktop Control Bar
  const desktopControls = (
    <div className="hidden md:flex items-center justify-between gap-4 p-4 border-b">
      <div className="flex items-center gap-2">
        {/* Filter Toggle */}
        <Button
          variant={showFilters ? "default" : "outline"}
          size="sm"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </Button>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search items..."
            className="pl-8 w-[200px] md:w-[300px]"
            value={searchValue}
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Sort */}
        <Select value={sortValue} onValueChange={onSort}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recent">Recently Listed</SelectItem>
            <SelectItem value="low-to-high">Price: Low to High</SelectItem>
            <SelectItem value="high-to-low">Price: High to Low</SelectItem>
          </SelectContent>
        </Select>

        {/* View Toggle */}
        <div className="flex gap-1 border rounded-md p-1">
          <Button
            variant={view === "compact" ? "secondary" : "ghost"}
            size="icon"
            className="h-8 w-8"
            onClick={() => setView("compact")}
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button
            variant={view === "grid" ? "secondary" : "ghost"}
            size="icon"
            className="h-8 w-8"
            onClick={() => setView("grid")}
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button
            variant={view === "list" ? "secondary" : "ghost"}
            size="icon"
            className="h-8 w-8"
            onClick={() => setView("list")}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {mobileControls}
      {desktopControls}

      {/* Sort Sheet for Mobile */}
      <Sheet open={sortSheetOpen} onOpenChange={setSortSheetOpen}>
        <SheetContent side="bottom">
          <SheetHeader>
            <SheetTitle>Sort By</SheetTitle>
          </SheetHeader>
          <div className="mt-4 space-y-2">
            <Button
              variant={sortValue === "recent" ? "default" : "outline"}
              className="w-full justify-start"
              onClick={() => {
                onSort("recent");
                setSortSheetOpen(false);
              }}
            >
              Recently Listed
            </Button>
            <Button
              variant={sortValue === "low-to-high" ? "default" : "outline"}
              className="w-full justify-start"
              onClick={() => {
                onSort("low-to-high");
                setSortSheetOpen(false);
              }}
            >
              Price: Low to High
            </Button>
            <Button
              variant={sortValue === "high-to-low" ? "default" : "outline"}
              className="w-full justify-start"
              onClick={() => {
                onSort("high-to-low");
                setSortSheetOpen(false);
              }}
            >
              Price: High to Low
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
