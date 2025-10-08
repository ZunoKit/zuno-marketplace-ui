import React, { useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Badge } from "@/shared/components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/ui/tabs";
import { ShoppingCart, Tag } from "lucide-react";
import { Nft, NftStatus } from "@/modules/marketplace/types/types";

interface BuyerModalProps {
  nft: Nft;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BuyerModal({ nft, open, onOpenChange }: BuyerModalProps) {
  const [offerAmount, setOfferAmount] = useState("");

  const handleBuyNow = () => {
    console.log("Buying NFT:", nft.id, "at price:", nft.listPrice);
    // Mock buy logic
    onOpenChange(false);
  };

  const handleMakeOffer = () => {
    console.log("Making offer on NFT:", nft.id, "amount:", offerAmount);
    // Mock offer logic
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Purchase NFT</DialogTitle>
          <DialogDescription>
            Review details and complete your purchase
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4">
          {/* NFT Preview */}
          <div className="flex gap-4">
            <div className="relative h-24 w-24 rounded-lg overflow-hidden">
              {nft.image && (
                <Image
                  src={nft.image}
                  alt={nft.name}
                  fill
                  className="object-cover"
                />
              )}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{nft.name}</h3>
              <p className="text-sm text-muted-foreground">#{nft.tokenId}</p>
              {nft.status === NftStatus.Listed && (
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="default">For Sale</Badge>
                  <span className="font-bold text-lg">{nft.listPrice} ETH</span>
                </div>
              )}
            </div>
          </div>

          <Tabs defaultValue="buy" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger
                value="buy"
                disabled={nft.status !== NftStatus.Listed}
              >
                Buy Now
              </TabsTrigger>
              <TabsTrigger value="offer">Make Offer</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
            </TabsList>

            <TabsContent value="buy" className="space-y-4">
              {nft.status === NftStatus.Listed ? (
                <>
                  <div className="rounded-lg bg-muted p-4">
                    <h4 className="font-medium mb-3">Purchase Summary</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>List Price:</span>
                        <span className="font-medium">{nft.listPrice} ETH</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Platform Fee (2.5%):</span>
                        <span className="font-medium">
                          {(parseFloat(nft.listPrice || "0") * 0.025).toFixed(
                            4
                          )}{" "}
                          ETH
                        </span>
                      </div>
                      <div className="flex justify-between font-semibold text-base pt-2 border-t">
                        <span>Total:</span>
                        <span>
                          {(parseFloat(nft.listPrice || "0") * 1.025).toFixed(
                            4
                          )}{" "}
                          ETH
                        </span>
                      </div>
                    </div>
                  </div>

                  <Button onClick={handleBuyNow} className="w-full" size="lg">
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Buy Now
                  </Button>
                </>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  This NFT is not currently listed for sale
                </div>
              )}
            </TabsContent>

            <TabsContent value="offer" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="offer">Offer Amount (ETH)</Label>
                <Input
                  id="offer"
                  type="number"
                  step="0.001"
                  value={offerAmount}
                  onChange={(e) => setOfferAmount(e.target.value)}
                  placeholder="0.05"
                />
                <p className="text-xs text-muted-foreground">
                  Floor price: {nft.mintPrice} ETH
                </p>
              </div>

              <div className="rounded-lg bg-muted p-4">
                <h4 className="font-medium mb-2">Offer Details</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Your Offer:</span>
                    <span className="font-medium">
                      {offerAmount || "0"} ETH
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Expiry:</span>
                    <span className="font-medium">7 days</span>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleMakeOffer}
                disabled={!offerAmount || parseFloat(offerAmount) <= 0}
                className="w-full"
                size="lg"
              >
                <Tag className="mr-2 h-4 w-4" />
                Make Offer
              </Button>
            </TabsContent>

            <TabsContent value="details" className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Contract</span>
                  <span className="font-mono text-xs">
                    {nft.contractAddress.slice(0, 6)}...
                    {nft.contractAddress.slice(-4)}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Token ID</span>
                  <span className="font-medium">#{nft.tokenId}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Owner</span>
                  <span className="font-mono text-xs">
                    {nft.owner?.slice(0, 6)}...{nft.owner?.slice(-4)}
                  </span>
                </div>
                {nft.attributes?.map((attr, index) => (
                  <div
                    key={index}
                    className="flex justify-between py-2 border-b"
                  >
                    <span className="text-muted-foreground">
                      {attr.trait_type}
                    </span>
                    <span className="font-medium">{attr.value}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
