import { CarouselApi } from "@/shared/components/ui/carousel";
import React from "react";

type BannerPaginationProps = {
  count: number;
  current: number;
  api: CarouselApi;
};

export default function BannerPagination({ count, current, api }: BannerPaginationProps) {
  return (
    <div className="flex justify-between md:justify-center items-center gap-2 mt-4 w-full">
      {Array.from({ length: count }).map((_, index) => (
        <button
          key={index}
          onClick={() => api?.scrollTo(index)}
          className={`h-2 rounded-full transition-all duration-300 ${
            current === index + 1
              ? "bg-black dark:bg-white w-8"
              : "bg-black/40 dark:bg-white/40 w-2 hover:bg-black/60 dark:hover:bg-white/60"
          } flex-1 xl:flex-none`}
        />
      ))}
    </div>
  );
}
