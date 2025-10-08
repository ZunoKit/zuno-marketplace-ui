"use client";

import {
  useState,
  useMemo,
  useCallback,
  Component,
  ReactNode,
  useEffect,
} from "react";
import { Button } from "@/shared/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/ui/tabs";
import { cn } from "@/shared/utils/tailwind-utils";
import ControlBar from "@/modules/marketplace/ControlBar";
import FooterBar from "@/modules/marketplace/FooterBar";
import NFTListView from "@/modules/marketplace/NFTListView";
import NFTGrid from "@/modules/marketplace/NFTGrid";
// import CartModal from "./components/cart/CartModal";
import InformationNFT from "@/modules/marketplace/InformationNFT";
import FilterSidebar from "@/modules/marketplace/FilterSidebar";
import SellerModal from "@/modules/marketplace/SellerModal";
// import { BuyerModal } from "./components/modals/BuyerModal";
import { useNFTSelection } from "@/modules/marketplace/hooks/useNFTSelection";
import { useMyItems } from "@/modules/marketplace/hooks/useMyItems";
import type { Collection } from "@/shared/utils/mock/collection";
import type { Nft } from "@/modules/marketplace/types";
import { NftStatus } from "@/modules/marketplace/types";

// Type definitions for sorting and filtering
interface SortingState {
  id: string;
  desc: boolean;
}

interface ColumnFilter {
  id: string;
  value: string;
}
import { debounce } from "lodash";
import { ChartBar, Activity, TrendingUp } from "lucide-react";

// Error Boundary để bắt lỗi trong NFTListView
class ErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError(error: Error) {
    console.error("Error in NFTListView:", error);
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <h3 className="text-lg font-medium">Something went wrong</h3>
            <p className="text-muted-foreground">
              Please try refreshing the page or contact support.
            </p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

interface ShopNFTsProps {
  contractAddress: string;
  initialCollection: Collection;
}

export default function ShopNFTs({
  contractAddress,
  initialCollection,
}: ShopNFTsProps) {
  const [collection] = useState(initialCollection);
  const [selectedNFTs, setSelectedNFTs] = useState<string[]>([]);
  // Default view based on screen size - list view for table display
  const [view, setView] = useState<"grid" | "list" | "compact">(() => {
    if (typeof window !== "undefined") {
      // Use list view for both mobile and desktop to show table
      return "list";
    }
    return "list";
  });
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0.001, 0.1]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const [myItemsCartOpen, setMyItemsCartOpen] = useState(false);
  const [myItemsListingStep, setMyItemsListingStep] = useState(0);
  const [selectedNFT, setSelectedNFT] = useState<Nft | null>(null);
  const [showBuyerModal, setShowBuyerModal] = useState(false);
  const [showSellerModal, setShowSellerModal] = useState(false);
  const [sorting, setSorting] = useState<SortingState[]>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFilter[]>([]);
  const [filteredAndSortedNFTs, setFilteredAndSortedNFTs] = useState<Nft[]>([]);

  // Mock connection status
  const isConnected = true;
  const address = "0x1234567890123456789012345678901234567890";

  const { nfts: myItemsNFTs, isLoading: myItemsLoading } = useMyItems({
    contractAddress,
    address: address || "",
    isConnected: isConnected || false,
  });

  const safeNFTs = useMemo(
    () =>
      Array.isArray(myItemsNFTs)
        ? myItemsNFTs.filter(
            (nft): nft is Nft =>
              nft != null &&
              typeof nft === "object" &&
              typeof nft.id === "string"
          )
        : [],
    [myItemsNFTs]
  );

  const searchValue = useMemo(
    () =>
      typeof columnFilters.find((f: ColumnFilter) => f.id === "item")?.value ===
      "string"
        ? (columnFilters.find((f: ColumnFilter) => f.id === "item")
            ?.value as string)
        : "",
    [columnFilters]
  );

  const sortValue = useMemo(
    () => (sorting[0]?.desc === false ? "low-to-high" : "high-to-low"),
    [sorting]
  );

  const handlePriceRangeChange = useCallback((range: [number, number]) => {
    const [min, max] = range;
    const validPriceRange: [number, number] = [
      isNaN(min) ? 0 : min,
      isNaN(max) ? Infinity : Math.max(min, max),
    ];
    setPriceRange(validPriceRange);
  }, []);

