"use client";

import { useState, useEffect } from "react";
import { Clock, Gavel, Eye, AlertCircle } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar";
import { Progress } from "@/shared/components/ui/progress";
import Image from "next/image";
import Link from "next/link";

interface Auction {
  id: string;
  name: string;
  image: string;
  collection: string;
  currentBid: string;
  startingPrice: string;
  currency: string;
  endTime: Date;
  totalBids: number;
  viewers: number;
  seller: {
    name: string;
    avatar: string;
    verified: boolean;
  };
  topBidder: {
    name: string;
    avatar: string;
  };
  reservePrice?: string;
  reserveMet: boolean;
}

const mockAuctions: Auction[] = [
  {
    id: "1",
    name: "Genesis Crystal #001",
    image: "https://picsum.photos/600/600?random=101",
    collection: "Genesis Crystals",
    currentBid: "12.5",
    startingPrice: "5.0",
    currency: "ETH",
    endTime: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours
    totalBids: 45,
    viewers: 234,
    seller: {
      name: "CrystalCreator",
      avatar: "https://picsum.photos/100/100?random=111",
      verified: true,
    },
    topBidder: {
      name: "WhaleCollector",
      avatar: "https://picsum.photos/100/100?random=112",
    },
    reservePrice: "15.0",
    reserveMet: false,
  },
  {
    id: "2",
    name: "Cyber Samurai #777",
    image: "https://picsum.photos/600/600?random=102",
    collection: "Cyber Warriors",
    currentBid: "8.2",
    startingPrice: "2.0",
    currency: "ETH",
    endTime: new Date(Date.now() + 45 * 60 * 1000), // 45 minutes
    totalBids: 89,
    viewers: 567,
    seller: {
      name: "SamuraiArt",
      avatar: "https://picsum.photos/100/100?random=113",
      verified: true,
    },
    topBidder: {
      name: "NFTNinja",
      avatar: "https://picsum.photos/100/100?random=114",
    },
    reserveMet: true,
  },
  {
    id: "3",
    name: "Ethereal Dreams #42",
    image: "https://picsum.photos/600/600?random=103",
    collection: "Ethereal Collection",
    currentBid: "25.7",
    startingPrice: "10.0",
    currency: "ETH",
    endTime: new Date(Date.now() + 6 * 60 * 60 * 1000), // 6 hours
    totalBids: 123,
    viewers: 892,
    seller: {
      name: "DreamWeaver",
      avatar: "https://picsum.photos/100/100?random=115",
      verified: false,
    },
    topBidder: {
      name: "ArtLover",
      avatar: "https://picsum.photos/100/100?random=116",
    },
    reservePrice: "30.0",
    reserveMet: false,
  },
  {
    id: "4",
    name: "Neon City #1984",
    image: "https://picsum.photos/600/600?random=104",
    collection: "Neon Dreams",
    currentBid: "4.3",
    startingPrice: "1.0",
    currency: "ETH",
    endTime: new Date(Date.now() + 30 * 60 * 1000), // 30 minutes
    totalBids: 67,
    viewers: 445,
    seller: {
      name: "NeonArtist",
      avatar: "https://picsum.photos/100/100?random=117",
      verified: true,
    },
    topBidder: {
      name: "CyberCollector",
      avatar: "https://picsum.photos/100/100?random=118",
    },
    reserveMet: true,
  },
];

function TimeRemaining({ endTime }: { endTime: Date }) {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const end = endTime.getTime();
      const distance = end - now;

      if (distance < 0) {
        setTimeLeft("Ended");
        clearInterval(timer);
      } else {
        const hours = Math.floor(distance / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  const getUrgency = () => {
    const now = new Date().getTime();
    const end = endTime.getTime();
    const distance = end - now;
    const oneHour = 60 * 60 * 1000;

    if (distance < oneHour) return "urgent";
    if (distance < oneHour * 3) return "warning";
    return "normal";
  };

  const urgency = getUrgency();

  return (
    <Badge
      variant={
        urgency === "urgent" ? "destructive" : urgency === "warning" ? "secondary" : "outline"
      }
      className="flex items-center gap-1"
    >
      <Clock className="h-3 w-3" />
      {timeLeft}
    </Badge>
  );
}

export default function LiveAuctions() {
  return (
    <section className="w-full py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2 flex items-center gap-2">
              <Gavel className="h-8 w-8" />
              Live Auctions
            </h2>
            <p className="text-muted-foreground">Bid on exclusive NFTs in real-time auctions</p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/auctions">View All Auctions</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockAuctions.map(auction => (
            <Card
              key={auction.id}
              className="group hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <CardHeader className="p-0">
                <div className="relative aspect-square">
                  <Image src={auction.image} alt={auction.name} fill className="object-cover" />
                  <div className="absolute top-2 left-2">
                    <TimeRemaining endTime={auction.endTime} />
                  </div>
                  <div className="absolute top-2 right-2 flex gap-2">
                    <Badge variant="secondary" className="bg-black/70 text-white">
                      <Eye className="h-3 w-3 mr-1" />
                      {auction.viewers}
                    </Badge>
                  </div>

                  {/* Live indicator */}
                  <div className="absolute bottom-2 left-2">
                    <Badge className="bg-red-500 text-white animate-pulse">
                      <span className="relative flex h-2 w-2 mr-1">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                      </span>
                      LIVE
                    </Badge>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-4">
                <div className="mb-3">
                  <p className="text-xs text-muted-foreground">{auction.collection}</p>
                  <h3 className="font-semibold truncate">{auction.name}</h3>
                </div>

                {/* Seller info */}
                <div className="flex items-center gap-2 mb-4">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={auction.seller.avatar} />
                    <AvatarFallback>{auction.seller.name[0]}</AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-muted-foreground">by @{auction.seller.name}</span>
                  {auction.seller.verified && (
                    <Badge variant="secondary" className="text-xs px-1">
                      Verified
                    </Badge>
                  )}
                </div>

                {/* Bid info */}
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-xs text-muted-foreground">Current Bid</p>
                      <p className="font-bold text-lg">
                        {auction.currentBid} {auction.currency}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">{auction.totalBids} bids</p>
                      <div className="flex items-center gap-1">
                        <Avatar className="h-5 w-5">
                          <AvatarImage src={auction.topBidder.avatar} />
                          <AvatarFallback>{auction.topBidder.name[0]}</AvatarFallback>
                        </Avatar>
                        <span className="text-xs">@{auction.topBidder.name}</span>
                      </div>
                    </div>
                  </div>

                  {/* Reserve price indicator */}
                  {auction.reservePrice && (
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Reserve Price</span>
                        <span className={auction.reserveMet ? "text-green-500" : "text-yellow-500"}>
                          {auction.reserveMet
                            ? "Met"
                            : `${auction.reservePrice} ${auction.currency}`}
                        </span>
                      </div>
                      <Progress
                        value={
                          (parseFloat(auction.currentBid) / parseFloat(auction.reservePrice)) * 100
                        }
                        className="h-1"
                      />
                    </div>
                  )}

                  {/* Bid increase from starting */}
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <AlertCircle className="h-3 w-3" />
                    <span>
                      {(
                        (parseFloat(auction.currentBid) / parseFloat(auction.startingPrice) - 1) *
                        100
                      ).toFixed(0)}
                      % above starting price
                    </span>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="pt-0 pb-4">
                <Button className="w-full" size="sm">
                  Place Bid
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
