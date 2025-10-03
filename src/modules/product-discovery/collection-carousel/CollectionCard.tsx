import { Card, CardContent } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { type Collection } from "@/shared/types/collection";
import { redirect } from "next/navigation";
import Image from "next/image";
import { getCollectionStatus } from "@/shared/utils/collection";

interface CollectionCardProps {
  item: Collection;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export function CollectionCard({
  item,
  isHovered,
  onMouseEnter,
  onMouseLeave,
}: CollectionCardProps) {
  const { isLive, isUpcoming, statusText, statusColor } = getCollectionStatus({
    status: item.status || "upcoming",
    mintStartDate: item.mintStartDate?.toString(),
    publicMint: item.publicMint
      ? {
          startDate: item.mintStartDate?.toString(),
          endDate: item.mintEndDate?.toString(),
          mintPrice: item.mintPrice,
        }
      : undefined,
    totalMinted: (item.totalMinted || 0).toString(),
    maxSupply: (item.maxSupply || 0).toString(),
  });

  const imageSrc = `${item.imageUrl || "/placeholder.svg"}`;
  const fallbackSrc = "https://placehold.co/300x200";

  const handleCardClick = () => {
    if (isLive) {
      redirect(`/marketplace/${item.slug}`);
    }
  };

  const handleMintClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    redirect(`/mint/${item.slug}`);
  };

  return (
    <div
      className="relative group cursor-pointer h-full"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={handleCardClick}
    >
      <Card className="overflow-hidden border border-gray-200 dark:border-white/10 bg-white dark:bg-[#1A1F2C] text-gray-900 dark:text-white text-sm h-full p-0">
        <div className="flex flex-col h-full">
          <div className="relative aspect-[4/3] w-full overflow-hidden">
            <Image
              src={imageSrc}
              alt={item.name}
              fill
              quality={100}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className={`object-cover transition-transform duration-500 ${
                isHovered ? "scale-110" : "scale-100"
              }`}
              onError={(e) => {
                e.currentTarget.src = fallbackSrc;
              }}
            />
            {(isLive || isUpcoming) && (
              <div
                className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-2 h-16 flex items-end transform transition-transform duration-300 ${
                  isHovered ? "translate-y-0" : "translate-y-full"
                }`}
              >
                <div className="flex flex-col items-center gap-2 w-full">
                  <Button
                    className="w-full text-xs cursor-pointer bg-white/90 hover:bg-white text-gray-900 dark:bg-white/90 dark:hover:bg-white dark:text-gray-900"
                    variant="secondary"
                    size="sm"
                    type="button"
                    disabled={isUpcoming}
                    onClick={handleMintClick}
                  >
                    {isLive ? "Mint Now" : "Coming Soon"}
                  </Button>
                </div>
              </div>
            )}
          </div>

          <CardContent className="p-3 flex flex-col h-[120px] justify-between">
            <h3 className="font-semibold truncate text-base text-gray-900 dark:text-white mb-2">
              {item.name}
            </h3>

            <div className="grid grid-cols-3 gap-1 mb-auto">
              <div>
                <p className="text-[10px] uppercase font-medium text-gray-500 dark:text-gray-400">
                  PRICE
                </p>
                <p className="font-medium text-sm text-gray-900 dark:text-white truncate">
                  {item.mintPrice || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-[10px] uppercase font-medium text-gray-500 dark:text-gray-400">
                  ITEMS
                </p>
                <p className="font-medium text-sm text-gray-900 dark:text-white truncate">
                  {item.maxSupply}
                </p>
              </div>
              <div>
                <p className="text-[10px] uppercase font-medium text-gray-500 dark:text-gray-400">
                  MINTED
                </p>
                <p className="font-medium text-sm text-gray-900 dark:text-white truncate">
                  {item.totalMinted}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 mt-2 pt-1.5 border-t border-gray-100 dark:border-white/5">
              <span className={`w-2 h-2 rounded-full ${statusColor}`}></span>
              <span
                className="text-xs text-gray-900 dark:text-white truncate"
                title={statusText}
              >
                {statusText}
              </span>
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}
