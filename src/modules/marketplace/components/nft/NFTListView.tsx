import React from "react";
import Image from "next/image";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Nft, NftStatus } from "../../types/types";
import { useIsMobile } from "@/shared/hooks/use-mobile";
import { cn } from "@/shared/utils/tailwind-utils";

interface SortingState {
  id: string;
  desc: boolean;
}

interface ColumnFilter {
  id: string;
  value: string;
}

interface NFTListViewProps {
  type: "seller" | "buyer";
  nfts: Nft[];
  sorting: SortingState[];
  setSorting: (sorting: SortingState[]) => void;
  columnFilters: ColumnFilter[];
  setColumnFilters: (filters: ColumnFilter[]) => void;
  onSelect: (id: string) => void;
  onCardClick: (nft: Nft) => void;
  selectedNFTs: string[];
}

export default function NFTListView({
  nfts,
  onSelect,
  onCardClick,
  selectedNFTs,
}: NFTListViewProps) {
  const isMobile = useIsMobile();

  // Table view with sticky columns only for mobile
  return (
    <div className="w-full h-full relative">
      <div className="absolute inset-0 overflow-x-auto overflow-y-auto scrollbar-thin">
        <table className="w-full border-collapse min-w-[800px]">
          <thead className="sticky top-0 z-[15] bg-background border-b">
            <tr>
              {/* Item column - sticky only on mobile */}
              <th
                className={cn(
                  "text-left p-2 md:p-3 font-medium min-w-[180px] w-[180px] sm:w-[220px] md:w-[280px] lg:w-[320px]",
                  isMobile &&
                    "sticky left-0 z-[16] bg-background border-r shadow-[2px_0_4px_-2px_rgba(0,0,0,0.1)]"
                )}
              >
                Item
              </th>
              {/* Scrollable columns */}
              <th className="text-left p-2 md:p-3 font-medium text-xs md:text-sm min-w-[80px] md:min-w-[100px]">
                Token ID
              </th>
              <th className="text-left p-2 md:p-3 font-medium text-xs md:text-sm min-w-[100px] md:min-w-[120px]">
                Status
              </th>
              <th className="text-left p-2 md:p-3 font-medium text-xs md:text-sm min-w-[80px] md:min-w-[100px]">
                Price
              </th>
              <th className="text-left p-2 md:p-3 font-medium text-xs md:text-sm min-w-[120px] md:min-w-[150px]">
                Owner
              </th>
              <th className="text-right p-2 md:p-3 font-medium text-xs md:text-sm min-w-[80px] md:min-w-[100px]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {nfts.map((nft) => (
              <tr
                key={nft.id}
                className="border-b cursor-pointer hover:bg-muted/50"
                onClick={() => onCardClick(nft)}
              >
                <td
                  className={cn(
                    "p-2 md:p-3 min-w-[180px] w-[180px] sm:w-[220px] md:w-[280px] lg:w-[320px]",
                    isMobile &&
                      "sticky left-0 z-[14] bg-background border-r shadow-[2px_0_4px_-2px_rgba(0,0,0,0.1)]"
                  )}
                >
                  <div className="flex items-center gap-2 md:gap-3">
                    <div onClick={(e) => e.stopPropagation()}>
                      <Checkbox
                        checked={selectedNFTs.includes(nft.id)}
                        onCheckedChange={() => onSelect(nft.id)}
                        className="h-4 w-4"
                      />
                    </div>
                    <div className="relative h-10 w-10 md:h-12 md:w-12 rounded overflow-hidden flex-shrink-0">
                      {nft.image && (
                        <Image
                          src={nft.image}
                          alt={nft.name}
                          fill
                          className="object-cover"
                        />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium truncate text-sm md:text-base">
                        {nft.name}
                      </p>
                      {nft.description && (
                        <p className="text-xs md:text-sm text-muted-foreground truncate hidden md:block">
                          {nft.description}
                        </p>
                      )}
                    </div>
                  </div>
                </td>
                <td className="p-2 md:p-3 whitespace-nowrap text-xs md:text-sm">
                  #{nft.tokenId}
                </td>
                <td className="p-2 md:p-3">
                  <Badge
                    variant={
                      nft.status === NftStatus.Listed ? "default" : "secondary"
                    }
                    className="text-[10px] md:text-xs whitespace-nowrap"
                  >
                    {nft.status === NftStatus.Listed ? "Listed" : "Not Listed"}
                  </Badge>
                </td>
                <td className="p-2 md:p-3 whitespace-nowrap text-xs md:text-sm">
                  {nft.listPrice || nft.mintPrice ? (
                    <span className="font-medium">
                      {nft.listPrice || nft.mintPrice} ETH
                    </span>
                  ) : (
                    <span className="text-muted-foreground">-</span>
                  )}
                </td>
                <td className="p-2 md:p-3">
                  <span className="text-xs font-mono truncate block max-w-[120px]">
                    {nft.owner
                      ? `${nft.owner.slice(0, 6)}...${nft.owner.slice(-4)}`
                      : "-"}
                  </span>
                </td>
                <td className="p-2 md:p-3 text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs"
                    onClick={(e) => {
                      e.stopPropagation();
                      onCardClick(nft);
                    }}
                  >
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
