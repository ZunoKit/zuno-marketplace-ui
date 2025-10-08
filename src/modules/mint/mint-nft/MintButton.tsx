"use client";

import type { ReactNode } from "react";
import { Button } from "@/shared/components/ui/button";
import {
  Loader2,
  AlertTriangle,
  Wallet,
  Sparkles,
  Package,
} from "lucide-react";
import { cn } from "@/shared/utils/tailwind-utils";
import { useMintState } from "@/modules/mint/mint-nft/hooks/useMintState";

type ButtonVariant = "default" | "destructive" | "secondary";
type ButtonConfig = {
  id?: string;
  text: string;
  disabled: boolean;
  variant?: ButtonVariant;
  icon?: ReactNode;
  onClick?: () => void;
};

export default function MintButton() {
  const {
    collection,
    isConnected,
    isSameArtType,
    isAllowlistMint,
    agreedToTerms,
    amount,
    signature,
    nonce,
    mintCostData,
    lastMintCost,
    isLoading,
    handleMintConfirm,
    // Token standard flags
    isERC1155,
    isERC721,
    SUPPORTS_BATCH,
    selectedEdition,
    mockEditions,
  } = useMintState();

  const selectedEditionData = selectedEdition
    ? mockEditions.find((e) => e.id === selectedEdition)
    : null;

  const getButtonConfig = (): ButtonConfig[] => {
    if (!collection) {
      return [
        {
          text: "Loading...",
          disabled: true,
          variant: "secondary",
          icon: <Loader2 className="mr-2 h-4 w-4 animate-spin" />,
        },
      ];
    }

    // For mock, we assume connected; otherwise show disabled connect
    if (!isConnected) {
      return [
        {
          text: "Connect Wallet",
          disabled: true,
          variant: "secondary",
          icon: <Wallet className="mr-2 h-4 w-4" />,
        },
      ];
    }

    // ERC-1155 specific validations
    if (isERC1155) {
      if (!selectedEdition) {
        return [
          {
            text: "Select an edition to continue",
            disabled: true,
            variant: "destructive",
          },
        ];
      }

      if (!selectedEditionData) {
        return [
          {
            text: "Invalid edition selected",
            disabled: true,
            variant: "destructive",
          },
        ];
      }

      if (selectedEditionData.remaining === 0) {
        return [
          {
            text: "Edition sold out",
            disabled: true,
            variant: "destructive",
            icon: <AlertTriangle className="mr-2 h-4 w-4" />,
          },
        ];
      }

      if (amount > selectedEditionData.remaining) {
        return [
          {
            text: `Only ${selectedEditionData.remaining} remaining`,
            disabled: true,
            variant: "destructive",
          },
        ];
      }
    }

    if (Number(collection.totalMinted) >= Number(collection.maxSupply)) {
      return [
        {
          text: "Sold out",
          disabled: true,
          variant: "destructive",
          icon: <AlertTriangle className="mr-2 h-4 w-4" />,
        },
      ];
    }

    if (!mintCostData?.getMintCost?.success) {
      return [
        {
          text: `Mint ${amount} NFT${amount > 1 ? "s" : ""} (Gas: ${Number(
            lastMintCost.estimatedGas
          ).toFixed(6)} ETH)`,
          disabled: true,
          variant: "secondary",
        },
      ];
    }

    if (isAllowlistMint && (!signature || !nonce)) {
      return [
        {
          text: "Provide valid signature and nonce",
          disabled: true,
          variant: "destructive",
        },
      ];
    }

    if (!agreedToTerms) {
      return [
        {
          text: "Accept terms of service",
          disabled: true,
          variant: "secondary",
        },
      ];
    }

    // Calculate price based on token standard
    const unitPrice =
      isERC1155 && selectedEditionData
        ? selectedEditionData.price
        : mintCostData?.getMintCost?.mintPrice || lastMintCost.mintPrice;

    const totalPrice = (Number(unitPrice) * amount).toFixed(4);
    const gasPrice = mintCostData?.getMintCost?.estimatedGas
      ? Number(mintCostData.getMintCost.estimatedGas).toFixed(6)
      : Number(lastMintCost.estimatedGas).toFixed(6);

    const buttons: ButtonConfig[] = [
      {
        text: isERC1155
          ? `Mint ${amount} ${selectedEditionData?.name} (${totalPrice} ETH + ${gasPrice} gas)`
          : isERC721 && SUPPORTS_BATCH && amount > 1
            ? `Batch Mint ${amount} NFTs (${totalPrice} ETH + ${gasPrice} gas)`
            : `Mint ${amount} NFT (${totalPrice} ETH + ${gasPrice} gas)`,
        disabled: isLoading,
        variant: "default",
        icon: isERC1155 ? (
          <Sparkles className="mr-2 h-4 w-4" />
        ) : isERC721 && SUPPORTS_BATCH && amount > 1 ? (
          <Package className="mr-2 h-4 w-4" />
        ) : (
          <Sparkles className="mr-2 h-4 w-4" />
        ),
        onClick: () => {
          handleMintConfirm();
        },
      },
    ];

    // Only show batch mint option for ERC-721 with unique art and batch metadata
    if (isERC721 && !isSameArtType && SUPPORTS_BATCH) {
      buttons.push({
        text: `Batch Mint 1 Unique NFTs (${totalPrice} ETH + ${gasPrice} gas)`,
        disabled: isLoading,
        variant: "default",
        icon: <Package className="mr-2 h-4 w-4" />,
        onClick: () => {
          handleMintConfirm();
        },
      });
    }

    return buttons;
  };

  return (
    <div className="flex flex-col gap-2">
      {getButtonConfig().map((config, index) => (
        <Button
          key={index}
          id={config.id}
          variant={config.variant || "default"}
          disabled={config.disabled}
          onClick={config.onClick}
          className={cn(
            "h-10 text-sm font-medium",
            config.variant === "default" &&
              "bg-pink-500 hover:bg-pink-600 text-white dark:bg-pink-600 dark:hover:bg-pink-700",
            config.variant === "destructive" &&
              "bg-red-500 hover:bg-red-600 text-white dark:bg-red-600 dark:hover:bg-red-700",
            config.variant === "secondary" &&
              "bg-gray-200 hover:bg-gray-300 text-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-300",
            config.disabled && "opacity-50 cursor-not-allowed"
          )}
        >
          {config.icon}
          {config.text}
        </Button>
      ))}
    </div>
  );
}
