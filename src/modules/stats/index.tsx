"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";
import { Badge } from "@/shared/components/ui/badge";
import { TrendingUp, TrendingDown, Users, Package, DollarSign, Activity } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { mockCollections } from "@/shared/utils/mock/marketplace";

export function StatsPage() {
  // Mock top collections with stats
  const topCollections = mockCollections.map((col, index) => ({
    ...col,
    rank: index + 1,
    volume24h: (Math.random() * 1000).toFixed(2),
    change24h: (Math.random() * 40 - 10).toFixed(2),
    volume7d: (Math.random() * 5000).toFixed(2),
    change7d: (Math.random() * 60 - 20).toFixed(2),
    sales: Math.floor(Math.random() * 1000),
    uniqueHolders: Math.floor(Math.random() * 5000),
  }));

  // Mock trending NFTs
  const trendingNFTs = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    name: `Trending NFT #${i + 1}`,
    collection: mockCollections[i % mockCollections.length].name,
    price: (Math.random() * 5).toFixed(3),
    lastSale: (Math.random() * 4).toFixed(3),
    change: (Math.random() * 100 - 30).toFixed(2),
    image: `https://picsum.photos/100/100?random=${i + 100}`,
  }));

  const marketStats = {
    totalVolume: "45,678.90",
    totalSales: "123,456",
    avgPrice: "0.375",
    activeUsers: "34,567",
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Market Statistics</h1>
        <p className="text-muted-foreground">
          Real-time analytics and trending data across the marketplace
        </p>
      </div>

      {/* Market Overview Cards */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Volume</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{marketStats.totalVolume} ETH</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 inline mr-1 text-green-500" />
              +12.5% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{marketStats.totalSales}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 inline mr-1 text-green-500" />
              +8.2% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Price</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{marketStats.avgPrice} ETH</div>
            <p className="text-xs text-muted-foreground">
              <TrendingDown className="h-3 w-3 inline mr-1 text-red-500" />
              -3.4% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{marketStats.activeUsers}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 inline mr-1 text-green-500" />
              +18.7% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Rankings Tables */}
      <Tabs defaultValue="collections" className="space-y-4">
        <TabsList>
          <TabsTrigger value="collections">Top Collections</TabsTrigger>
          <TabsTrigger value="trending">Trending NFTs</TabsTrigger>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="collections">
          <Card>
            <CardHeader>
              <CardTitle>Top Collections by Volume</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">Rank</TableHead>
                    <TableHead>Collection</TableHead>
                    <TableHead>Floor Price</TableHead>
                    <TableHead>24h Volume</TableHead>
                    <TableHead>24h %</TableHead>
                    <TableHead>7d Volume</TableHead>
                    <TableHead>7d %</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Holders</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topCollections.map(collection => (
                    <TableRow key={collection.address}>
                      <TableCell className="font-medium">{collection.rank}</TableCell>
                      <TableCell>
                        <Link
                          href={`/collections/${collection.name.toLowerCase().replace(/\s+/g, "-")}`}
                          className="flex items-center gap-2 hover:underline"
                        >
                          <Image
                            src={collection.image || "/placeholder.svg"}
                            alt={collection.name}
                            width={32}
                            height={32}
                            className="rounded"
                          />
                          <span className="font-medium">{collection.name}</span>
                          {collection.verified && (
                            <Badge variant="outline" className="text-xs">
                              ✓
                            </Badge>
                          )}
                        </Link>
                      </TableCell>
                      <TableCell>{collection.floorPrice} ETH</TableCell>
                      <TableCell>{collection.volume24h} ETH</TableCell>
                      <TableCell>
                        <span
                          className={
                            parseFloat(collection.change24h) > 0 ? "text-green-500" : "text-red-500"
                          }
                        >
                          {parseFloat(collection.change24h) > 0 ? "+" : ""}
                          {collection.change24h}%
                        </span>
                      </TableCell>
                      <TableCell>{collection.volume7d} ETH</TableCell>
                      <TableCell>
                        <span
                          className={
                            parseFloat(collection.change7d) > 0 ? "text-green-500" : "text-red-500"
                          }
                        >
                          {parseFloat(collection.change7d) > 0 ? "+" : ""}
                          {collection.change7d}%
                        </span>
                      </TableCell>
                      <TableCell>{collection.itemCount.toLocaleString()}</TableCell>
                      <TableCell>{collection.uniqueHolders?.toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trending">
          <Card>
            <CardHeader>
              <CardTitle>Trending NFTs</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>NFT</TableHead>
                    <TableHead>Collection</TableHead>
                    <TableHead>Current Price</TableHead>
                    <TableHead>Last Sale</TableHead>
                    <TableHead>Change</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {trendingNFTs.map(nft => (
                    <TableRow key={nft.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Image
                            src={nft.image}
                            alt={nft.name}
                            width={40}
                            height={40}
                            className="rounded"
                          />
                          <span className="font-medium">{nft.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{nft.collection}</TableCell>
                      <TableCell>{nft.price} ETH</TableCell>
                      <TableCell>{nft.lastSale} ETH</TableCell>
                      <TableCell>
                        <span
                          className={parseFloat(nft.change) > 0 ? "text-green-500" : "text-red-500"}
                        >
                          {parseFloat(nft.change) > 0 ? "+" : ""}
                          {nft.change}%
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>Recent Market Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                Live activity feed coming soon...
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
