/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import {
  Carousel as CarouselComponent,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/shared/components/ui/carousel";
import { useState, useEffect, ReactNode } from "react";
import type { CarouselApi } from "@/shared/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export type CarouselItemData = {
  id: string;
};

export type BaseCarouselProps<T extends CarouselItemData> = {
  items: T[];
  renderItem: (
    item: T,
    isHovered: boolean,
    onMouseEnter: () => void,
    onMouseLeave: () => void
  ) => ReactNode;
  itemClassName?: string;
  autoplayDelay?: number;
  showNavigation?: boolean;
  loop?: boolean;
  align?: "start" | "center" | "end";
  className?: string;
  itemsPerView?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
};

export function BaseCarousel<T extends CarouselItemData>({
  items,
  renderItem,
  itemClassName = "pl-2 md:basis-1/3 lg:basis-1/5",
  autoplayDelay = 2000,
  showNavigation = true,
  loop = true,
  align = "start",
  className = "",
  itemsPerView = {
    mobile: 1,
    tablet: 3,
    desktop: 5,
  },
}: BaseCarouselProps<T>) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  if (!items.length) return null;

  const getResponsiveBasis = () => {
    const { mobile = 1, tablet = 3, desktop = 5 } = itemsPerView;
    return `pl-2 basis-1/${mobile} md:basis-1/${tablet} lg:basis-1/${desktop}`;
  };

  return (
    <div className={`relative -mx-4 px-4 group ${className}`}>
      <CarouselComponent
        opts={{ align, loop }}
        setApi={setApi}
        className="w-full"
        plugins={[
          Autoplay({
            delay: autoplayDelay,
          }),
        ]}
      >
        <CarouselContent className="-ml-2">
          {items.map(item => (
            <CarouselItem key={item.id} className={itemClassName || getResponsiveBasis()}>
              {renderItem(
                item,
                hoveredId === item.id,
                () => setHoveredId(item.id),
                () => setHoveredId(null)
              )}
            </CarouselItem>
          ))}
        </CarouselContent>

        {showNavigation && (
          <div className="absolute inset-0 flex items-center justify-between pointer-events-none">
            <CarouselPrevious className="hidden group-hover:flex absolute left-4 top-1/2 -translate-y-1/2 z-30 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white hover:text-gray-900 dark:hover:text-white w-14 h-14 rounded-full items-center justify-center shadow-2xl hover:shadow-3xl scale-110 backdrop-blur-sm pointer-events-auto" />
            <CarouselNext className="hidden group-hover:flex absolute right-4 top-1/2 -translate-y-1/2 z-30 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white hover:text-gray-900 dark:hover:text-white w-14 h-14 rounded-full items-center justify-center shadow-2xl hover:shadow-3xl scale-110 backdrop-blur-sm pointer-events-auto" />
          </div>
        )}
      </CarouselComponent>
    </div>
  );
}
