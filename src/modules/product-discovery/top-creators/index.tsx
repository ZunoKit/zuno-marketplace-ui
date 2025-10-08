"use client";

import { TrendingUp, VerifiedIcon, Award } from "lucide-react";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";
import Link from "next/link";

interface Creator {
  id: string;
  rank: number;
  name: string;
  username: string;
  avatar: string;
  coverImage: string;
  isVerified: boolean;
  totalSales: string;
  itemsSold: number;
  followers: number;
  floorPrice: string;
  change7d: number;
}

const mockTopCreators: Creator[] = [
  {
    id: "1",
    rank: 1,
    name: "Digital Dreams Studio",
    username: "digitaldreams",
    avatar: "https://picsum.photos/200/200?random=21",
    coverImage: "https://picsum.photos/400/200?random=31",
    isVerified: true,
    totalSales: "4,521.3",
    itemsSold: 1243,
    followers: 45200,
    floorPrice: "0.5",
    change7d: 125.3,
  },
  {
    id: "2",
    rank: 2,
    name: "Pixel Perfect Art",
    username: "pixelperfect",
    avatar: "https://picsum.photos/200/200?random=22",
    coverImage: "https://picsum.photos/400/200?random=32",
    isVerified: true,
    totalSales: "3,892.7",
    itemsSold: 892,
    followers: 38900,
    floorPrice: "0.8",
    change7d: 89.2,
  },
  {
    id: "3",
    rank: 3,
    name: "Abstract Minds",
    username: "abstractminds",
    avatar: "https://picsum.photos/200/200?random=23",
    coverImage: "https://picsum.photos/400/200?random=33",
    isVerified: true,
    totalSales: "2,745.1",
    itemsSold: 567,
    followers: 29800,
    floorPrice: "1.2",
    change7d: -12.5,
  },
  {
    id: "4",
    rank: 4,
    name: "CryptoCanvas",
    username: "cryptocanvas",
    avatar: "https://picsum.photos/200/200?random=24",
    coverImage: "https://picsum.photos/400/200?random=34",
    isVerified: false,
    totalSales: "2,234.8",
    itemsSold: 445,
    followers: 22100,
    floorPrice: "0.3",
    change7d: 45.7,
  },
  {
    id: "5",
    rank: 5,
    name: "Future Visions",
    username: "futurevisions",
    avatar: "https://picsum.photos/200/200?random=25",
    coverImage: "https://picsum.photos/400/200?random=35",
    isVerified: true,
    totalSales: "1,987.4",
    itemsSold: 389,
    followers: 19500,
    floorPrice: "0.6",
    change7d: 67.3,
  },
  {
    id: "6",
    rank: 6,
    name: "Meta Artists",
    username: "metaartists",
    avatar: "https://picsum.photos/200/200?random=26",
    coverImage: "https://picsum.photos/400/200?random=36",
    isVerified: true,
    totalSales: "1,654.2",
    itemsSold: 312,
    followers: 17300,
    floorPrice: "0.4",
    change7d: -8.9,
  },
  {
    id: "7",
    rank: 7,
    name: "Neon Dreams",
    username: "neondreams",
    avatar: "https://picsum.photos/200/200?random=27",
    coverImage: "https://picsum.photos/400/200?random=37",
    isVerified: false,
    totalSales: "1,432.9",
    itemsSold: 278,
    followers: 14200,
    floorPrice: "0.25",
    change7d: 23.4,
  },
  {
    id: "8",
    rank: 8,
    name: "Digital Horizons",
    username: "digitalhorizons",
    avatar: "https://picsum.photos/200/200?random=28",
    coverImage: "https://picsum.photos/400/200?random=38",
    isVerified: true,
    totalSales: "1,198.5",
    itemsSold: 234,
    followers: 12800,
    floorPrice: "0.7",
    change7d: 91.2,
  },
];

export default function TopCreators() {
  return (
    <section className="w-full py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">👑 Top Creators</h2>
            <p className="text-muted-foreground">
              The best artists and creators in the marketplace
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">7 Days</Button>
            <Button variant="outline">30 Days</Button>
            <Button variant="outline">All Time</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockTopCreators.map((creator) => (
            <Card
              key={creator.id}
              className="group hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="relative h-24">
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-80"
                  style={{ backgroundImage: `url(${creator.coverImage})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/90" />

                {creator.rank <= 3 && (
                  <Badge
                    className={`absolute top-2 left-2 ${
                      creator.rank === 1
                        ? "bg-yellow-500"
                        : creator.rank === 2
                          ? "bg-gray-400"
                          : "bg-amber-600"
                    } text-white`}
                  >
                    <Award className="w-3 h-3 mr-1" />#{creator.rank}
                  </Badge>
                )}
              </div>

              <CardContent className="pt-0">
                <div className="flex items-start -mt-8 mb-4">
                  <Avatar className="h-16 w-16 border-4 border-background">
                    <AvatarImage src={creator.avatar} />
                    <AvatarFallback>{creator.name[0]}</AvatarFallback>
                  </Avatar>
                  {creator.isVerified && (
                    <VerifiedIcon className="w-5 h-5 text-blue-500 ml-2 mt-10" />
                  )}
                </div>

                <div className="mb-4">
                  <h3 className="font-semibold text-lg truncate">
                    {creator.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    @{creator.username}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                  <div>
                    <p className="text-muted-foreground text-xs">Total Sales</p>
                    <p className="font-bold">{creator.totalSales} ETH</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Floor Price</p>
                    <p className="font-bold">{creator.floorPrice} ETH</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Items Sold</p>
                    <p className="font-bold">
                      {creator.itemsSold.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">7d Change</p>
                    <p
                      className={`font-bold ${creator.change7d > 0 ? "text-green-500" : "text-red-500"}`}
                    >
                      {creator.change7d > 0 ? "+" : ""}
                      {creator.change7d}%
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-muted-foreground">
                    {(creator.followers / 1000).toFixed(1)}K followers
                  </span>
                  <Badge variant="secondary" className="text-xs">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    Trending
                  </Badge>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1" size="sm" asChild>
                    <Link href={`/profile/${creator.username}`}>
                      View Profile
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    Follow
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
