"use client";

import { useState } from "react";
import { Card } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Label } from "@/shared/components/ui/label";
import { Slider } from "@/shared/components/ui/slider";
import { Checkbox } from "@/shared/components/ui/checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/components/ui/accordion";
import { type MarketplaceFilter } from "@/shared/types/marketplace";

interface FilterSidebarProps {
  filters: MarketplaceFilter;
  onFiltersChange: (filters: MarketplaceFilter) => void;
  onReset?: () => void;
}

export function FilterSidebar({
  filters,
  onFiltersChange,
  onReset,
}: FilterSidebarProps) {
  const [localFilters, setLocalFilters] = useState<MarketplaceFilter>(filters);

  const handlePriceRangeChange = (value: number[]) => {
    const newFilters = {
      ...localFilters,
      priceRange: [value[0], value[1]] as [number, number],
    };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleStatusChange = (status: string, checked: boolean) => {
    const newFilters = {
      ...localFilters,
      status: checked ? status : undefined,
    };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleReset = () => {
    const resetFilters: MarketplaceFilter = {
      priceRange: [0, 10],
      status: undefined,
      sortBy: "recent",
    };
    setLocalFilters(resetFilters);
    onFiltersChange(resetFilters);
    if (onReset) onReset();
  };

  const statusOptions = [
    { value: "available", label: "Available" },
    { value: "sold", label: "Sold" },
    { value: "reserved", label: "Reserved" },
  ];

  const attributeOptions = {
    Background: ["Blue", "Red", "Green", "Purple"],
    Rarity: ["Common", "Uncommon", "Rare", "Legendary"],
  };

  return (
    <Card className="p-4 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg">Filters</h3>
        <Button variant="ghost" size="sm" onClick={handleReset}>
          Reset
        </Button>
      </div>

      <Accordion
        type="multiple"
        defaultValue={["status", "price", "attributes"]}
      >
        <AccordionItem value="status">
          <AccordionTrigger>Status</AccordionTrigger>
          <AccordionContent className="space-y-2">
            {statusOptions.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <Checkbox
                  id={option.value}
                  checked={localFilters.status === option.value}
                  onCheckedChange={(checked) =>
                    handleStatusChange(option.value, checked as boolean)
                  }
                />
                <Label
                  htmlFor={option.value}
                  className="text-sm cursor-pointer"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price">
          <AccordionTrigger>Price Range</AccordionTrigger>
          <AccordionContent className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span>{localFilters.priceRange?.[0] || 0} ETH</span>
              <span>{localFilters.priceRange?.[1] || 10} ETH</span>
            </div>
            <Slider
              min={0}
              max={10}
              step={0.1}
              value={localFilters.priceRange || [0, 10]}
              onValueChange={handlePriceRangeChange}
              className="w-full"
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="attributes">
          <AccordionTrigger>Attributes</AccordionTrigger>
          <AccordionContent className="space-y-4">
            {Object.entries(attributeOptions).map(([trait, values]) => (
              <div key={trait} className="space-y-2">
                <Label className="text-sm font-medium">{trait}</Label>
                {values.map((value) => (
                  <div key={value} className="flex items-center space-x-2">
                    <Checkbox
                      id={`${trait}-${value}`}
                      onCheckedChange={(checked) => {
                        const newAttributes =
                          { ...localFilters.attributes } || {};
                        if (checked) {
                          if (!newAttributes[trait]) {
                            newAttributes[trait] = [];
                          }
                          newAttributes[trait].push(value);
                        } else {
                          if (newAttributes[trait]) {
                            newAttributes[trait] = newAttributes[trait].filter(
                              (v) => v !== value
                            );
                            if (newAttributes[trait].length === 0) {
                              delete newAttributes[trait];
                            }
                          }
                        }
                        const newFilters = {
                          ...localFilters,
                          attributes:
                            Object.keys(newAttributes).length > 0
                              ? newAttributes
                              : undefined,
                        };
                        setLocalFilters(newFilters);
                        onFiltersChange(newFilters);
                      }}
                    />
                    <Label
                      htmlFor={`${trait}-${value}`}
                      className="text-sm cursor-pointer"
                    >
                      {value}
                    </Label>
                  </div>
                ))}
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
}
