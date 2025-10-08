import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/shared/components/ui/sheet";
import { Button } from "@/shared/components/ui/button";
import { ScrollArea } from "@/shared/components/ui/scroll-area";
import { X, ShoppingCart, Loader2 } from "lucide-react";
import { Nft } from "@/modules/marketplace/types";

interface CartModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: Nft[];
  onRemoveItem: (id: string) => void;
  onBuy: () => void;
  type: "seller" | "buyer";
  listingStep: number;
  onClearAllItems: () => void;
}

export default function CartModal({
  open,
  onOpenChange,
  items,
  onRemoveItem,
  onBuy,
  type,
  listingStep,
  onClearAllItems,
}: CartModalProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const totalPrice = items.reduce((sum, item) => {
    const price = parseFloat(item.listPrice || item.mintPrice || "0");
    return sum + price;
  }, 0);

  const isProcessing = listingStep > 0;

  // Shared cart items content
  const cartItems = (
    <ScrollArea className={isMobile ? "flex-1" : "max-h-[400px] pr-4"}>
      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-3 p-3 rounded-lg border bg-card"
          >
            {/* Image */}
            <div className="relative h-16 w-16 rounded overflow-hidden flex-shrink-0">
              {item.image && (
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <h4 className="font-medium truncate">{item.name}</h4>
              <p className="text-sm text-muted-foreground">#{item.tokenId}</p>
              <p className="text-sm font-semibold">
                {item.listPrice || item.mintPrice || "0"} ETH
              </p>
            </div>

            {/* Remove Button */}
            {!isProcessing && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onRemoveItem(item.id)}
                className="flex-shrink-0"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
      </div>
    </ScrollArea>
  );

  // Processing steps
  const processingSteps = isProcessing && (
    <div className="space-y-2 py-4">
      <div className="flex items-center gap-2">
        <Loader2 className="h-4 w-4 animate-spin" />
        <span className="text-sm">
          {listingStep === 1 && "Preparing items..."}
          {listingStep === 2 && "Creating listings..."}
          {listingStep === 3 && "Finalizing..."}
        </span>
      </div>
      <div className="w-full bg-secondary rounded-full h-2">
        <div
          className="bg-primary h-2 rounded-full transition-all duration-500"
          style={{ width: `${(listingStep / 3) * 100}%` }}
        />
      </div>
    </div>
  );

  // Summary
  const summary = !isProcessing && items.length > 0 && (
    <div className="border-t pt-4">
      <div className="flex justify-between text-sm mb-2">
        <span>Subtotal ({items.length} items)</span>
        <span>{totalPrice.toFixed(4)} ETH</span>
      </div>
      <div className="flex justify-between font-semibold">
        <span>Total</span>
        <span>{totalPrice.toFixed(4)} ETH</span>
      </div>
    </div>
  );

  // Footer buttons
  const footerButtons = !isProcessing && (
    <>
      {items.length > 0 && (
        <Button variant="outline" onClick={onClearAllItems}>
          Clear All
        </Button>
      )}
      <Button variant="outline" onClick={() => onOpenChange(false)}>
        Close
      </Button>
      <Button onClick={onBuy} disabled={items.length === 0}>
        {type === "seller" ? "List All" : "Purchase"}
      </Button>
    </>
  );

  // Mobile Sheet - Fullscreen
  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent
          side="bottom"
          className="h-full w-full p-0"
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            top: 0,
            maxHeight: "100vh",
          }}
        >
          <div className="h-full flex flex-col">
            <SheetHeader className="p-4 border-b">
              <SheetTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                {type === "seller" ? "List Items" : "Shopping Cart"}
              </SheetTitle>
              <SheetDescription>
                {type === "seller"
                  ? `You have ${items.length} item(s) ready to list`
                  : `You have ${items.length} item(s) in your cart`}
              </SheetDescription>
            </SheetHeader>

            <div className="flex-1 overflow-y-auto p-4">
              {cartItems}
              {processingSteps}
              {summary}
            </div>

            <SheetFooter className="p-4 border-t gap-2">
              {footerButtons}
            </SheetFooter>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  // Desktop Dialog
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            {type === "seller" ? "List Items" : "Shopping Cart"}
          </DialogTitle>
          <DialogDescription>
            {type === "seller"
              ? `You have ${items.length} item(s) ready to list`
              : `You have ${items.length} item(s) in your cart`}
          </DialogDescription>
        </DialogHeader>

        {cartItems}
        {processingSteps}
        {summary}

        <DialogFooter>{footerButtons}</DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
