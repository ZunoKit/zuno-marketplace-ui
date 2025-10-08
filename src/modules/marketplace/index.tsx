"use client";

import { useState, useMemo } from "react";
import { NFTGrid } from "./components/NFTGrid";
import { FilterSidebar } from "./components/FilterSidebar";
import { ControlBar } from "./components/ControlBar";
import {
  type NFT,
  type MarketplaceFilter,
  type ViewMode,
} from "@/shared/types/marketplace";
import { mockNFTs } from "@/shared/utils/mock/marketplace";

interface MarketplaceProps {
  initialNFTs?: NFT[];
}

export function Marketplace({ initialNFTs = mockNFTs }: MarketplaceProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<MarketplaceFilter>({
    priceRange: [0, 10],
    sortBy: "recent",
  });

  // Filter and sort NFTs
  const filteredAndSortedNFTs = useMemo(() => {
    let filtered = [...initialNFTs];

    // Apply status filter
    if (filters.status) {
      filtered = filtered.filter((nft) => nft.status === filters.status);
    }

    // Apply price range filter
    if (filters.priceRange) {
      filtered = filtered.filter((nft) => {
        const price = parseFloat(nft.price);
        return (
          price >= filters.priceRange![0] && price <= filters.priceRange![1]
        );
      });
    }

    // Apply attributes filter
    if (filters.attributes) {
      filtered = filtered.filter((nft) => {
        return Object.entries(filters.attributes!).every(([trait, values]) => {
          return nft.attributes?.some(
            (attr) =>
              attr.trait_type === trait && values.includes(String(attr.value))
          );
        });
      });
    }

    // Apply sorting
    switch (filters.sortBy) {
      case "price_asc":
        filtered.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        break;
      case "price_desc":
        filtered.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        break;
      case "oldest":
        filtered.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
        break;
      case "most_liked":
        filtered.sort((a, b) => b.likes - a.likes);
        break;
      case "recent":
      default:
        filtered.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        break;
    }

    return filtered;
  }, [initialNFTs, filters]);

  const handleNFTClick = (nft: NFT) => {
    // Navigate to NFT detail page
    window.location.href = `/nft/${nft.collection.address}`;
  };

  const handleAddToCart = (nft: NFT) => {
    // Add NFT to cart logic
    console.log("Adding to cart:", nft);
  };

  const handleFiltersChange = (newFilters: MarketplaceFilter) => {
    setFilters(newFilters);
  };

  const handleSortChange = (sortBy: MarketplaceFilter["sortBy"]) => {
    setFilters((prev) => ({ ...prev, sortBy }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <ControlBar
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        sortBy={filters.sortBy}
        onSortChange={handleSortChange}
        showFilters={showFilters}
        onToggleFilters={() => setShowFilters(!showFilters)}
        totalItems={filteredAndSortedNFTs.length}
      />

      <div className="flex gap-6 mt-6">
        {showFilters && (
          <aside className="w-64 flex-shrink-0">
            <FilterSidebar
              filters={filters}
              onFiltersChange={handleFiltersChange}
              onReset={() =>
                setFilters({ priceRange: [0, 10], sortBy: "recent" })
              }
            />
          </aside>
        )}

        <main className="flex-1">
          {filteredAndSortedNFTs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No NFTs found matching your filters
              </p>
            </div>
          ) : (
            <NFTGrid
              nfts={filteredAndSortedNFTs}
              viewMode={viewMode}
              onNFTClick={handleNFTClick}
              onAddToCart={handleAddToCart}
            />
          )}
        </main>
      </div>
    </div>
  );
}
