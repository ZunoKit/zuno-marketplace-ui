"use client";

import { TrendingUp, Users, ShoppingBag, Activity, ArrowUp, ArrowDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Progress } from "@/shared/components/ui/progress";
import Image from "next/image";

interface Stat {
  title: string;
  value: string;
  change: number;
  changeLabel: string;
  icon: React.ReactNode;
  progress?: number;
}

const marketStats: Stat[] = [
  {
    title: "Total Volume",
    value: "$89.2M",
    change: 12.5,
    changeLabel: "from last month",
    icon: <Activity className="h-4 w-4" />,
    progress: 75,
  },
  {
    title: "Active Users",
    value: "42.8K",
    change: 8.2,
    changeLabel: "from last week",
    icon: <Users className="h-4 w-4" />,
    progress: 82,
  },
  {
    title: "NFTs Sold",
    value: "156.3K",
    change: -3.4,
    changeLabel: "from yesterday",
    icon: <ShoppingBag className="h-4 w-4" />,
    progress: 65,
  },
  {
    title: "Avg. Sale Price",
    value: "2.34 ETH",
    change: 18.7,
    changeLabel: "from last month",
    icon: <TrendingUp className="h-4 w-4" />,
    progress: 90,
  },
];

interface ChainStat {
  chain: string;
  logo: string;
  volume: string;
  transactions: string;
  users: string;
  change: number;
}

const chainStats: ChainStat[] = [
  {
    chain: "Ethereum",
    logo: "https://assets.coingecko.com/coins/images/279/small/ethereum.png",
    volume: "$45.2M",
    transactions: "89.5K",
    users: "23.4K",
    change: 15.3,
  },
  {
    chain: "Polygon",
    logo: "https://assets.coingecko.com/coins/images/4713/small/polygon.png",
    volume: "$22.7M",
    transactions: "145.2K",
    users: "31.2K",
    change: 28.9,
  },
  {
    chain: "BNB Chain",
    logo: "https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png",
    volume: "$18.9M",
    transactions: "67.3K",
    users: "18.7K",
    change: -5.2,
  },
  {
    chain: "Arbitrum",
    logo: "https://assets.coingecko.com/coins/images/16547/small/arb.jpg",
    volume: "$12.4M",
    transactions: "52.1K",
    users: "14.3K",
    change: 42.1,
  },
];

export default function MarketplaceStats() {
  return (
    <section className="w-full py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">📊 Marketplace Overview</h2>
          <p className="text-muted-foreground">Real-time statistics across all supported chains</p>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {marketStats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <div className="text-muted-foreground">{stat.icon}</div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-2">{stat.value}</div>
                <div className="flex items-center text-xs">
                  {stat.change > 0 ? (
                    <ArrowUp className="h-3 w-3 text-green-500 mr-1" />
                  ) : (
                    <ArrowDown className="h-3 w-3 text-red-500 mr-1" />
                  )}
                  <span className={stat.change > 0 ? "text-green-500" : "text-red-500"}>
                    {Math.abs(stat.change)}%
                  </span>
                  <span className="text-muted-foreground ml-1">{stat.changeLabel}</span>
                </div>
                {stat.progress !== undefined && (
                  <Progress value={stat.progress} className="mt-3 h-1" />
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Chain Statistics */}
        <Card>
          <CardHeader>
            <CardTitle>Chain Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {chainStats.map((chain, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Image
                      src={chain.logo}
                      alt={chain.chain}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                    <div>
                      <p className="font-semibold">{chain.chain}</p>
                      <p className="text-xs text-muted-foreground">
                        {chain.transactions} transactions • {chain.users} users
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-bold text-lg">{chain.volume}</p>
                    <div className="flex items-center justify-end text-xs">
                      {chain.change > 0 ? (
                        <ArrowUp className="h-3 w-3 text-green-500 mr-1" />
                      ) : (
                        <ArrowDown className="h-3 w-3 text-red-500 mr-1" />
                      )}
                      <span className={chain.change > 0 ? "text-green-500" : "text-red-500"}>
                        {Math.abs(chain.change)}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Activity Chart Placeholder */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Trading Activity (Last 7 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-muted/30 rounded-lg">
              <p className="text-muted-foreground">
                Interactive chart showing trading volume over time
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
