import React, { useEffect, useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { Label } from "@/shared/components/ui/label";
import { Slider } from "@/shared/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/shared/components/ui/radio-group";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/shared/components/ui/sheet";
import { X } from "lucide-react";

interface FilterSidebarProps {
  onClose: () => void;
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
  onStatusChange: (status: string) => void;
  onSortChange: (sort: string) => void;
  isOpen?: boolean;
}

export default function FilterSidebar({
  onClose,
  priceRange,
  onPriceRangeChange,
  onStatusChange,
  onSortChange,
  isOpen = true,
}: FilterSidebarProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const filterContent = (
    <>
      <div className="space-y-6">
        {/* Status Filter */}
        <div className="space-y-3">
          <Label>Status</Label>
          <RadioGroup defaultValue="all" onValueChange={onStatusChange}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="all" />
              <Label htmlFor="all" className="font-normal cursor-pointer">
                All Items
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="listed" id="listed" />
              <Label htmlFor="listed" className="font-normal cursor-pointer">
                Listed
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="not-listed" id="not-listed" />
              <Label htmlFor="not-listed" className="font-normal cursor-pointer">
                Not Listed
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Price Range Filter */}
        <div className="space-y-3">
          <Label>Price Range (ETH)</Label>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>{priceRange[0]} ETH</span>
              <span>{priceRange[1]} ETH</span>
            </div>
            <Slider
              value={priceRange}
              onValueChange={value => onPriceRangeChange(value as [number, number])}
              max={1}
              min={0}
              step={0.001}
              className="w-full"
            />
          </div>
        </div>

        {/* Sort Options - Desktop only */}
        {!isMobile && (
          <div className="space-y-3">
            <Label>Sort By</Label>
            <RadioGroup defaultValue="recent" onValueChange={onSortChange}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="recent" id="recent" />
                <Label htmlFor="recent" className="font-normal cursor-pointer">
                  Recently Listed
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="price-low" id="price-low" />
                <Label htmlFor="price-low" className="font-normal cursor-pointer">
                  Price: Low to High
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="price-high" id="price-high" />
                <Label htmlFor="price-high" className="font-normal cursor-pointer">
                  Price: High to Low
                </Label>
              </div>
            </RadioGroup>
          </div>
        )}

        {/* Clear Filters */}
        <Button
          variant="outline"
          className="w-full"
          onClick={() => {
            onPriceRangeChange([0, 1]);
            onStatusChange("all");
            onSortChange("recent");
          }}
        >
          Clear All Filters
        </Button>
      </div>
    </>
  );

  // Mobile - Use Fullscreen Sheet
  if (isMobile) {
    return (
      <Sheet
        open={isOpen}
        onOpenChange={open => {
          if (!open) onClose();
        }}
      >
        <SheetContent
          side="left"
          className="w-full sm:max-w-full p-0 h-full"
          style={{ position: "fixed" }}
        >
          <div className="h-full flex flex-col">
            <SheetHeader className="p-4 border-b">
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <div className="flex-1 overflow-y-auto p-4">{filterContent}</div>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  // Desktop - Regular sidebar
  return (
    <div className="h-full border-r p-4 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Filters</h3>
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      {filterContent}
    </div>
  );
}
