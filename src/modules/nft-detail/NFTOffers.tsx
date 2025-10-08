"use client";

import { Card } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";
import { Badge } from "@/shared/components/ui/badge";
import { Clock } from "lucide-react";
import { type NFTOffer } from "@/shared/types/nft-detail";
import { formatDistanceToNow } from "date-fns";

interface NFTOffersProps {
  offers: NFTOffer[];
  currentPrice: string;
  isOwner?: boolean;
}

export function NFTOffers({
  offers,
  currentPrice,
  isOwner = false,
}: NFTOffersProps) {
  const handleAcceptOffer = (offerId: string) => {
    console.log("Accept offer:", offerId);
  };

  const handleRejectOffer = (offerId: string) => {
    console.log("Reject offer:", offerId);
  };

  const getOfferPercentage = (offerPrice: string) => {
    const offer = parseFloat(offerPrice);
    const current = parseFloat(currentPrice);
    const percentage = ((offer - current) / current) * 100;
    return percentage;
  };

  if (offers.length === 0) {
    return (
      <Card className="p-8 text-center">
        <p className="text-muted-foreground">No offers yet</p>
        <Button className="mt-4" variant="outline">
          Make an Offer
        </Button>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {offers.map((offer) => {
        const percentage = getOfferPercentage(offer.price);
        const isHighOffer = percentage >= 0;

        return (
          <Card key={offer.id} className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={offer.offerer.avatar}
                    alt={offer.offerer.name}
                  />
                  <AvatarFallback>
                    {offer.offerer.name?.[0] || "?"}
                  </AvatarFallback>
                </Avatar>

                <div>
                  <p className="font-medium">
                    {offer.offerer.name || offer.offerer.address.slice(0, 8)}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {offer.expiresAt && (
                      <span>
                        Expires{" "}
                        {formatDistanceToNow(offer.expiresAt, {
                          addSuffix: true,
                        })}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="font-semibold text-lg">
                    {offer.price} {offer.currency}
                  </p>
                  <Badge
                    variant={isHighOffer ? "default" : "secondary"}
                    className="text-xs"
                  >
                    {percentage >= 0 ? "+" : ""}
                    {percentage.toFixed(1)}%{isHighOffer ? " above" : " below"}{" "}
                    listing
                  </Badge>
                </div>

                {isOwner && offer.status === "active" && (
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleAcceptOffer(offer.id)}
                    >
                      Accept
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleRejectOffer(offer.id)}
                    >
                      Reject
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
