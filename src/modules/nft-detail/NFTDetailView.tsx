"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import {
  Heart,
  Share2,
  ShoppingCart,
  ExternalLink,
  Eye,
  MoreVertical,
  Sparkles,
} from "lucide-react";
import { type NFTDetail } from "@/shared/types/nft-detail";
import { NFTHistory } from "@/modules/nft-detail/NFTHistory";
import { NFTOffers } from "@/modules/nft-detail/NFTOffers";
import { NFTAttributes } from "@/modules/nft-detail/NFTAttributes";

interface NFTDetailViewProps {
  nft: NFTDetail;
}

export function NFTDetailView({ nft }: NFTDetailViewProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: nft.name,
        text: nft.metadata.description,
        url: window.location.href,
      });
    }
  };

  const handleBuyNow = () => {
    console.log("Buy NFT:", nft.id);
  };

  const handleMakeOffer = () => {
    console.log("Make offer for:", nft.id);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Image */}
        <div className="space-y-4">
          <Card className="overflow-hidden">
            <div className="relative aspect-square">
              <Image src={nft.image} alt={nft.name} fill className="object-cover" priority />
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
                  <Eye className="h-3 w-3 mr-1" />
                  {nft.views} views
                </Badge>
                <div className="flex gap-2">
                  <Button
                    size="icon"
                    variant="secondary"
                    className="bg-background/80 backdrop-blur-sm"
                    onClick={handleLike}
                  >
                    <Heart className={`h-4 w-4 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
                  </Button>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="bg-background/80 backdrop-blur-sm"
                    onClick={handleShare}
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="bg-background/80 backdrop-blur-sm"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Attributes */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Attributes</h3>
              <NFTAttributes attributes={nft.attributes || []} />
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Details */}
        <div className="space-y-4">
          {/* Title and Collection */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline">
                {nft.collection.name}
                {nft.collection.verified && " ✓"}
              </Badge>
              {nft.rarity && (
                <Badge variant="secondary">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Rank #{nft.rarity.rank}
                </Badge>
              )}
            </div>
            <h1 className="text-3xl font-bold mb-2">{nft.name}</h1>
            <p className="text-muted-foreground">
              Owned by {nft.owner.name || nft.owner.address.slice(0, 8)}
            </p>
          </div>

          {/* Price Card */}
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Current Price</p>
                  <p className="text-3xl font-bold">
                    {nft.price} {nft.currency}
                  </p>
                </div>

                {nft.status === "available" && (
                  <div className="flex gap-3">
                    <Button className="flex-1" size="lg" onClick={handleBuyNow}>
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Buy Now
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1"
                      size="lg"
                      onClick={handleMakeOffer}
                    >
                      Make Offer
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Description */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-3">Description</h3>
              <p className="text-muted-foreground">
                {nft.metadata.description || "No description available"}
              </p>
            </CardContent>
          </Card>

          {/* Details */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-3">Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Contract Address</span>
                  <a
                    href={`https://etherscan.io/address/${nft.blockchain.contractAddress}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline flex items-center gap-1"
                  >
                    {nft.blockchain.contractAddress.slice(0, 8)}...
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Token ID</span>
                  <span>{nft.blockchain.tokenId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Token Standard</span>
                  <span>{nft.blockchain.tokenStandard}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Chain</span>
                  <span>{nft.blockchain.chain}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="mt-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="offers">Offers ({nft.offers.length})</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid gap-4">
              <NFTHistory activities={nft.history.slice(0, 5)} />
            </div>
          </TabsContent>

          <TabsContent value="offers" className="mt-6">
            <NFTOffers offers={nft.offers} currentPrice={nft.price} />
          </TabsContent>

          <TabsContent value="history" className="mt-6">
            <NFTHistory activities={nft.history} />
          </TabsContent>
        </Tabs>
      </div>

      {/* More from Collection */}
      {nft.moreFromCollection.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">More from this collection</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {nft.moreFromCollection.slice(0, 6).map(item => (
              <Card key={item.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                <div className="relative aspect-square">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover rounded-t-lg"
                  />
                </div>
                <CardContent className="p-3">
                  <p className="font-medium text-sm truncate">{item.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {item.price} {item.currency}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
