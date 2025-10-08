"use client";

import { cn } from "@/shared/utils/tailwind-utils";
import { type Nft } from "@/modules/marketplace/types";
import NFTCardSeller from "@/modules/marketplace/NFTCardSeller";
// import NFTCardBuyer from "./NFTCardBuyer"; // Will add when needed

interface NFTGridProps {
  type: "buyer" | "seller";
  nfts: Nft[];
  view: "grid" | "compact";
  showFilters: boolean;
  isSliding: boolean;
  onSelect: (id: string) => void;
  onCardClick?: (nft: Nft) => void;
  selectedNFTs: string[];
}

export default function NFTGrid({
  type,
  nfts,
  view,
  showFilters,
  isSliding,
  onSelect,
  onCardClick,
  selectedNFTs,
}: NFTGridProps) {
  if (!nfts || nfts.length === 0) {
    return (
      <div className="p-3 text-center text-muted-foreground">
        No NFTs available.
      </div>
    );
  }

  const commonProps = {
    view: view,
    isSliding: isSliding,
    onClick: onCardClick,
  };

  return (
    <div
      className={cn(
        "grid gap-3 transition-all duration-300 ease-in-out p-3",
        view === "compact"
          ? showFilters
            ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7"
            : "grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-9"
          : showFilters
            ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
            : "grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7"
      )}
    >
      {nfts.map((nft) =>
        type === "buyer" ? (
          // Will use NFTCardBuyer when implemented
          <NFTCardSeller
            key={nft.id}
            {...commonProps}
            nft={nft}
            onSelect={() => onSelect(nft.id)}
            isSelected={selectedNFTs.includes(nft.id)}
          />
        ) : (
          <NFTCardSeller
            key={nft.id}
            {...commonProps}
            nft={nft}
            onSelect={() => onSelect(nft.id)}
            isSelected={selectedNFTs.includes(nft.id)}
          />
        )
      )}
    </div>
  );
}
