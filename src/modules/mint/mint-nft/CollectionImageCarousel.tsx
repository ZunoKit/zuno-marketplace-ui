"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/shared/components/ui/button";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Collection } from "@/shared/types";
import { makeMockCollection } from "@/shared/utils/mock/mockCollection";

interface CollectionImageCarouselProps {
  initialIndex: number;
  onClose: () => void;
}

export default function CollectionImageCarousel({
  initialIndex,
  onClose,
}: CollectionImageCarouselProps) {
  const [collection, setCollection] = useState<Collection | null>(null);
  useEffect(() => {
    setCollection(makeMockCollection());
  }, []);
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const images = collection ? [collection.imageUrl] : [];
  const defaultImage = "https://placehold.co/1200x1000"; // 2x the original size
  const showNavigation = images.length > 1;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && showNavigation) handlePrevious();
      if (e.key === "ArrowRight" && showNavigation) handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [currentIndex, showNavigation, onClose]);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };
  const handleCloseClick = () => {
    console.log("Close button clicked");
    onClose();
  };
  if (!collection) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 dark:bg-black/95 flex items-center justify-center">
      <div className="absolute top-5 right-5 z-20">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleCloseClick}
          className="text-white hover:bg-white/10 dark:hover:bg-white/5 h-10 w-10 cursor-pointer"
          aria-label="Close image carousel"
        >
          <X className="h-7 w-7" />
        </Button>
      </div>

      <div className="relative w-full h-full flex items-center justify-center">
        {showNavigation && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-5 z-10 rounded-full bg-black/50 dark:bg-white/10 hover:bg-black/70 dark:hover:bg-white/20 text-white h-12 w-12"
            onClick={handlePrevious}
          >
            <ChevronLeft className="h-8 w-8" />
          </Button>
        )}

        {/* Image */}
        <div className="relative w-full max-w-6xl aspect-square md:aspect-auto md:h-[90vh]">
          <Image
            src={images[currentIndex] ? images[currentIndex] : defaultImage}
            alt={`${collection.name || "Collection"} image ${currentIndex + 1}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 85vw, 80vw"
            className="object-contain"
            quality={100}
          />
        </div>

        {showNavigation && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-5 z-10 rounded-full bg-black/50 dark:bg-white/10 hover:bg-black/70 dark:hover:bg-white/20 text-white h-12 w-12"
            onClick={handleNext}
          >
            <ChevronRight className="h-8 w-8" />
          </Button>
        )}
      </div>

      {showNavigation && (
        <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex gap-3">
          {images.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex
                  ? "bg-white"
                  : "bg-white/30 dark:bg-white/20"
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
