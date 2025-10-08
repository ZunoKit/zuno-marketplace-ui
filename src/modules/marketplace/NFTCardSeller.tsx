"use client";
import Image from "next/image";
import { Button } from "@/shared/components/ui/button";
import { Plus, Check, Zap } from "lucide-react";
import { cn } from "@/shared/utils/tailwind-utils";
import type { Nft } from "@/modules/marketplace/types";
import { NftStatus } from "@/modules/marketplace/types";

interface NFTCardProps {
  nft: Nft;
  view?: "compact" | "grid";
  isSliding?: boolean;
  onSelect: () => void;
  onClick?: (nft: Nft) => void;
  isSelected: boolean;
  disabled?: boolean;
}

export default function NFTCardSeller({
  nft,
  view = "grid",
  isSliding = false,
  onSelect,
  onClick,
  isSelected,
  disabled = false,
}: NFTCardProps) {
  const compact = view === "compact";
  const isListed = nft.status === NftStatus.Listed;

  return (
    <div
      className={cn(
        "group relative rounded-lg border bg-card text-card-foreground shadow-sm transition-all duration-300 hover:shadow-md",
        compact ? "p-0.5" : "p-1",
        (isSliding || disabled) && "pointer-events-none",
        isSelected && "border-pink-800 dark:border-pink-600"
      )}
    >
      <div
        className={cn(
          "hidden group-hover:block absolute inset-0",
          isSelected && "block"
        )}
      >
        <div
          className={cn(
            "hidden group-hover:block absolute z-10 bg-muted/30 text-muted-foreground hover:bg-muted/50 rounded-xl p-2",
            compact ? "left-2 top-2" : "left-4 top-3",
            isSelected && "block"
          )}
        >
          <p className="text-xs font-medium">{isListed ? "Listed" : "Owner"}</p>
        </div>

        <div
          className={cn(
            "hidden group-hover:block absolute z-10",
            compact ? "right-2 top-2" : "right-4 top-3",
            isSelected && "block"
          )}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect();
            }}
            className={cn(
              "cursor-pointer h-10 w-10 rounded-full border flex items-center justify-center transition-colors",
              isSelected
                ? "bg-pink-600 text-white"
                : "bg-muted/30 text-muted-foreground hover:bg-muted/50"
            )}
          >
            {isSelected ? (
              <Check className="w-4 h-4" />
            ) : (
              <Plus className="w-4 h-4" />
            )}
          </button>
        </div>

        <div
          className={cn(
            "hidden group-hover:block absolute bottom-0 left-0 right-0"
          )}
        >
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "w-full hover:bg-pink-500! dark:hover:bg-pink-500! text-black! dark:text-white! bg-slate-500!  dark:bg-slate-600!   rounded-none rounded-b-lg",
              compact ? "h-10" : "h-15",
              isSelected
                ? "bg-pink-600 text-white"
                : "bg-muted/30 text-muted-foreground hover:bg-muted/50"
            )}
          >
            <Zap />
            <p className="text-xs font-medium">
              {!isListed ? (compact ? "List" : "List now") : "Edit Listed"}
            </p>
          </Button>
        </div>
      </div>

      <div
        className={cn("cursor-pointer", compact ? "p-0.5 pb-10" : "p-1 pb-15")}
        onClick={() => onClick?.(nft)}
      >
        <div className="aspect-square overflow-hidden rounded-md">
          <Image
            src={nft.image || "https://placehold.co/200x200"}
            alt={`${nft.name} ${nft.id}`}
            width={200}
            height={200}
            className="h-full w-full object-cover transition-transform group-hover:scale-110"
          />
        </div>

        <div className={cn("mt-1.5", compact ? "text-xs" : "text-sm")}>
          <div className="flex items-center justify-between">
            <div className="font-medium text-foreground truncate">
              {nft.name}
            </div>
            {!compact && (
              <div className="flex items-center gap-0.5">
                <Button variant="ghost" size="icon" className="h-5 w-5">
                  <Image
                    src="https://placehold.co/12x12"
                    alt="Info"
                    width={12}
                    height={12}
                    unoptimized
                  />
                </Button>
                <Button variant="ghost" size="icon" className="h-5 w-5">
                  <Image
                    src="https://placehold.co/12x12"
                    alt="Copy"
                    width={12}
                    height={12}
                    unoptimized
                  />
                </Button>
                <Button variant="ghost" size="icon" className="h-5 w-5">
                  <span className="text-[10px] font-medium">+5</span>
                </Button>
              </div>
            )}
          </div>
          <div
            className={cn(
              "mt-0.5 flex items-center justify-between",
              compact ? "text-xs pb-1" : "text-sm pb-2"
            )}
          >
            <div className="font-bold text-xl">
              {isListed ? <>{nft.mintPrice} ETH</> : <>Unlisted</>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
