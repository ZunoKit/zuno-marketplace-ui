"use client";

import { useState, useEffect, useCallback } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/shared/components/ui/dialog";
import { Input } from "@/shared/components/ui/input";
import { ScrollArea } from "@/shared/components/ui/scroll-area";
import { cn } from "@/shared/utils/tailwind-utils";
import {
  Search,
  TrendingUp,
  Clock,
  X,
  Sparkles,
  Image as ImageIcon,
  Users,
  Hash,
  Wallet,
  ArrowRight,
  Trophy,
  Star,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Mock data - trong thực tế sẽ lấy từ API
const trendingSearches = [
  { id: 1, term: "Azuki", icon: "🔥", change: "+12%" },
  { id: 2, term: "BAYC", icon: "🦧", change: "+8%" },
  { id: 3, term: "Pudgy Penguins", icon: "🐧", change: "+45%" },
  { id: 4, term: "DeGods", icon: "👹", change: "-5%" },
];

const recentSearches = [
  { id: 1, term: "Cool Cats", type: "collection" },
  { id: 2, term: "0x742d...8921", type: "wallet" },
  { id: 3, term: "Art Blocks", type: "collection" },
];

const topCollections = [
  {
    id: 1,
    name: "Bored Ape Yacht Club",
    image: "https://picsum.photos/50/50?random=1",
    floor: "28.5 ETH",
    volume: "125K ETH",
    change: "+12.5%",
    verified: true,
  },
  {
    id: 2,
    name: "Azuki",
    image: "https://picsum.photos/50/50?random=2",
    floor: "15.2 ETH",
    volume: "89K ETH",
    change: "+8.2%",
    verified: true,
  },
  {
    id: 3,
    name: "Doodles",
    image: "https://picsum.photos/50/50?random=3",
    floor: "8.8 ETH",
    volume: "45K ETH",
    change: "-2.1%",
    verified: true,
  },
];

const categories = [
  { id: "all", label: "All", icon: Sparkles },
  { id: "collections", label: "Collections", icon: ImageIcon },
  { id: "users", label: "Users", icon: Users },
  { id: "items", label: "Items", icon: Hash },
  { id: "wallets", label: "Wallets", icon: Wallet },
];

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isSearching, setIsSearching] = useState(false);

  // Keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        onClose();
      }
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term);
    setIsSearching(true);
    // Simulate search delay
    setTimeout(() => {
      setIsSearching(false);
    }, 500);
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="p-0 gap-0 overflow-hidden"
        style={{ maxWidth: "45vw", width: "45vw", height: "55vh" }}
      >
        {/* Hidden title for accessibility */}
        <DialogTitle className="sr-only">Search NFTs and Collections</DialogTitle>

        {/* Search Header */}
        <div className="border-b border-gray-200/50 dark:border-gray-800 p-5 bg-white dark:bg-gray-900">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              autoFocus
              value={searchTerm}
              onChange={e => handleSearch(e.target.value)}
              placeholder="Search NFTs, collections, creators and wallets..."
              className="pl-12 pr-12 h-12 text-base border border-gray-200 dark:border-gray-700 focus:border-purple-500 dark:focus:border-purple-400 focus-visible:ring-0 bg-gray-50 dark:bg-gray-800/50 rounded-lg"
            />
            <button
              onClick={onClose}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Main Content with Sidebar */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left Sidebar - Categories */}
          <div className="w-48 border-r border-gray-200/50 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 p-3">
            <div className="space-y-1">
              {categories.map(category => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={cn(
                      "w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all",
                      selectedCategory === category.id
                        ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
                        : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-white dark:hover:bg-gray-800"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{category.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Content - Search Results */}
          <ScrollArea className="flex-1">
            {!searchTerm ? (
              <div className="p-6 space-y-6">
                {/* Trending Searches */}
                <div>
                  <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-3">
                    <TrendingUp className="h-4 w-4" />
                    Trending Searches
                  </div>
                  <div className="grid grid-cols-3 xl:grid-cols-4 gap-3">
                    {trendingSearches.map(item => (
                      <button
                        key={item.id}
                        onClick={() => handleSearch(item.term)}
                        className="flex items-center justify-between p-3 rounded-lg bg-white border border-gray-200 hover:border-purple-300 dark:bg-gray-800 dark:border-gray-700 dark:hover:border-purple-600 transition-all group"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{item.icon}</span>
                          <span className="font-medium">{item.term}</span>
                        </div>
                        <span
                          className={cn(
                            "text-xs font-semibold",
                            item.change.startsWith("+")
                              ? "text-green-600 dark:text-green-400"
                              : "text-red-600 dark:text-red-400"
                          )}
                        >
                          {item.change}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Recent Searches */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      Recent Searches
                    </div>
                    <button className="text-xs text-muted-foreground hover:text-foreground">
                      Clear all
                    </button>
                  </div>
                  <div className="space-y-1">
                    {recentSearches.map(item => (
                      <button
                        key={item.id}
                        onClick={() => handleSearch(item.term)}
                        className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          {item.type === "wallet" ? (
                            <Wallet className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <ImageIcon className="h-4 w-4 text-muted-foreground" />
                          )}
                          <span>{item.term}</span>
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Top Collections */}
                <div>
                  <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-3">
                    <Trophy className="h-4 w-4" />
                    Top Collections Today
                  </div>
                  <div className="grid grid-cols-2 xl:grid-cols-3 gap-3">
                    {topCollections.map((collection, index) => (
                      <Link
                        key={collection.id}
                        href={`/collections/${collection.id}`}
                        onClick={onClose}
                        className="p-4 rounded-lg bg-white border border-gray-200 hover:border-purple-300 dark:bg-gray-800 dark:border-gray-700 dark:hover:border-purple-600 transition-all group"
                      >
                        <div className="flex items-start gap-3">
                          <div className="relative">
                            <Image
                              src={collection.image}
                              alt={collection.name}
                              width={48}
                              height={48}
                              className="rounded-lg"
                            />
                            {collection.verified && (
                              <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-0.5">
                                <Star className="h-3 w-3 text-white fill-white" />
                              </div>
                            )}
                            <div className="absolute -top-2 -left-2 w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                              {index + 1}
                            </div>
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold group-hover:text-purple-600 dark:group-hover:text-purple-400">
                              {collection.name}
                            </p>
                            <div className="mt-2 space-y-1">
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Floor</span>
                                <span className="font-medium">{collection.floor}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Vol</span>
                                <span className="font-medium">{collection.volume}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-500">24h</span>
                                <span
                                  className={cn(
                                    "font-semibold",
                                    collection.change.startsWith("+")
                                      ? "text-green-600 dark:text-green-400"
                                      : "text-red-600 dark:text-red-400"
                                  )}
                                >
                                  {collection.change}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              // Search Results
              <div className="p-4">
                {isSearching ? (
                  <div className="flex items-center justify-center py-20">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-current border-t-transparent" />
                      Searching...
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="text-sm text-muted-foreground">
                      Showing results for &quot;{searchTerm}&quot;
                    </div>
                    {/* Placeholder for search results */}
                    <div className="space-y-2">
                      {[1, 2, 3].map(i => (
                        <div
                          key={i}
                          className="p-4 rounded-lg border dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-lg bg-gray-200 dark:bg-white/10 animate-pulse" />
                            <div className="flex-1">
                              <div className="h-4 w-32 bg-gray-200 dark:bg-white/10 rounded animate-pulse mb-2" />
                              <div className="h-3 w-24 bg-gray-200 dark:bg-white/10 rounded animate-pulse" />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </ScrollArea>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200/50 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 px-5 py-3 flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-white/10 rounded text-[10px] font-mono">
                ↑↓
              </kbd>
              Navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-white/10 rounded text-[10px] font-mono">
                Enter
              </kbd>
              Select
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-white/10 rounded text-[10px] font-mono">
                Esc
              </kbd>
              Close
            </span>
          </div>
          <div>
            Powered by <span className="font-semibold">Magic Search™</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
