"use client";

import { useState, useEffect } from "react";
import {
  Activity,
  ShoppingCart,
  Tag,
  Send,
  Gavel,
  List,
  Heart,
  Package,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  RefreshCw,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar";
import { Checkbox } from "@/shared/components/ui/checkbox";
import Image from "next/image";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

type ActivityType = "sale" | "listing" | "bid" | "transfer" | "mint" | "offer" | "cancel";

interface ActivityItem {
  id: string;
  type: ActivityType;
  nft: {
    id: string;
    name: string;
    image: string;
    collection: string;
  };
  from: {
    name: string;
    avatar: string;
    address: string;
  };
  to?: {
    name: string;
    avatar: string;
    address: string;
  };
  price?: number;
  currency?: string;
  timestamp: Date;
  txHash: string;
  blockchain: string;
}

// Generate mock activity data
const generateMockActivity = (count: number): ActivityItem[] => {
  const types: ActivityType[] = ["sale", "listing", "bid", "transfer", "mint", "offer", "cancel"];
  const blockchains = ["Ethereum", "Polygon", "Solana", "BNB Chain"];

  return Array.from({ length: count }, (_, i) => ({
    id: `activity-${i}`,
    type: types[Math.floor(Math.random() * types.length)],
    nft: {
      id: `nft-${Math.floor(Math.random() * 100)}`,
      name: `NFT #${Math.floor(Math.random() * 10000)}`,
      image: `https://picsum.photos/100/100?random=${i}`,
      collection: `Collection ${Math.floor(Math.random() * 20)}`,
    },
    from: {
      name: `User${Math.floor(Math.random() * 1000)}`,
      avatar: `https://picsum.photos/100/100?random=${i + 1000}`,
      address: `0x${Math.random().toString(16).substr(2, 8)}...`,
    },
    to:
      Math.random() > 0.3
        ? {
            name: `User${Math.floor(Math.random() * 1000)}`,
            avatar: `https://picsum.photos/100/100?random=${i + 2000}`,
            address: `0x${Math.random().toString(16).substr(2, 8)}...`,
          }
        : undefined,
    price: Math.random() > 0.4 ? Math.random() * 10 : undefined,
    currency: "ETH",
    timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
    txHash: `0x${Math.random().toString(16).substr(2, 64)}`,
    blockchain: blockchains[Math.floor(Math.random() * blockchains.length)],
  }));
};

const getActivityIcon = (type: ActivityType) => {
  switch (type) {
    case "sale":
      return <ShoppingCart className="h-4 w-4" />;
    case "listing":
      return <Tag className="h-4 w-4" />;
    case "bid":
      return <Gavel className="h-4 w-4" />;
    case "transfer":
      return <Send className="h-4 w-4" />;
    case "mint":
      return <Package className="h-4 w-4" />;
    case "offer":
      return <Heart className="h-4 w-4" />;
    case "cancel":
      return <List className="h-4 w-4" />;
    default:
      return <Activity className="h-4 w-4" />;
  }
};

const getActivityColor = (type: ActivityType) => {
  switch (type) {
    case "sale":
      return "bg-green-500";
    case "listing":
      return "bg-blue-500";
    case "bid":
      return "bg-purple-500";
    case "transfer":
      return "bg-orange-500";
    case "mint":
      return "bg-cyan-500";
    case "offer":
      return "bg-pink-500";
    case "cancel":
      return "bg-gray-500";
    default:
      return "bg-gray-400";
  }
};

const getActivityDescription = (item: ActivityItem) => {
  switch (item.type) {
    case "sale":
      return `sold to`;
    case "listing":
      return `listed for`;
    case "bid":
      return `bid`;
    case "transfer":
      return `transferred to`;
    case "mint":
      return `minted`;
    case "offer":
      return `offered`;
    case "cancel":
      return `canceled listing`;
    default:
      return "";
  }
};

export default function MarketplaceActivity() {
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [filteredActivities, setFilteredActivities] = useState<ActivityItem[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<ActivityType[]>([]);
  const [selectedBlockchain, setSelectedBlockchain] = useState<string>("all");
  const [timeFilter, setTimeFilter] = useState<string>("all");
  const [isAutoRefresh, setIsAutoRefresh] = useState(false);

  useEffect(() => {
    // Initial load
    const mockData = generateMockActivity(100);
    setActivities(mockData);
    setFilteredActivities(mockData);
  }, []);

  useEffect(() => {
    if (isAutoRefresh) {
      const interval = setInterval(() => {
        // Simulate new activity
        const newActivity = generateMockActivity(1);
        newActivity[0].timestamp = new Date();
        setActivities(prev => [newActivity[0], ...prev.slice(0, 99)]);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [isAutoRefresh]);

  useEffect(() => {
    let filtered = [...activities];

    // Filter by type
    if (selectedTypes.length > 0) {
      filtered = filtered.filter(item => selectedTypes.includes(item.type));
    }

    // Filter by blockchain
    if (selectedBlockchain !== "all") {
      filtered = filtered.filter(item => item.blockchain === selectedBlockchain);
    }

    // Filter by time
    const now = Date.now();
    switch (timeFilter) {
      case "1h":
        filtered = filtered.filter(item => now - item.timestamp.getTime() < 60 * 60 * 1000);
        break;
      case "24h":
        filtered = filtered.filter(item => now - item.timestamp.getTime() < 24 * 60 * 60 * 1000);
        break;
      case "7d":
        filtered = filtered.filter(
          item => now - item.timestamp.getTime() < 7 * 24 * 60 * 60 * 1000
        );
        break;
    }

    setFilteredActivities(filtered);
  }, [activities, selectedTypes, selectedBlockchain, timeFilter]);

  const ActivityRow = ({ item }: { item: ActivityItem }) => (
    <div className="flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors rounded-lg">
      <div className={`p-2 rounded-full ${getActivityColor(item.type)} text-white`}>
        {getActivityIcon(item.type)}
      </div>

      <Link href={`/nft/${item.nft.id}`}>
        <Image
          src={item.nft.image}
          alt={item.nft.name}
          width={48}
          height={48}
          className="rounded-lg cursor-pointer hover:opacity-80"
        />
      </Link>

      <div className="flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          <Link href={`/profile/${item.from.address}`}>
            <span className="font-semibold hover:text-primary cursor-pointer">
              {item.from.name}
            </span>
          </Link>

          <span className="text-muted-foreground">{getActivityDescription(item)}</span>

          {item.to && (
            <Link href={`/profile/${item.to.address}`}>
              <span className="font-semibold hover:text-primary cursor-pointer">
                {item.to.name}
              </span>
            </Link>
          )}

          {item.price && (
            <span className="font-bold">
              {item.price.toFixed(3)} {item.currency}
            </span>
          )}
        </div>

        <div className="flex items-center gap-4 mt-1">
          <Link href={`/collections/${item.nft.collection}`}>
            <span className="text-sm text-muted-foreground hover:text-primary cursor-pointer">
              {item.nft.collection}
            </span>
          </Link>

          <span className="text-sm text-muted-foreground">{item.nft.name}</span>

          <Badge variant="outline" className="text-xs">
            {item.blockchain}
          </Badge>
        </div>
      </div>

      <div className="text-right">
        <p className="text-sm text-muted-foreground">
          {formatDistanceToNow(item.timestamp, { addSuffix: true })}
        </p>
        <Link
          href={`https://etherscan.io/tx/${item.txHash}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-primary hover:underline flex items-center gap-1 justify-end"
        >
          View TX <ArrowUpRight className="h-3 w-3" />
        </Link>
      </div>
    </div>
  );

  const stats = {
    totalVolume: activities.reduce((acc, item) => acc + (item.price || 0), 0),
    totalSales: activities.filter(item => item.type === "sale").length,
    avgPrice:
      activities.filter(item => item.price).reduce((acc, item) => acc + (item.price || 0), 0) /
        activities.filter(item => item.price).length || 0,
    totalTransactions: activities.length,
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Activity Feed</h1>
        <p className="text-muted-foreground">
          Real-time marketplace activity across all collections
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Volume</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalVolume.toFixed(2)} ETH</div>
            <p className="text-xs text-muted-foreground">Last 7 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            <ShoppingCart className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalSales}</div>
            <p className="text-xs text-muted-foreground">Last 7 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Price</CardTitle>
            <Activity className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.avgPrice.toFixed(3)} ETH</div>
            <p className="text-xs text-muted-foreground">Per transaction</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Transactions</CardTitle>
            <Package className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalTransactions}</div>
            <p className="text-xs text-muted-foreground">Total activity</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">Event Type</label>
              <div className="flex flex-wrap gap-2">
                {(
                  [
                    "sale",
                    "listing",
                    "bid",
                    "transfer",
                    "mint",
                    "offer",
                    "cancel",
                  ] as ActivityType[]
                ).map(type => (
                  <label key={type} className="flex items-center gap-2 cursor-pointer">
                    <Checkbox
                      checked={selectedTypes.includes(type)}
                      onCheckedChange={checked => {
                        if (checked) {
                          setSelectedTypes([...selectedTypes, type]);
                        } else {
                          setSelectedTypes(selectedTypes.filter(t => t !== type));
                        }
                      }}
                    />
                    <span className="text-sm capitalize">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <Select value={selectedBlockchain} onValueChange={setSelectedBlockchain}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Blockchain" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Chains</SelectItem>
                  <SelectItem value="Ethereum">Ethereum</SelectItem>
                  <SelectItem value="Polygon">Polygon</SelectItem>
                  <SelectItem value="Solana">Solana</SelectItem>
                  <SelectItem value="BNB Chain">BNB Chain</SelectItem>
                </SelectContent>
              </Select>

              <Select value={timeFilter} onValueChange={setTimeFilter}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="1h">Last Hour</SelectItem>
                  <SelectItem value="24h">Last 24h</SelectItem>
                  <SelectItem value="7d">Last 7 Days</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant={isAutoRefresh ? "default" : "outline"}
                size="icon"
                onClick={() => setIsAutoRefresh(!isAutoRefresh)}
              >
                <RefreshCw className={`h-4 w-4 ${isAutoRefresh ? "animate-spin" : ""}`} />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Activity List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Recent Activity</span>
            <Badge variant="secondary">{filteredActivities.length} items</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {filteredActivities.length > 0 ? (
              filteredActivities.map(item => <ActivityRow key={item.id} item={item} />)
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No activity matching your filters</p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setSelectedTypes([]);
                    setSelectedBlockchain("all");
                    setTimeFilter("all");
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
