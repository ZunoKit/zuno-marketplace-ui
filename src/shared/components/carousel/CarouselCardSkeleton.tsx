import { Card, CardContent } from "@/shared/components/ui/card";

export function CarouselItemSkeleton() {
  return (
    <div className="relative group h-full">
      <Card className="overflow-hidden border border-gray-200 dark:border-white/10 bg-white dark:bg-[#1A1F2C] text-gray-900 dark:text-white text-sm h-full p-0">
        <div className="flex flex-col h-full">
          {/* Image skeleton */}
          <div className="relative aspect-square w-full overflow-hidden bg-gray-200 dark:bg-gray-800 animate-pulse"></div>

          <CardContent className="p-3 flex flex-col h-[120px] justify-between">
            {/* Title skeleton */}
            <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2 animate-pulse"></div>

            {/* Stats grid skeleton */}
            <div className="grid grid-cols-3 gap-1 mb-auto">
              {[0, 1, 2].map((index) => (
                <div key={index}>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-12 mb-1 animate-pulse"></div>
                  <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-10 animate-pulse"></div>
                </div>
              ))}
            </div>

            {/* Status skeleton */}
            <div className="flex items-center gap-1.5 mt-2 pt-1.5 border-t border-gray-100 dark:border-white/5">
              <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600 animate-pulse"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 animate-pulse"></div>
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}
