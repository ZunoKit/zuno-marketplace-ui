import OverviewSection from "@/modules/mint/mint-nft/OverviewSection";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/ui/tabs";
import React from "react";

export default function CollectionOverviewTabs() {
  return (
    <Tabs defaultValue="overview" className="w-full">
      <div className="border-b border-gray-200 dark:border-gray-800/30">
        <TabsList className="bg-transparent h-auto p-0">
          <TabsTrigger
            value="overview"
            className="px-4 py-2 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-pink-500 data-[state=active]:border-b-2 data-[state=active]:border-pink-500 rounded-none text-sm"
          >
            Overview
          </TabsTrigger>
        </TabsList>
      </div>

      <div className="mt-6">
        <TabsContent value="overview" className="m-0">
          <OverviewSection />
        </TabsContent>
      </div>
    </Tabs>
  );
}
