import { Skeleton } from "@/shared/components/ui/skeleton";
import React from "react";

export default function MintNFTSkeleton() {
  return (
    <>
      <div className="flex xl:flex-row items-center justify-center gap-10 xl:gap-50 flex-col mb-20">
        <div className="bg-gradient-to-b from-gray-50 to-white dark:from-[#0c0916] dark:to-[#0f0a19] rounded-lg p-5 relative w-full max-w-full overflow-hidden xl:max-w-3xl border border-gray-200 dark:border-gray-800/50">
          {/* Main image skeleton */}
          <div className="aspect-square relative rounded-md overflow-hidden">
            <Skeleton className="absolute inset-0 w-full h-full" />
          </div>

          {/* Thumbnails skeleton */}
          <div className="flex gap-3 mt-5 overflow-x-auto pb-2">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-48 h-48 relative rounded-md overflow-hidden"
              >
                <Skeleton className="absolute inset-0 w-full h-full" />
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <div className="bg-gradient-to-b from-gray-50 to-white dark:from-[#0c0916] dark:to-[#0f0a19] flex items-center justify-center p-6">
            <div className="w-full space-y-4 max-w-md">
              <div className="bg-white border-gray-200 dark:bg-[#0f0a19] dark:border-gray-800/50 rounded-xl overflow-hidden border shadow-xl">
                {/* Mint Stages Header */}
                <div className="p-5 space-y-4 bg-gray-50 dark:bg-[#0c0916]">
                  <Skeleton className="h-5 w-32" />

                  {/* Mint Stages */}
                  <div className="space-y-4">
                    {[...Array(3)].map((_, index) => (
                      <div
                        key={index}
                        className="rounded-lg py-4 px-5 border border-gray-200/50 dark:border-gray-800/30"
                      >
                        <div className="flex justify-between items-center mb-2">
                          <Skeleton className="h-4 w-32" />
                          <div className="flex items-center">
                            <Skeleton className="h-4 w-16 mr-2" />
                            <div className="flex space-x-1">
                              {[...Array(4)].map((_, i) => (
                                <Skeleton key={i} className="w-10 h-6" />
                              ))}
                            </div>
                          </div>
                        </div>
                        <Skeleton className="h-3 w-40" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mint Panel */}
                <div className="p-5 space-y-5 bg-white dark:bg-[#0f0a19] border-t border-gray-200/70 dark:border-gray-800/30">
                  {/* Progress bar */}
                  <div className="space-y-2 pt-1">
                    <div className="flex items-center">
                      <Skeleton className="h-3 w-16" />
                      <div className="ml-auto">
                        <Skeleton className="h-3 w-32" />
                      </div>
                    </div>
                    <Skeleton className="h-2 w-full rounded-full" />
                  </div>

                  {/* Price section */}
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <Skeleton className="h-3 w-10" />
                      <Skeleton className="h-8 w-24" />
                    </div>
                    <div className="flex justify-between items-center">
                      <Skeleton className="h-3 w-16" />
                      <Skeleton className="h-3 w-10" />
                    </div>
                    <div className="flex items-start space-x-3 mt-2">
                      <Skeleton className="h-5 w-5" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                  </div>

                  {/* Mint button */}
                  <Skeleton className="h-10 w-full rounded-md" />
                </div>
              </div>

              {/* Explore button */}
              <Skeleton className="h-10 w-full rounded-md" />
            </div>
          </div>
          <div className="w-full bg-gray-50 dark:bg-[#0c0916] p-4 rounded-xs">
            <Skeleton className="w-full h-10" />
          </div>
        </div>
      </div>
      <div className="w-full">
        <div className="border-b border-gray-200 dark:border-gray-800/30">
          <div className="bg-transparent h-auto p-0">
            <Skeleton className="h-8 w-24" />
          </div>
        </div>

        <div className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Skeleton className="h-7 w-48" />
              <div className="flex space-x-3">
                <Skeleton className="h-4 w-64" />
              </div>
              <div className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>

            <div className="space-y-4">
              <Skeleton className="h-7 w-24" />
              <div className="space-y-3">
                <div>
                  <Skeleton className="h-4 w-48 mb-1" />
                  <Skeleton className="h-3 w-32" />
                </div>
                <div>
                  <Skeleton className="h-4 w-16 mb-1" />
                  <Skeleton className="h-3 w-64" />
                </div>
                <div>
                  <Skeleton className="h-4 w-16 mb-1" />
                  <Skeleton className="h-3 w-64" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
