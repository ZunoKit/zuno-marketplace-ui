"use client";

import { Loader2 } from "lucide-react";
import { cn } from "@/shared/utils/tailwind-utils";
import { useMintState } from "@/modules/mint/mint-nft/hooks/useMintState";

// const POLL_INTERVAL = 30000; // Fallback polling every 30s if subscription fails (future use)
// const MAX_RECONNECT_ATTEMPTS = 5; // Max retry attempts (future use)

export default function MintProgress() {
  const { collection, isERC1155, selectedEdition, mockEditions } =
    useMintState();

  // For ERC-1155, show selected edition progress; for ERC-721, show collection progress
  const selectedEditionData = selectedEdition
    ? mockEditions.find((e) => e.id === selectedEdition)
    : null;

  const maxSupply =
    isERC1155 && selectedEditionData
      ? selectedEditionData.maxSupply
      : collection?.maxSupply;

  const totalMinted =
    isERC1155 && selectedEditionData
      ? selectedEditionData.maxSupply - selectedEditionData.remaining
      : collection?.totalMinted;

  const percentage = Math.min(
    (Number(totalMinted) / Number(maxSupply)) * 100,
    100
  );

  // Loading state
  if (!collection) {
    return (
      <div className="w-full" aria-live="polite">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-semibold text-gray-900 dark:text-white">
            Minted
          </span>
          <span className="text-sm font-semibold text-gray-900 dark:text-white">
            <Loader2 className="inline h-4 w-4 animate-spin" />
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-800/50 rounded-full h-2.5 animate-pulse" />
      </div>
    );
  }

  // Error or invalid data state
  if (!maxSupply) {
    return (
      <div className="text-center text-sm text-gray-600 dark:text-gray-400">
        Unable to load mint progress.
      </div>
    );
  }

  // Normal state
  return (
    <div className="w-full" aria-live="polite">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-semibold text-gray-900 dark:text-white">
          {isERC1155 && selectedEditionData
            ? `${selectedEditionData.name} Minted`
            : "Collection Minted"}
        </span>
        <span className="text-sm font-semibold text-gray-900 dark:text-white">
          {totalMinted}/{maxSupply}
          {isERC1155 && selectedEditionData && (
            <span className="text-xs text-gray-500 ml-1">
              ({selectedEditionData.remaining} left)
            </span>
          )}
        </span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-800/50 rounded-full h-2.5">
        <div
          className={cn(
            "bg-gradient-to-r from-pink-500 to-purple-500 dark:from-pink-600 dark:to-purple-600 h-2.5 rounded-full transition-all duration-300",
            percentage === 100 && "bg-green-500 dark:bg-green-600"
          )}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={percentage}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Mint progress: ${totalMinted} of ${maxSupply} (${percentage.toFixed(
            2
          )}%)`}
        />
      </div>
    </div>
  );
}