  const filterAndSortNFTs = useCallback(
    (nfts: Nft[]) => {
      return nfts
        .filter((nft) => {
          if (statusFilter === "listed" && nft.status !== NftStatus.Listed)
            return false;
          if (statusFilter === "not-listed" && nft.status === NftStatus.Listed)
            return false;

          const price = nft.mintPrice ? Number(nft.mintPrice) : 0;
          if (isNaN(price)) return false;
          if (price < priceRange[0] || price > priceRange[1]) return false;

          if (!searchValue) return true;
          const name =
            typeof nft.name === "string" ? nft.name.toLowerCase() : "";
          return name.includes(searchValue.toLowerCase());
        })
        .sort((a, b) => {
          switch (sortBy) {
            case "price-low":
              return (Number(a.mintPrice) || 0) - (Number(b.mintPrice) || 0);
            case "price-high":
              return (Number(b.mintPrice) || 0) - (Number(a.mintPrice) || 0);
            case "recent":
            default:
              if (
                a.status === NftStatus.Listed &&
                b.status !== NftStatus.Listed
              )
                return -1;
              if (
                a.status !== NftStatus.Listed &&
                b.status === NftStatus.Listed
              )
                return 1;
              return 0;
          }
        });
    },
    [searchValue, priceRange, statusFilter, sortBy]
  );

  useEffect(() => {
    const filtered = filterAndSortNFTs(safeNFTs);
    setFilteredAndSortedNFTs(filtered);
  }, [
    safeNFTs,
    statusFilter,
    sortBy,
    priceRange,
    searchValue,
    filterAndSortNFTs,
  ]);

  // Memoize onSelectedNFTsChange để ổn định tham chiếu
  const onSelectedNFTsChange = useCallback(
    (ids: Set<string>) => {
      setSelectedNFTs(Array.from(ids));
      // Cập nhật filteredAndSortedNFTs với tất cả NFT, đánh dấu selected
      const visibleNFTs = safeNFTs.map((nft) => ({
        ...nft,
        selected: ids.has(nft.id),
      }));
      const filtered = filterAndSortNFTs(visibleNFTs);
      setFilteredAndSortedNFTs(filtered);
    },
    [safeNFTs, filterAndSortNFTs]
  );

  const {
    sliderValue,
    isSliding,
    handleSliderChange,
    handleSliderDragStart,
    handleSliderDragEnd,
    handleItemCountChange,
    handleIndividualSelection,
  } = useNFTSelection({
    initialNFTs: safeNFTs,
    onVisibleNFTsChange: setFilteredAndSortedNFTs,
    onSelectedNFTsChange,
  });

  const handleRemoveItem = useCallback(
    (id: string) => {
      handleIndividualSelection(id, false);
    },
    [handleIndividualSelection]
  );

  const handleNFTSelection = useCallback(
    (id: string) => {
      handleIndividualSelection(id, !selectedNFTs.includes(id));
    },
    [handleIndividualSelection, selectedNFTs]
  );

  const handleMyItemsList = useCallback(() => {
    setMyItemsListingStep(1);
    setTimeout(() => setMyItemsListingStep(2), 1200);
    setTimeout(() => setMyItemsListingStep(3), 2600);
    setTimeout(() => {
      setMyItemsListingStep(0);
      setMyItemsCartOpen(false);
      setSelectedNFTs([]);
    }, 4000);
  }, []);

  const handleMyItemsNFTCardClick = useCallback((nft: Nft) => {
    setSelectedNFT(nft);
    setShowSellerModal(true);
  }, []);

  const debouncedSetColumnFilters = useMemo(
    () =>
      debounce((value: string) => {
        setColumnFilters([{ id: "item", value }]);
      }, 500),
    []
  );

  const debouncedSetSorting = useMemo(
    () =>
      debounce((value: string) => {
        setSorting([{ id: "mintPrice", desc: value === "high-to-low" }]);
      }, 500),
    []
  );

  useEffect(() => {
    return () => {
      debouncedSetColumnFilters.cancel();
      debouncedSetSorting.cancel();
    };
  }, [debouncedSetColumnFilters, debouncedSetSorting]);

  if (!collection) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h3 className="text-lg font-medium">No Collection Found</h3>
          <p className="text-muted-foreground">Collection not available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-foreground transition-colors duration-300">
      <main className="w-full px-0 sm:px-4 md:px-6 lg:px-8 mx-auto relative">
        <InformationNFT collection={collection} />

        <Tabs defaultValue="items">
          <div className="flex items-center justify-between border-b px-0 sm:px-4">
            <TabsList className="bg-transparent p-0 ml-2 sm:ml-0">
              <TabsTrigger
                value="items"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-2 sm:px-3"
              >
                Items
              </TabsTrigger>
              {isConnected && (
                <TabsTrigger
                  value="my-items"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-2 sm:px-3"
                >
                  My Items
                </TabsTrigger>
              )}
              <TabsTrigger
                value="offers"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-2 sm:px-3"
              >
                Offers
              </TabsTrigger>
            </TabsList>
            {/* Chart, Analytics, Activity buttons - Desktop only */}
            <div className="hidden md:flex gap-2">
              <Button variant="ghost" size="sm">
                <ChartBar className="h-4 w-4 mr-2" />
                Chart
              </Button>
              <Button variant="ghost" size="sm">
                <TrendingUp className="h-4 w-4 mr-2" />
                Analytics
              </Button>
              <Button variant="ghost" size="sm">
                <Activity className="h-4 w-4 mr-2" />
                Activity
              </Button>
            </div>
          </div>

