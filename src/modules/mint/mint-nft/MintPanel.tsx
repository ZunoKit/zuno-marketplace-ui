"use client";

import type React from "react";
import Image from "next/image";

import MintStages from "./MintStages";
import MintForm from "./MintForm";
import MintButton from "./MintButton";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/ui/tabs";
import { Sparkles, Loader2 } from "lucide-react";
import { ScrollArea } from "@/shared/components/ui/scroll-area";
import { useMintState } from "./hooks/useMintState";

interface MintPanelProps {
  currentGalleryImage?: string;
}

export default function MintPanel({ currentGalleryImage }: MintPanelProps) {
  const {
    collection,
    isConnected,
    isSameArtType,
    activeTab,
    setActiveTab,
    mintCostData,
    lastMintCost,
    nftsData,
    amount,
    showConfirmModal,
    setShowConfirmModal,
    isMintingNft,
    isLoading,
    submitMint,
  } = useMintState();

  // Check if history tab should be shown
  const hasHistoryData =
    nftsData?.getNfts?.nfts && nftsData.getNfts.nfts.length > 0;
  const shouldShowHistoryTab =
    isConnected && (hasHistoryData || activeTab === "history");

  return (
    <div className="bg-gray-50 dark:bg-[#0c0916] h-full py-5">
      <div className="max-w-4xl mx-auto p-4">
        <Tabs
          defaultValue="mint"
          className="w-full"
          onValueChange={setActiveTab}
          value={activeTab}
        >
          <TabsList
            className={`grid w-full max-w-md mx-auto bg-white border border-gray-200 dark:bg-[#1a1625] dark:border-gray-800/50 ${
              shouldShowHistoryTab ? "grid-cols-2" : "grid-cols-1"
            }`}
          >
            <TabsTrigger
              value="mint"
              className="data-[state=active]:bg-pink-500 dark:data-[state=active]:bg-pink-600 data-[state=active]:text-white text-sm"
            >
              Mint Your NFT
            </TabsTrigger>
            {shouldShowHistoryTab && (
              <TabsTrigger
                value="history"
                className="data-[state=active]:bg-pink-500 dark:data-[state=active]:bg-pink-600 data-[state=active]:text-white text-sm"
              >
                History
              </TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="mint" className="space-y-3">
            <div className="p-3 space-y-5">
              <MintStages />

              <MintForm />

              <div className="md:sticky md:bottom-4">
                <MintButton />
              </div>
            </div>
          </TabsContent>

          {shouldShowHistoryTab && (
            <TabsContent value="history" className="space-y-4">
              <div className="bg-white border-gray-200 dark:bg-[#1a1625] rounded-lg p-6 border dark:border-gray-800/50 shadow-sm">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Mint History
                </h2>

                <ScrollArea className="h-[600px]">
                  <div className="text-center py-12">
                    {!hasHistoryData ? (
                      <>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          No minted NFTs found
                        </p>
                        <Button
                          variant="outline"
                          className="mt-4 h-10 text-sm border-gray-300 dark:border-gray-800/50"
                          onClick={() => setActiveTab("mint")}
                        >
                          Mint Your First NFT
                        </Button>
                      </>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {nftsData?.getNfts?.nfts?.map(
                          (nft: {
                            id: string;
                            image?: string;
                            name?: string;
                            tokenId: string | number;
                            description?: string;
                            status?: string;
                          }) => (
                            <div
                              key={nft.id}
                              className="bg-gray-50 dark:bg-[#0f0a19] rounded-lg border border-gray-200 dark:border-gray-800/50 overflow-hidden flex flex-col"
                            >
                              <div className="relative aspect-square w-full bg-gray-100 dark:bg-gray-900/50">
                                {nft.image && (
                                  <Image
                                    src={nft.image || "/placeholder.svg"}
                                    alt={nft.name || `NFT #${nft.tokenId}`}
                                    fill
                                    className="object-cover"
                                  />
                                )}
                                <div className="absolute top-2 right-2">
                                  <span
                                    className={`px-2 py-1 text-xs rounded-full font-medium ${
                                      nft.status === "COMPLETED"
                                        ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400"
                                        : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400"
                                    }`}
                                  >
                                    {nft.status}
                                  </span>
                                </div>
                              </div>
                              <div className="p-3 flex-1">
                                <div className="flex justify-between items-start mb-1">
                                  <h3 className="font-medium text-gray-900 dark:text-white text-sm truncate">
                                    {nft.name || `NFT #${nft.tokenId}`}
                                  </h3>
                                  <span className="text-xs text-gray-500 dark:text-gray-400 ml-1 whitespace-nowrap">
                                    #{nft.tokenId}
                                  </span>
                                </div>
                                {nft.description && (
                                  <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">
                                    {nft.description}
                                  </p>
                                )}
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </div>
            </TabsContent>
          )}
        </Tabs>
      </div>

      <Dialog open={showConfirmModal} onOpenChange={setShowConfirmModal}>
        <DialogContent
          className="bg-white border-gray-200 dark:bg-[#1a1625] dark:border-gray-800/50"
          onInteractOutside={(e) => {
            e.preventDefault();
          }}
        >
          <DialogHeader>
            <DialogTitle className="text-gray-900 dark:text-white">
              Confirm Mint
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              You are about to mint{" "}
              <span className="font-medium">
                {amount} NFT{amount > 1 ? "s" : ""}
              </span>{" "}
              from
              <span className="font-medium"> {collection?.name}</span>.
            </p>
            <div className="bg-gray-50 dark:bg-[#0f0a19] p-4 rounded-md border border-gray-200 dark:border-gray-800/50">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-medium">Total Cost:</span>{" "}
                {mintCostData?.getMintCost?.success
                  ? `${mintCostData.getMintCost.totalPrice} ETH`
                  : `${lastMintCost.totalPrice} ETH`}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-medium">Estimated Gas:</span>{" "}
                {mintCostData?.getMintCost?.success
                  ? `${mintCostData.getMintCost.estimatedGas} ETH`
                  : `${lastMintCost.estimatedGas} ETH`}
              </p>
              {!isSameArtType && (
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium">Batch Mint:</span> Potentially
                  multiple NFTs if batch provided
                </p>
              )}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Please ensure your wallet has sufficient funds. This action cannot
              be undone.
            </p>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowConfirmModal(false)}
              className="border-gray-300 text-gray-700 hover:bg-gray-100 dark:border-gray-800/50 dark:text-gray-300 dark:hover:bg-gray-800/50"
            >
              Cancel
            </Button>
            <Button
              onClick={submitMint}
              disabled={isMintingNft || isLoading}
              className="bg-pink-500 hover:bg-pink-600 text-white dark:bg-pink-600 dark:hover:bg-pink-700"
            >
              {isMintingNft || isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="mr-2 h-4 w-4" />
              )}
              {isMintingNft || isLoading ? "Calculating..." : "Confirm Mint"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
