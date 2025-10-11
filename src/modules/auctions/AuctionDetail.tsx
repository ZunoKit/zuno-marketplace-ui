"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { Input } from "@/shared/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { Clock, Gavel, Users, TrendingUp, AlertCircle, Trophy } from "lucide-react";
import { type Auction } from "@/shared/types/auction";
import { formatDistanceToNow } from "date-fns";

interface AuctionDetailProps {
  auction: Auction;
}

export function AuctionDetail({ auction }: AuctionDetailProps) {
  const [bidAmount, setBidAmount] = useState("");
  const [timeLeft, setTimeLeft] = useState<string>("");

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const target = auction.status === "upcoming" ? auction.startTime : auction.endTime;
      const diff = target.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft(auction.status === "upcoming" ? "Starting soon" : "Ended");
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      if (days > 0) {
        setTimeLeft(`${days}d ${hours}h ${minutes}m`);
      } else if (hours > 0) {
        setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
      } else {
        setTimeLeft(`${minutes}m ${seconds}s`);
      }
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [auction]);

  const handlePlaceBid = () => {
    console.log("Place bid:", bidAmount);
  };

  const minBidAmount = parseFloat(auction.currentBid) * 1.05; // 5% minimum increment
  const leadingBidder = auction.bids[0]?.bidder;
  const isReserveMet = auction.reservePrice
    ? parseFloat(auction.currentBid) >= parseFloat(auction.reservePrice)
    : true;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - NFT Image and Info */}
        <div className="space-y-4">
          <Card className="overflow-hidden">
            <div className="relative aspect-square">
              <Image src={auction.image} alt={auction.name} fill className="object-cover" />
              {auction.status === "active" && (
                <div className="absolute top-4 right-4">
                  <Badge className="bg-red-500 text-white animate-pulse">
                    <Clock className="h-3 w-3 mr-1" />
                    LIVE
                  </Badge>
                </div>
              )}
            </div>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Description</h3>
              <p className="text-muted-foreground">{auction.description}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Seller</h3>
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={auction.seller.avatar} />
                  <AvatarFallback>{auction.seller.name?.[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">
                    {auction.seller.name || auction.seller.address.slice(0, 8)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {auction.seller.address.slice(0, 6)}...
                    {auction.seller.address.slice(-4)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Auction Details */}
        <div className="space-y-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">{auction.name}</h1>
            <div className="flex items-center gap-2">
              <Badge variant={auction.status === "active" ? "default" : "secondary"}>
                {auction.status}
              </Badge>
              {!isReserveMet && (
                <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  Reserve not met
                </Badge>
              )}
            </div>
          </div>

          {/* Auction Stats */}
          <div className="grid grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <Clock className="h-4 w-4" />
                  <span className="text-xs">Time Left</span>
                </div>
                <p className="text-xl font-bold">{timeLeft}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <Users className="h-4 w-4" />
                  <span className="text-xs">Bidders</span>
                </div>
                <p className="text-xl font-bold">{auction.bids.length}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-xs">Bid Increment</span>
                </div>
                <p className="text-xl font-bold">5%</p>
              </CardContent>
            </Card>
          </div>

          {/* Current Bid & Place Bid */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  {auction.bids.length > 0 ? "Current Bid" : "Starting Price"}
                </p>
                <p className="text-4xl font-bold">
                  {auction.currentBid} {auction.currency}
                </p>
                {leadingBidder && (
                  <div className="flex items-center gap-2 mt-2">
                    <Trophy className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm">
                      Leading: {leadingBidder.name || leadingBidder.address.slice(0, 8)}
                    </span>
                  </div>
                )}
              </div>

              {auction.status === "active" && (
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      placeholder={`Min bid: ${minBidAmount.toFixed(3)} ${auction.currency}`}
                      value={bidAmount}
                      onChange={e => setBidAmount(e.target.value)}
                      step="0.001"
                      min={minBidAmount}
                    />
                    <Button
                      onClick={handlePlaceBid}
                      disabled={!bidAmount || parseFloat(bidAmount) < minBidAmount}
                      className="min-w-[120px]"
                    >
                      <Gavel className="h-4 w-4 mr-2" />
                      Place Bid
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    You must bid at least {minBidAmount.toFixed(3)} {auction.currency}
                  </p>
                </div>
              )}

              {auction.status === "ended" && auction.winner && (
                <div className="bg-muted/50 rounded-lg p-4">
                  <p className="text-sm text-muted-foreground mb-1">Winner</p>
                  <p className="font-medium">{auction.winner.name || auction.winner.address}</p>
                  <p className="text-2xl font-bold mt-1">
                    {auction.currentBid} {auction.currency}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Bid History */}
          <Card>
            <CardContent className="p-6">
              <Tabs defaultValue="history">
                <TabsList className="w-full">
                  <TabsTrigger value="history" className="flex-1">
                    Bid History ({auction.bids.length})
                  </TabsTrigger>
                  <TabsTrigger value="details" className="flex-1">
                    Details
                  </TabsTrigger>
                </TabsList>

                <TabsContent
                  value="history"
                  className="mt-4 space-y-3 max-h-[400px] overflow-y-auto"
                >
                  {auction.bids.length === 0 ? (
                    <p className="text-center text-muted-foreground py-4">No bids yet</p>
                  ) : (
                    auction.bids.map((bid, index) => (
                      <div
                        key={bid.id}
                        className={`flex items-center justify-between p-3 rounded-lg ${
                          index === 0 ? "bg-primary/10 border border-primary/20" : "bg-muted/50"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={bid.bidder.avatar} />
                            <AvatarFallback>{bid.bidder.name?.[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-sm">
                              {bid.bidder.name || bid.bidder.address.slice(0, 8)}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {formatDistanceToNow(bid.timestamp, {
                                addSuffix: true,
                              })}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">
                            {bid.amount} {auction.currency}
                          </p>
                          {index === 0 && (
                            <Badge variant="default" className="text-xs">
                              Leading
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </TabsContent>

                <TabsContent value="details" className="mt-4 space-y-2">
                  <div className="flex justify-between py-2">
                    <span className="text-muted-foreground">Contract</span>
                    <span className="font-mono text-sm">
                      {auction.contractAddress.slice(0, 6)}...
                      {auction.contractAddress.slice(-4)}
                    </span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-muted-foreground">Token ID</span>
                    <span>{auction.tokenId}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-muted-foreground">Start Time</span>
                    <span>{auction.startTime.toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-muted-foreground">End Time</span>
                    <span>{auction.endTime.toLocaleDateString()}</span>
                  </div>
                  {auction.reservePrice && (
                    <div className="flex justify-between py-2">
                      <span className="text-muted-foreground">Reserve Price</span>
                      <span>
                        {auction.reservePrice} {auction.currency}
                      </span>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