          <TabsContent value="items" className="mt-0 px-2 sm:px-4">
            <div className="flex items-center justify-center p-12">
              <div className="text-center">
                <h3 className="text-lg font-medium">Coming Soon</h3>
                <p className="text-muted-foreground">
                  Items functionality will be available soon
                </p>
              </div>
            </div>
          </TabsContent>

          {isConnected && (
            <TabsContent value="my-items" className="mt-0 px-0">
              <div className="flex transition-all duration-300 ease-in-out">
                {/* Desktop Filter Sidebar */}
                <div
                  className={cn(
                    "hidden md:block w-0 shrink-0 transition-all duration-300 ease-in-out overflow-hidden",
                    showFilters && "w-56"
                  )}
                >
                  {showFilters && (
                    <FilterSidebar
                      onClose={() => setShowFilters(false)}
                      priceRange={priceRange}
                      onPriceRangeChange={handlePriceRangeChange}
                      onStatusChange={setStatusFilter}
                      onSortChange={setSortBy}
                      isOpen={true}
                    />
                  )}
                </div>

                {/* Mobile Filter Sheet */}
                {showFilters && (
                  <div className="md:hidden">
                    <FilterSidebar
                      onClose={() => setShowFilters(false)}
                      priceRange={priceRange}
                      onPriceRangeChange={handlePriceRangeChange}
                      onStatusChange={setStatusFilter}
                      onSortChange={setSortBy}
                      isOpen={showFilters}
                    />
                  </div>
                )}

                <div className="flex-1 transition-all duration-300 ease-in-out min-w-0">
                  <div className="flex flex-col h-[calc(100vh-200px)]">
                    <ControlBar
                      view={view}
                      setView={setView}
                      showFilters={showFilters}
                      setShowFilters={setShowFilters}
                      searchValue={searchValue}
                      onSearch={debouncedSetColumnFilters}
                      sortValue={sortValue}
                      onSort={debouncedSetSorting}
                    />

                    <div className="flex-1 min-h-[400px] md:pb-20 relative">
                      {myItemsLoading ? (
                        <div className="flex items-center justify-center h-64">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                        </div>
                      ) : filteredAndSortedNFTs.length === 0 ? (
                        <div className="flex items-center justify-center h-64">
                          <div className="text-center">
                            <h3 className="text-lg font-medium">
                              No Items Found
                            </h3>
                            <p className="text-muted-foreground">
                              Adjust your filters to see more items.
                            </p>
                          </div>
                        </div>
                      ) : view === "list" ? (
                        <ErrorBoundary>
                          <div className="absolute inset-0">
                            <NFTListView
                              type="seller"
                              nfts={filteredAndSortedNFTs}
                              sorting={sorting}
                              setSorting={setSorting}
                              columnFilters={columnFilters}
                              setColumnFilters={setColumnFilters}
                              onSelect={handleNFTSelection}
                              onCardClick={handleMyItemsNFTCardClick}
                              selectedNFTs={selectedNFTs}
                            />
                          </div>
                        </ErrorBoundary>
                      ) : (
                        <NFTGrid
                          type="seller"
                          nfts={filteredAndSortedNFTs}
                          view={view === "compact" ? "compact" : "grid"}
                          showFilters={showFilters}
                          isSliding={isSliding}
                          onSelect={handleNFTSelection}
                          onCardClick={handleMyItemsNFTCardClick}
                          selectedNFTs={selectedNFTs}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer Bar - Shows on all screen sizes */}
              <FooterBar
                itemCount={selectedNFTs.length.toString()}
                sliderValue={sliderValue}
                maxItems={safeNFTs.length}
                handleItemCountChange={handleItemCountChange}
                handleSliderChange={handleSliderChange}
                handleSliderDragStart={handleSliderDragStart}
                handleSliderDragEnd={handleSliderDragEnd}
                openCart={() => setMyItemsCartOpen(true)}
              />

              {/* <CartModal
                open={myItemsCartOpen}
                onOpenChange={setMyItemsCartOpen}
                items={safeNFTs.filter((nft) => selectedNFTs.includes(nft.id))}
                onRemoveItem={handleRemoveItem}
                onBuy={handleMyItemsList}
                type="seller"
                listingStep={myItemsListingStep}
                onClearAllItems={() => {
                  setSelectedNFTs([]);
                }}
              /> */}
            </TabsContent>
          )}

          <TabsContent value="offers" className="px-2 sm:px-4">
            <div className="flex items-center justify-center p-12">
              <div className="text-center">
                <h3 className="text-lg font-medium">No Offers Available</h3>
                <p className="text-muted-foreground">
                  There are currently no offers for this collection
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* {showBuyerModal && selectedNFT && (
        <BuyerModal
          nft={selectedNFT}
          open={showBuyerModal}
          onOpenChange={setShowBuyerModal}
        />
      )} */}
      {showSellerModal && selectedNFT && (
        <SellerModal
          nft={selectedNFT}
          open={showSellerModal}
          onOpenChange={setShowSellerModal}
        />
      )}
    </div>
  );
}
