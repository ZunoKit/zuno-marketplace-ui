import { Banner } from "@/shared/types/banner";
import Image from "next/image";
import React from "react";

export default function BannerItem(banner: Banner) {
  const isVideo =
    banner.mainBackground?.endsWith(".mp4") ||
    banner.mainBackground?.endsWith(".webm") ||
    banner.mainBackground?.endsWith(".mov");

  return (
    <div className="relative w-full h-full">
      <div className="absolute inset-0 z-0 overflow-hidden">
        {isVideo ? (
          <video
            src={banner.mainBackground}
            autoPlay
            muted
            loop
            playsInline
            className="object-cover w-full h-full"
          />
        ) : (
          <Image
            src={banner.mainBackground}
            alt={banner.name}
            fill
            className="object-cover"
          />
        )}
      </div>

      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/50 to-transparent"></div>

      <div className="relative z-20 flex flex-col justify-end h-full p-8 md:p-12 gap-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-3">
            <h1 className="text-7xl font-bold text-white dark:text-white">
              {banner.name}
            </h1>

            <span className="text-2xl text-white/80 dark:text-white/80">
              By {banner.author}
            </span>

            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/10 dark:border-white/10 w-fit">
              <div className="flex items-center gap-8">
                <div className="text-center">
                  <p className="text-xs text-white/70 dark:text-gray-300 uppercase tracking-wider mb-2 font-medium">
                    Floor Price
                  </p>
                  <p className="text-xl font-bold text-white dark:text-white">
                    3.8%
                  </p>
                </div>

                <div className="w-px h-12 bg-white/20 dark:bg-white/20"></div>

                <div className="text-center">
                  <p className="text-xs text-white/70 dark:text-gray-300 uppercase tracking-wider mb-2 font-medium">
                    Listed
                  </p>
                  <p className="text-xl font-bold text-white dark:text-white">
                    {banner.totalItems}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="items-center gap-2 mt-auto hidden xl:flex">
            {banner.thumbnailImages.map((image, index) => (
              <Image
                key={index}
                src={image}
                alt={banner.name}
                width={100}
                height={150}
                className="rounded-lg"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
