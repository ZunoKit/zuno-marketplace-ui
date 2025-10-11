"use client";

import { Lock } from "lucide-react";
import { cn } from "@/shared/utils/tailwind-utils";
import CountdownTimer from "@/modules/mint/mint-nft/CountdownTimer";
import { useMintState } from "@/modules/mint/mint-nft/hooks/useMintState";

const MintStages = () => {
  const { collection, mintCostData, activeStageData } = useMintState();

  const status = collection?.status || "live";
  const startDate = collection?.mintStartDate || "";
  const endDate = collection?.mintEndDate || "";
  const mintPrice = mintCostData?.getMintCost?.mintPrice || "0";
  const isPublic = activeStageData?.getActiveStage?.isPublicMint;
  console.log(collection?.status);

  return (
    <div className="space-y-4">
      <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Mint Stages</h4>
      <div
        className={cn(
          "rounded-lg py-4 px-5 transition-all duration-200 border-2 border-gray-400 dark:border-gray-500",
          status === "live" &&
            "border border-pink-400 dark:border-pink-500 bg-pink-50/50 dark:bg-pink-600/10"
        )}
      >
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            <Lock className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            <span className="text-gray-900 dark:text-white text-sm font-semibold">
              {isPublic ? "Public" : "Allowlist"}
            </span>
          </div>
          {status === "live" && endDate && (
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 text-sm rounded-full bg-pink-500 dark:bg-pink-600 text-white">
                LIVE
              </span>
              <CountdownTimer endTime={endDate} onEnd={() => {}} isLive={true} />
            </div>
          )}
          {status === "ended" && (
            <span className="text-gray-500 dark:text-gray-400 text-sm">ENDED</span>
          )}
          {status === "upcoming" && startDate && (
            <div className="flex items-center gap-2">
              <span className="text-gray-500 dark:text-gray-400 text-sm">STARTS IN</span>
              <CountdownTimer endTime={startDate} onEnd={() => {}} isLive={false} />
            </div>
          )}
        </div>
        <div className="text-gray-700 dark:text-gray-300 text-sm">Price: {mintPrice} ETH</div>
      </div>
    </div>
  );
};

export default MintStages;
