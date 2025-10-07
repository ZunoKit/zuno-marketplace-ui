"use client";

import { useState } from "react";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { Heart, Eye, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { type NFT } from "@/shared/types/marketplace";
import { cn } from "@/shared/utils";

interface NFTGridProps {
  nfts: NFT[];
  onNFTClick?: (nft: NFT) => void;
  onAddToCart?: (nft: NFT) => void;
  viewMode?: "grid" | "list" | "compact";
  className?: string;
}

export function NFTGrid({
  nfts,
  onNFTClick,
  onAddToCart,
  viewMode = "grid",
  className,
}: NFTGridProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const gridClassName = cn(
    "grid gap-4",
    viewMode === "grid" &&
      "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
    viewMode === "list" && "grid-cols-1",
    viewMode === "compact" &&
      "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6",
    className
  );

  const handleCardClick = (nft: NFT) => {
    if (onNFTClick) {
      onNFTClick(nft);
    }
  };

  const handleAddToCart = (e: React.MouseEvent, nft: NFT) => {
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(nft);
    }
  };

  const renderCard = (nft: NFT) => {
    const isHovered = hoveredId === nft.id;

    if (viewMode === "list") {
      return (
        <Card
          key={nft.id}
          className="overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-lg dark:hover:shadow-white/10"
          onClick={() => handleCardClick(nft)}
        >
          <div className="flex items-center gap-4 p-4">
            <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg">
              <Image
                src={nft.image}
                alt={nft.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-base">{nft.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {nft.collection.name}
                    {nft.collection.verified && " ✓"}
                  </p>
                </div>
                <Badge
                  variant={nft.status === "available" ? "default" : "secondary"}
                >
                  {nft.status}
                </Badge>
              </div>

              <div className="mt-2 flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Heart className="h-4 w-4" />
                    {nft.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    {nft.views}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-semibold">
                    {nft.price} {nft.currency}
                  </span>
                  {nft.status === "available" && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={(e) => handleAddToCart(e, nft)}
                    >
                      <ShoppingCart className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Card>
      );
    }

    return (
      <Card
        key={nft.id}
        className="group overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-lg dark:hover:shadow-white/10"
        onMouseEnter={() => setHoveredId(nft.id)}
        onMouseLeave={() => setHoveredId(null)}
        onClick={() => handleCardClick(nft)}
      >
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={nft.image}
            alt={nft.name}
            fill
            className={cn(
              "object-cover transition-transform duration-300",
              isHovered && "scale-110"
            )}
          />

          {nft.status === "available" && isHovered && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-200">
              <Button
                variant="secondary"
                size="sm"
                onClick={(e) => handleAddToCart(e, nft)}
              >
                Add to Cart
              </Button>
            </div>
          )}

          <Badge
            className="absolute top-2 right-2"
            variant={nft.status === "available" ? "default" : "secondary"}
          >
            {nft.status}
          </Badge>
        </div>

        <CardContent className={cn("p-3", viewMode === "compact" && "p-2")}>
          {viewMode !== "compact" && (
            <p className="text-xs text-muted-foreground mb-1">
              {nft.collection.name}
              {nft.collection.verified && " ✓"}
            </p>
          )}

          <h3
            className={cn(
              "font-semibold truncate",
              viewMode === "compact" ? "text-sm" : "text-base"
            )}
          >
            {nft.name}
          </h3>

          <div className="flex items-center justify-between mt-2">
            <span
              className={cn(
                "font-medium",
                viewMode === "compact" ? "text-sm" : "text-base"
              )}
            >
              {nft.price} {nft.currency}
            </span>

            {viewMode !== "compact" && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Heart className="h-3 w-3" />
                  {nft.likes}
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  {nft.views}
                </span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  return <div className={gridClassName}>{nfts.map(renderCard)}</div>;
}
