"use client";

import { TrendingUp, Clock, Heart } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";
import Image from "next/image";
import Link from "next/link";

interface TrendingNFT {
  id: string;
  name: string;
  image: string;
  price: string;
  currency: string;
  change24h: number;
  owner: {
    name: string;
    avatar: string;
  };
  likes: number;
  timeLeft?: string;
  isAuction?: boolean;
  collection: string;
}

const mockTrendingNFTs: TrendingNFT[] = [
  {
    id: "1",
    name: "Cosmic Dreams #4521",
    image: "https://picsum.photos/400/400?random=1",
    price: "2.45",
    currency: "ETH",
    change24h: 15.2,
    owner: {
      name: "ArtCollector",
      avatar: "https://picsum.photos/100/100?random=11",
    },
    likes: 245,
    collection: "Cosmic Dreams",
    isAuction: true,
    timeLeft: "2h 45m",
  },
  {
    id: "2",
    name: "Pixel Warriors #182",
    image: "https://picsum.photos/400/400?random=2",
    price: "0.89",
    currency: "ETH",
    change24h: -5.3,
    owner: {
      name: "PixelMaster",
      avatar: "https://picsum.photos/100/100?random=12",
    },
    likes: 189,
    collection: "Pixel Warriors",
  },
  {
    id: "3",
    name: "Abstract Visions #92",
    image: "https://picsum.photos/400/400?random=3",
    price: "1.2",
    currency: "ETH",
    change24h: 8.7,
    owner: {
      name: "CryptoWhale",
      avatar: "https://picsum.photos/100/100?random=13",
    },
    likes: 421,
    collection: "Abstract Visions",
  },
  {
    id: "4",
    name: "Digital Landscapes #33",
    image: "https://picsum.photos/400/400?random=4",
    price: "3.7",
    currency: "ETH",
    change24h: 22.1,
    owner: {
      name: "NFTExplorer",
      avatar: "https://picsum.photos/100/100?random=14",
    },
    likes: 567,
    collection: "Digital Landscapes",
    isAuction: true,
    timeLeft: "5h 30m",
  },
  {
    id: "5",
    name: "CyberPunk City #777",
    image: "https://picsum.photos/400/400?random=5",
    price: "0.5",
    currency: "ETH",
    change24h: -2.1,
    owner: {
      name: "FutureCollector",
      avatar: "https://picsum.photos/100/100?random=15",
    },
    likes: 312,
    collection: "CyberPunk City",
  },
  {
    id: "6",
    name: "Nature Spirits #445",
    image: "https://picsum.photos/400/400?random=6",
    price: "1.8",
    currency: "ETH",
    change24h: 12.4,
    owner: {
      name: "EcoArt",
      avatar: "https://picsum.photos/100/100?random=16",
    },
    likes: 892,
    collection: "Nature Spirits",
  },
];

export default function TrendingNFTs() {
  return (
    <section className="w-full py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">🔥 Trending NFTs</h2>
            <p className="text-muted-foreground">
              Discover the hottest NFTs gaining momentum
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/explore?sort=trending">View All</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          {mockTrendingNFTs.map((nft) => (
            <Card
              key={nft.id}
              className="group hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="relative aspect-square">
                <Image
                  src={nft.image}
                  alt={nft.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {nft.isAuction && (
                  <Badge className="absolute top-2 left-2 bg-red-500 text-white">
                    <Clock className="w-3 h-3 mr-1" />
                    {nft.timeLeft}
                  </Badge>
                )}
                <Badge
                  className={`absolute top-2 right-2 ${
                    nft.change24h > 0 ? "bg-green-500" : "bg-red-500"
                  } text-white`}
                >
                  <TrendingUp className="w-3 h-3 mr-1" />
                  {nft.change24h > 0 ? "+" : ""}
                  {nft.change24h}%
                </Badge>
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Heart className="h-4 w-4" />
                </Button>
              </div>

              <CardContent className="pt-4">
                <p className="text-xs text-muted-foreground mb-1">
                  {nft.collection}
                </p>
                <h3 className="font-semibold text-sm mb-2 truncate">
                  {nft.name}
                </h3>

                <div className="flex items-center gap-2 mb-3">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={nft.owner.avatar} />
                    <AvatarFallback>{nft.owner.name[0]}</AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-muted-foreground truncate">
                    @{nft.owner.name}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">
                      {nft.isAuction ? "Current bid" : "Price"}
                    </p>
                    <p className="font-bold text-sm">
                      {nft.price} {nft.currency}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Heart className="h-3 w-3" />
                    <span className="text-xs">{nft.likes}</span>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="pt-0 pb-4">
                <Button
                  className="w-full"
                  size="sm"
                  variant={nft.isAuction ? "default" : "outline"}
                >
                  {nft.isAuction ? "Place Bid" : "Buy Now"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
