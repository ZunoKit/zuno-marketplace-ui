"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardFooter } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";
import { Clock, Users, Gavel } from "lucide-react";
import Image from "next/image";
import { type Auction } from "@/shared/types/auction";
import { cn } from "@/shared/utils";

interface AuctionCardProps {
  auction: Auction;
  onBidClick?: (auction: Auction) => void;
  className?: string;
}

export function AuctionCard({
  auction,
  onBidClick,
  className,
}: AuctionCardProps) {
  const [timeLeft, setTimeLeft] = useState<string>("");

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const target =
        auction.status === "upcoming" ? auction.startTime : auction.endTime;
      const diff = target.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft(auction.status === "upcoming" ? "Starting soon" : "Ended");
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

      if (days > 0) {
        setTimeLeft(`${days}d ${hours}h`);
      } else if (hours > 0) {
        setTimeLeft(`${hours}h ${minutes}m`);
      } else {
        setTimeLeft(`${minutes}m`);
      }
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 60000);

    return () => clearInterval(interval);
  }, [auction]);

  const getStatusColor = () => {
    switch (auction.status) {
      case "active":
        return "bg-green-500";
      case "upcoming":
        return "bg-blue-500";
      case "ended":
        return "bg-gray-500";
      default:
        return "bg-gray-400";
    }
  };

  const handleCardClick = () => {
    window.location.href = `/auctions/${auction.id}`;
  };

  const handleBidClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onBidClick) {
      onBidClick(auction);
    }
  };

  return (
    <Card
      className={cn(
        "group cursor-pointer overflow-hidden transition-all duration-200 hover:shadow-lg dark:hover:shadow-white/10",
        className
      )}
      onClick={handleCardClick}
    >
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={auction.image}
          alt={auction.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />

        <div className="absolute top-2 left-2 right-2 flex items-center justify-between">
          <Badge
            variant="secondary"
            className="bg-background/80 backdrop-blur-sm"
          >
            <span
              className={cn("w-2 h-2 rounded-full mr-2", getStatusColor())}
            />
            {auction.status}
          </Badge>

          {auction.status === "active" && (
            <Badge
              variant="secondary"
              className="bg-background/80 backdrop-blur-sm"
            >
              <Clock className="h-3 w-3 mr-1" />
              {timeLeft}
            </Badge>
          )}
        </div>
      </div>

      <CardContent className="p-4">
        <h3 className="font-semibold text-lg truncate">{auction.name}</h3>

        <div className="flex items-center gap-2 mt-2">
          <Avatar className="h-6 w-6">
            <AvatarImage
              src={auction.seller.avatar}
              alt={auction.seller.name}
            />
            <AvatarFallback>{auction.seller.name?.[0] || "?"}</AvatarFallback>
          </Avatar>
          <span className="text-sm text-muted-foreground truncate">
            {auction.seller.name || auction.seller.address.slice(0, 8)}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <p className="text-xs text-muted-foreground">
              {auction.bids.length > 0 ? "Current Bid" : "Starting Price"}
            </p>
            <p className="font-semibold">
              {auction.currentBid} {auction.currency}
            </p>
          </div>

          <div>
            <p className="text-xs text-muted-foreground">Bids</p>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span className="font-semibold">{auction.bids.length}</span>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        {auction.status === "active" ? (
          <Button className="w-full" onClick={handleBidClick}>
            <Gavel className="h-4 w-4 mr-2" />
            Place Bid
          </Button>
        ) : auction.status === "upcoming" ? (
          <Button className="w-full" variant="secondary" disabled>
            Starting Soon
          </Button>
        ) : (
          <Button className="w-full" variant="outline" disabled>
            Auction Ended
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
