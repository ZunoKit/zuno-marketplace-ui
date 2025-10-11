"use client";

import { Badge } from "@/shared/components/ui/badge";

interface NFTAttributesProps {
  attributes: Array<{
    trait_type: string;
    value: string | number;
    display_type?: string;
  }>;
}

export function NFTAttributes({ attributes }: NFTAttributesProps) {
  if (attributes.length === 0) {
    return <p className="text-muted-foreground text-sm">No attributes</p>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {attributes.map((attr, index) => (
        <div key={index} className="bg-muted/50 rounded-lg p-3 border border-border/50">
          <p className="text-xs text-muted-foreground uppercase mb-1">{attr.trait_type}</p>
          <p className="font-semibold text-sm">
            {attr.display_type === "number" ? attr.value : String(attr.value)}
          </p>
          {attr.display_type === "number" && (
            <Badge variant="outline" className="mt-1 text-xs">
              Numeric
            </Badge>
          )}
        </div>
      ))}
    </div>
  );
}
