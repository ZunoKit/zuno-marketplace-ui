// Hook for managing NFT selection with slider
import { useState, useCallback, useEffect } from "react";
import { Nft } from "@/modules/marketplace/types";

interface UseNFTSelectionProps {
  initialNFTs: Nft[];
  onVisibleNFTsChange: (nfts: Nft[]) => void;
  onSelectedNFTsChange: (ids: Set<string>) => void;
}

export function useNFTSelection({
  initialNFTs,
  onVisibleNFTsChange,
  onSelectedNFTsChange,
}: UseNFTSelectionProps) {
  const [sliderValue, setSliderValue] = useState(0);
  const [isSliding, setIsSliding] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // Handle slider change
  const handleSliderChange = useCallback(
    (value: number) => {
      setSliderValue(value);

      // Select NFTs up to slider value
      const newSelectedIds = new Set<string>();
      for (let i = 0; i < Math.min(value, initialNFTs.length); i++) {
        newSelectedIds.add(initialNFTs[i].id);
      }

      setSelectedIds(newSelectedIds);
      onSelectedNFTsChange(newSelectedIds);
    },
    [initialNFTs, onSelectedNFTsChange]
  );

  // Handle slider drag start
  const handleSliderDragStart = useCallback(() => {
    setIsSliding(true);
  }, []);

  // Handle slider drag end
  const handleSliderDragEnd = useCallback(() => {
    setIsSliding(false);
  }, []);

  // Handle item count change (manual input)
  const handleItemCountChange = useCallback(
    (count: string) => {
      const numCount = parseInt(count) || 0;
      const validCount = Math.min(Math.max(0, numCount), initialNFTs.length);
      handleSliderChange(validCount);
    },
    [initialNFTs.length, handleSliderChange]
  );

  // Handle individual NFT selection
  const handleIndividualSelection = useCallback(
    (id: string, selected: boolean) => {
      const newSelectedIds = new Set(selectedIds);

      if (selected) {
        newSelectedIds.add(id);
      } else {
        newSelectedIds.delete(id);
      }

      setSelectedIds(newSelectedIds);
      onSelectedNFTsChange(newSelectedIds);

      // Update slider value based on selection count
      setSliderValue(newSelectedIds.size);
    },
    [selectedIds, onSelectedNFTsChange]
  );

  // Clear all selections
  const clearSelections = useCallback(() => {
    setSelectedIds(new Set());
    setSliderValue(0);
    onSelectedNFTsChange(new Set());
  }, [onSelectedNFTsChange]);

  // Update visible NFTs when selection changes
  useEffect(() => {
    const updatedNFTs = initialNFTs.map((nft) => ({
      ...nft,
      selected: selectedIds.has(nft.id),
    }));
    onVisibleNFTsChange(updatedNFTs);
  }, [selectedIds, initialNFTs, onVisibleNFTsChange]);

  return {
    sliderValue,
    isSliding,
    selectedIds,
    handleSliderChange,
    handleSliderDragStart,
    handleSliderDragEnd,
    handleItemCountChange,
    handleIndividualSelection,
    clearSelections,
  };
}
