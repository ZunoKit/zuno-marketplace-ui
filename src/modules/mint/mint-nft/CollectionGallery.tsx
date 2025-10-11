"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/shared/components/ui/button";
import { Expand } from "lucide-react";
import { Collection } from "@/shared/types";
import { makeMockCollection } from "@/shared/utils/mock/mockCollection";
import { cn } from "@/shared/utils/tailwind-utils";

interface CollectionGalleryProps {
  onOpenCarousel: (index: number) => void;
  onImageChange?: (imageUrl: string) => void;
}

export default function CollectionGallery({
  onOpenCarousel,
  onImageChange,
}: CollectionGalleryProps) {
  const [collection, setCollection] = useState<Collection | null>(null);
  useEffect(() => {
    setCollection(makeMockCollection());
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [thumbnailLimit, setThumbnailLimit] = useState(3);

  const images = collection ? [collection.imageUrl] : [];
  const defaultImage = "https://placehold.co/1200x1000";
  const image = images[currentIndex] ? `${images[currentIndex]}` : defaultImage;

  useEffect(() => {
    if (collection) {
      onImageChange?.(image);
    }
  }, [image, onImageChange, collection]);

  if (!collection) return null;

  const hasThumbnails = images.length > 1;
  const displayedThumbnails = images.slice(0, thumbnailLimit);
  const hasMoreThumbnails = images.length > thumbnailLimit;

  return (
    <div
      className={cn(
        "bg-gradient-to-b from-gray-50 to-white dark:from-[#0c0916] dark:to-[#0f0a19] rounded-lg relative w-full max-w-full overflow-hidden xl:max-w-2xl border border-gray-200 dark:border-gray-800/50",
        hasThumbnails && "p-5"
      )}
    >
      <div className="absolute top-5 right-5 z-10">
        <Button
          variant="ghost"
          size="icon"
          className="bg-gray-300 dark:bg-[#3b393b] dark:border-gray-800/50 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800/30 rounded-md h-10 w-10 cursor-pointer"
          onClick={() => onOpenCarousel(currentIndex)}
          aria-label={`Open carousel at image ${currentIndex + 1} of ${collection.name}`}
        >
          <Expand className="h-6 w-6" />
        </Button>
      </div>
      <div
        className="aspect-[4/5] relative rounded-md overflow-hidden"
        style={{ width: "100%", height: "auto" }}
      >
        <Image
          src={image || "/placeholder.svg"}
          alt={`Main image of ${collection.name || "NFT collection"}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
          priority
          quality={100}
        />
      </div>

      {hasThumbnails && (
        <div className="mt-5">
          <div className="flex gap-3 overflow-x-auto pb-2">
            {displayedThumbnails.map((img, index) => (
              <div
                key={index}
                className={`flex-shrink-0 w-24 h-24 relative rounded-md overflow-hidden cursor-pointer border-2 transition-all duration-200 hover:opacity-90 dark:hover:opacity-80 ${
                  index === currentIndex
                    ? "border-purple-500 dark:border-purple-400"
                    : "border-transparent"
                }`}
                onClick={() => setCurrentIndex(index)}
                role="button"
                aria-label={`Select thumbnail ${index + 1} of ${collection.name}`}
              >
                <Image
                  src={img || defaultImage}
                  alt={`Thumbnail ${index + 1} of ${collection.name || "NFT collection"}`}
                  fill
                  sizes="200px"
                  className="object-cover"
                  quality={75}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
          {hasMoreThumbnails && (
            <Button
              variant="outline"
              className="mt-3 w-full"
              onClick={() => setThumbnailLimit(prev => prev + 6)}
              aria-label="Load more thumbnails"
            >
              Load More
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
