"use client";

import { useState, useEffect } from "react";
import { BaseCarousel } from "@/shared/components/carousel/BaseCarousel";
import { CollectionCard } from "@/modules/product-discovery/collection-carousel/CollectionCard";
import { Collection } from "@/shared/types/collection";
import { makeMockCollections } from "@/shared/utils/mock/mockCollection";

export function CollectionCarousel() {
  const [collections, setCollections] = useState<Collection[]>([]);

  useEffect(() => {
    setCollections(makeMockCollections(10));
  }, []);

  const renderCollectionCard = (
    item: Collection,
    isHovered: boolean,
    onMouseEnter: () => void,
    onMouseLeave: () => void
  ) => (
    <CollectionCard
      item={item}
      isHovered={isHovered}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    />
  );

  return (
    <BaseCarousel
      items={collections}
      renderItem={renderCollectionCard}
      autoplayDelay={2000}
      showNavigation={true}
      loop={true}
      align="start"
      itemsPerView={{
        mobile: 1,
        tablet: 3,
        desktop: 5,
      }}
    />
  );
}
