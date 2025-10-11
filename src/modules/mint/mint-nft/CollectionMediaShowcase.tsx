"use client";

import { useEffect, useState } from "react";
import CollectionGallery from "@/modules/mint/mint-nft/CollectionGallery";
import CollectionImageCarousel from "@/modules/mint/mint-nft/CollectionImageCarousel";
import { Collection } from "@/shared/types";
import { makeMockCollection } from "@/shared/utils/mock/mockCollection";

interface CollectionMediaShowcaseProps {
  onImageChange?: (imageUrl: string) => void;
}

export function CollectionMediaShowcase({ onImageChange }: CollectionMediaShowcaseProps) {
  const [showCarousel, setShowCarousel] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [collection, setCollection] = useState<Collection | null>(null);
  useEffect(() => {
    setCollection(makeMockCollection());
  }, []);

  const handleOpenCarousel = (index: number) => {
    setCarouselIndex(index);
    setShowCarousel(true);
  };
  const handleCloseCarousel = () => {
    console.log("Closing carousel, showCarousel set to false");
    setShowCarousel(false);
  };
  if (!collection) return null;
  return (
    <>
      <CollectionGallery onOpenCarousel={handleOpenCarousel} onImageChange={onImageChange} />
      {showCarousel && (
        <CollectionImageCarousel initialIndex={carouselIndex} onClose={handleCloseCarousel} />
      )}
    </>
  );
}
