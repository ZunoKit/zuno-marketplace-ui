"use client";

import { Star, ChevronDown, Share2, Globe, ChevronUp, Twitter, MessageCircle } from "lucide-react";
import Image from "next/image";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { useState } from "react";
import { toast } from "sonner";
import { Collection } from "@/shared/utils/mock/collection";
import { cn } from "@/shared/utils/tailwind-utils";
import { randomImage } from "@/shared/utils/mock/randomImage";

interface InformationNFTProps {
  collection?: Collection;
}
export default function InformationNFT({ collection }: InformationNFTProps) {
  const [showInfo, setShowInfo] = useState(false);
  return (
    <header className="border-b bg-background/50 backdrop-blur-sm">
      <div className="flex items-center justify-between p-4 md:p-6">
        <div className="flex items-center gap-3 md:gap-4">
          <div className="relative h-12 w-12 md:h-14 md:w-14 rounded-lg overflow-hidden border-2 border-primary/20">
            <Image
              src={collection?.image || randomImage()}
              alt={collection?.name || "Collection"}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold flex items-center gap-2">
              {collection?.name}
              <Badge variant="secondary" className="gap-1">
                <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                Verified
              </Badge>
            </h1>
            <div className="flex items-center gap-2 text-sm">
              <Button
                variant="outline"
                size="sm"
                className="h-7 gap-1"
                onClick={() => setShowInfo(!showInfo)}
              >
                Info
                {showInfo ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-7 gap-1"
                onClick={() => {
                  const url = window.location.href;
                  navigator.clipboard.writeText(url);
                  toast.success("Link copied to clipboard!");
                }}
              >
                Share Stats <Share2 className="h-3 w-3" />
              </Button>
              <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                <Globe className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                <MessageCircle className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                <Twitter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      {showInfo && (
        <div
          className={cn(
            "transition-all duration-300 ease-in-out overflow-hidden",
            "bg-muted/30 backdrop-blur-sm border-t"
          )}
        >
          <div className="p-4 md:p-6 max-w-4xl">
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              {collection?.description || "No description available for this collection."}
            </p>
          </div>
        </div>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4 px-4 md:px-6 py-3 bg-muted/10">
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground">Floor Price</span>
          <div className="font-semibold text-sm md:text-base">0.0276 BTC</div>
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground">Total Volume</span>
          <div className="font-semibold text-sm md:text-base">98.42 BTC</div>
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground">Owners</span>
          <div className="font-semibold text-sm md:text-base">2.7K</div>
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground">Listed</span>
          <div className="font-semibold text-sm md:text-base">425</div>
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground">Total Supply</span>
          <div className="font-semibold text-sm md:text-base">10K</div>
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground">Range</span>
          <div className="font-semibold text-xs md:text-sm">-265K to -234K</div>
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground">Pending</span>
          <div className="font-semibold text-sm md:text-base">0 TXs</div>
        </div>
      </div>
    </header>
  );
}
