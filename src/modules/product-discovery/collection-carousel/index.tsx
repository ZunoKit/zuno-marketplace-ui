"use client";
import { CollectionCarousel } from "./CollectionCarousel";
import { CarouselHeader } from "@/shared/components/carousel/CarouselHeader";

export default function CarouselCollection() {
  return (
    <div className="px-4 md:px-6">
      <CarouselHeader title="Collections" seeAllUrl="/collections" />
      <CollectionCarousel />
    </div>
  );
}
