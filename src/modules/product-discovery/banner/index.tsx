"use client";

import {
  Carousel,
  CarouselApi,
  CarouselNext,
} from "@/shared/components/ui/carousel";
import {
  CarouselContent,
  CarouselPrevious,
} from "@/shared/components/ui/carousel";
import { CarouselItem } from "@/shared/components/ui/carousel";
import { mockBanner } from "@/shared/utils/mock/mockBanner";
import { useEffect, useState } from "react";
import BannerItem from "@/modules/product-discovery/banner/BannerItem";
import BannerPagination from "@/modules/product-discovery/banner/BannerPagination";
import { Banner } from "@/shared/types/banner";

export function HomeBanner() {
  const [slides, setSlides] = useState<Banner[]>([]);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  // Generate banner data on client side to prevent hydration mismatch
  useEffect(() => {
    setSlides(mockBanner(3));
  }, []);

  useEffect(() => {
    if (!api) {
      return;
    }
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  // Show loading state while slides are being generated
  if (slides.length === 0) {
    return (
      <div className="w-full h-[400px] rounded-xl overflow-hidden mb-5 bg-gray-50 dark:bg-[#1A1F2C] border border-gray-200 dark:border-white/10 animate-pulse" />
    );
  }

  return (
    <div className="w-full">
      <Carousel
        setApi={setApi}
        className="w-full h-[400px] rounded-xl overflow-hidden mb-5 group bg-gray-50 dark:bg-[#1A1F2C] border border-gray-200 dark:border-white/10"
        plugins={
          [
            // Autoplay({
            //   delay: 2000,
            // }),
          ]
        }
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent className="h-[400px]">
          {slides.map((slide, index) => (
            <CarouselItem key={index} className="h-[400px]">
              <BannerItem {...slide} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden group-hover:flex absolute left-4 top-1/2 -translate-y-1/2 z-30 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/50 hover:bg-black/70 border-white/30 hover:border-white/50 text-white hover:text-white w-12 h-12 rounded-full items-center justify-center shadow-lg hover:shadow-xl" />
        <CarouselNext className="hidden group-hover:flex absolute right-4 top-1/2 -translate-y-1/2 z-30 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/50 hover:bg-black/70 border-white/30 hover:border-white/50 text-white hover:text-white w-12 h-12 rounded-full items-center justify-center shadow-lg hover:shadow-xl" />
      </Carousel>

      <BannerPagination count={count} current={current} api={api} />
    </div>
  );
}
