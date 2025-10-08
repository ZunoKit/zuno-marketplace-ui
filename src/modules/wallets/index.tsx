"use client";

import { useState } from "react";
import { WalletCard } from "@/modules/wallets/WalletCard";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/ui/tabs";
import { Input } from "@/shared/components/ui/input";
import { Search, Wallet2, Smartphone, Monitor, HardDrive } from "lucide-react";
import { type Wallet, type WalletCategory } from "@/shared/types/wallet";
import { mockWallets } from "@/shared/utils/mock/wallet";

export function Wallets() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<WalletCategory>("all");

  const handleConnect = (wallet: Wallet) => {
    console.log("Connecting to wallet:", wallet.name);
    // Implement wallet connection logic
  };

  const filterWallets = () => {
    let filtered = [...mockWallets];

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (wallet) =>
          wallet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          wallet.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    switch (selectedCategory) {
      case "popular":
        filtered = filtered.filter((w) => w.isPopular);
        break;
      case "browser":
        filtered = filtered.filter(
          (w) => w.chromeExtensionUrl || w.firefoxExtensionUrl
        );
        break;
      case "mobile":
        filtered = filtered.filter(
          (w) => w.mobileAppUrl?.ios || w.mobileAppUrl?.android
        );
        break;
      case "hardware":
        filtered = filtered.filter(
          (w) =>
            w.name.toLowerCase().includes("ledger") ||
            w.name.toLowerCase().includes("trezor")
        );
        break;
    }

    return filtered;
  };

  const filteredWallets = filterWallets();

  const categories = [
    { value: "all", label: "All Wallets", icon: Wallet2 },
    { value: "popular", label: "Popular", icon: Wallet2 },
    { value: "browser", label: "Browser", icon: Monitor },
    { value: "mobile", label: "Mobile", icon: Smartphone },
    { value: "hardware", label: "Hardware", icon: HardDrive },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Connect Your Wallet</h1>
        <p className="text-muted-foreground">
          Choose from a variety of wallets to connect to the marketplace
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search wallets..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Categories */}
      <Tabs
        value={selectedCategory}
        onValueChange={(value) => setSelectedCategory(value as WalletCategory)}
      >
        <TabsList className="w-full justify-start overflow-x-auto mb-6">
          {categories.map((category) => (
            <TabsTrigger
              key={category.value}
              value={category.value}
              className="flex items-center gap-2"
            >
              <category.icon className="h-4 w-4" />
              {category.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={selectedCategory}>
          {filteredWallets.length === 0 ? (
            <div className="text-center py-12">
              <Wallet2 className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">
                No wallets found matching your criteria
              </p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredWallets.map((wallet) => (
                <WalletCard
                  key={wallet.id}
                  wallet={wallet}
                  onConnect={handleConnect}
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
