import { Button } from "@/shared/components/ui/button";
import { redirect } from "next/navigation";

type CarouselHeaderProps = {
  title: string;
  seeAllUrl: string;
};

export function CarouselHeader({ title, seeAllUrl }: CarouselHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {title}
      </h2>
      <Button
        variant="outline"
        size="sm"
        className="border-gray-200 dark:border-white/10 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-white/5"
        onClick={() => {
          redirect(seeAllUrl);
        }}
      >
        See all
      </Button>
    </div>
  );
}
