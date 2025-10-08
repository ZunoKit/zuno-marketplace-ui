"use client";

import {
  Palette,
  Gamepad2,
  Music,
  Camera,
  Globe,
  Sparkles,
  Trophy,
  Heart,
  Zap,
  Cpu,
  Film,
  BookOpen,
} from "lucide-react";
import { Card, CardContent } from "@/shared/components/ui/card";
import Link from "next/link";

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  itemCount: number;
  floorPrice: string;
  description: string;
  gradient: string;
  trending?: boolean;
}

const categories: Category[] = [
  {
    id: "art",
    name: "Art",
    icon: <Palette className="h-6 w-6" />,
    itemCount: 45239,
    floorPrice: "0.08",
    description: "Digital art and illustrations",
    gradient: "from-purple-500 to-pink-500",
    trending: true,
  },
  {
    id: "gaming",
    name: "Gaming",
    icon: <Gamepad2 className="h-6 w-6" />,
    itemCount: 32156,
    floorPrice: "0.12",
    description: "In-game items and assets",
    gradient: "from-blue-500 to-cyan-500",
    trending: true,
  },
  {
    id: "music",
    name: "Music",
    icon: <Music className="h-6 w-6" />,
    itemCount: 18923,
    floorPrice: "0.05",
    description: "Music NFTs and audio",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    id: "photography",
    name: "Photography",
    icon: <Camera className="h-6 w-6" />,
    itemCount: 27845,
    floorPrice: "0.15",
    description: "Professional photography",
    gradient: "from-orange-500 to-red-500",
  },
  {
    id: "metaverse",
    name: "Metaverse",
    icon: <Globe className="h-6 w-6" />,
    itemCount: 15672,
    floorPrice: "0.25",
    description: "Virtual worlds and lands",
    gradient: "from-indigo-500 to-purple-500",
    trending: true,
  },
  {
    id: "collectibles",
    name: "Collectibles",
    icon: <Sparkles className="h-6 w-6" />,
    itemCount: 52341,
    floorPrice: "0.03",
    description: "Digital collectibles",
    gradient: "from-yellow-500 to-orange-500",
  },
  {
    id: "sports",
    name: "Sports",
    icon: <Trophy className="h-6 w-6" />,
    itemCount: 21456,
    floorPrice: "0.09",
    description: "Sports memorabilia",
    gradient: "from-red-500 to-pink-500",
  },
  {
    id: "utility",
    name: "Utility",
    icon: <Zap className="h-6 w-6" />,
    itemCount: 8934,
    floorPrice: "0.18",
    description: "Utility and membership NFTs",
    gradient: "from-amber-500 to-yellow-500",
  },
  {
    id: "ai-art",
    name: "AI Art",
    icon: <Cpu className="h-6 w-6" />,
    itemCount: 12567,
    floorPrice: "0.07",
    description: "AI-generated artwork",
    gradient: "from-cyan-500 to-blue-500",
    trending: true,
  },
  {
    id: "video",
    name: "Video",
    icon: <Film className="h-6 w-6" />,
    itemCount: 9823,
    floorPrice: "0.11",
    description: "Video and animations",
    gradient: "from-violet-500 to-purple-500",
  },
  {
    id: "literature",
    name: "Literature",
    icon: <BookOpen className="h-6 w-6" />,
    itemCount: 5432,
    floorPrice: "0.04",
    description: "Books and written content",
    gradient: "from-emerald-500 to-green-500",
  },
  {
    id: "charity",
    name: "Charity",
    icon: <Heart className="h-6 w-6" />,
    itemCount: 3421,
    floorPrice: "0.02",
    description: "Charitable causes",
    gradient: "from-pink-500 to-rose-500",
  },
];

export default function NFTCategories() {
  return (
    <section className="w-full py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">🎨 Browse by Category</h2>
          <p className="text-muted-foreground">
            Explore NFTs across different categories
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link key={category.id} href={`/explore?category=${category.id}`}>
              <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden">
                <div className={`h-2 bg-gradient-to-r ${category.gradient}`} />
                <CardContent className="pt-4">
                  <div
                    className={`w-12 h-12 rounded-lg bg-gradient-to-r ${category.gradient} flex items-center justify-center text-white mb-3`}
                  >
                    {category.icon}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-sm">{category.name}</h3>
                      {category.trending && (
                        <Sparkles className="h-3 w-3 text-yellow-500" />
                      )}
                    </div>

                    <p className="text-xs text-muted-foreground line-clamp-1">
                      {category.description}
                    </p>

                    <div className="pt-2 space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Items</span>
                        <span className="font-medium">
                          {category.itemCount.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Floor</span>
                        <span className="font-medium">
                          {category.floorPrice} ETH
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
