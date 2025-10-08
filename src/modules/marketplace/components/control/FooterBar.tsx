import React, { useEffect, useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Slider } from "@/shared/components/ui/slider";
import { ShoppingCart, BarChart3, CreditCard, TrendingUp } from "lucide-react";

interface FooterBarProps {
  itemCount: string;
  sliderValue: number;
  maxItems: number;
  handleItemCountChange: (value: string) => void;
  handleSliderChange: (value: number) => void;
  handleSliderDragStart: () => void;
  handleSliderDragEnd: () => void;
  openCart: () => void;
}

export default function FooterBar({
  itemCount,
  sliderValue,
  maxItems,
  handleItemCountChange,
  handleSliderChange,
  handleSliderDragStart,
  handleSliderDragEnd,
  openCart,
}: FooterBarProps) {
  const hasItems = parseInt(itemCount) > 0;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Mobile Footer - Icon Menu
  if (isMobile) {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t z-50">
        <div className="grid grid-cols-4 divide-x">
          {/* Analytics Button */}
          <button
            className="flex flex-col items-center justify-center py-3 px-2 hover:bg-accent transition-colors"
            onClick={() => console.log("Analytics clicked")}
          >
            <TrendingUp className="h-5 w-5 mb-1" />
            <span className="text-xs">Analytics</span>
          </button>

          {/* Chart Button */}
          <button
            className="flex flex-col items-center justify-center py-3 px-2 hover:bg-accent transition-colors"
            onClick={() => console.log("Chart clicked")}
          >
            <BarChart3 className="h-5 w-5 mb-1" />
            <span className="text-xs">Chart</span>
          </button>

          {/* Card/Payment Button */}
          <button
            className="flex flex-col items-center justify-center py-3 px-2 hover:bg-accent transition-colors"
            onClick={() => console.log("Card clicked")}
          >
            <CreditCard className="h-5 w-5 mb-1" />
            <span className="text-xs">Card</span>
          </button>

          {/* Cart Button */}
          <button
            className="flex flex-col items-center justify-center py-3 px-2 hover:bg-accent transition-colors relative"
            onClick={openCart}
          >
            <div className="relative">
              <ShoppingCart className="h-5 w-5 mb-1" />
              {hasItems && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] rounded-full h-4 w-4 flex items-center justify-center font-medium">
                  {itemCount}
                </span>
              )}
            </div>
            <span className="text-xs">Cart</span>
          </button>
        </div>
      </div>
    );
  }

  // Desktop Footer - Original Design
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4 z-50">
      <div className="container mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1">
          <span className="text-sm font-medium whitespace-nowrap">
            Select Items:
          </span>

          {/* Slider */}
          <div className="flex-1 max-w-md">
            <Slider
              value={[sliderValue]}
              onValueChange={([value]) => handleSliderChange(value)}
              onPointerDown={handleSliderDragStart}
              onPointerUp={handleSliderDragEnd}
              max={maxItems}
              step={1}
              className="w-full"
            />
          </div>

          {/* Item Count Input */}
          <div className="flex items-center gap-2">
            <Input
              type="number"
              value={itemCount}
              onChange={(e) => handleItemCountChange(e.target.value)}
              className="w-20 text-center"
              min={0}
              max={maxItems}
            />
            <span className="text-sm text-muted-foreground">/ {maxItems}</span>
          </div>
        </div>

        {/* Cart Button */}
        <Button
          onClick={openCart}
          disabled={!hasItems}
          className="min-w-[120px]"
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Cart ({itemCount})
        </Button>
      </div>
    </div>
  );
}
