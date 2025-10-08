/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import type React from "react";
import { useState } from "react";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { cn } from "@/shared/utils/tailwind-utils";
import { CheckCircle2, Info } from "lucide-react";

import { useMintState } from "@/modules/mint/mint-nft/hooks/useMintState";
import EditionSelector from "@/modules/mint/mint-nft/EditionSelector";
import MintProgress from "@/modules/mint/mint-nft/MintProgress";
import MintAmount from "@/modules/mint/mint-nft/MintAmount";

export default function MintForm() {
  const {
    collection,
    isSameArtType,
    isAllowlistMint,
    agreedToTerms,
    setAgreedToTerms,

    // Token standard flags
    isERC1155,
    mintCostData,
    SUPPORTS_BATCH,
    selectedEdition,
    mockEditions,
  } = useMintState();

  const MINT_LIMIT = 100;
  const [amount, setAmount] = useState(1);
  const [signature, setSignature] = useState<string | undefined>();
  const [nonce, setNonce] = useState<string | undefined>();
  const validateSignature = (val: string) => /^0x[0-9a-fA-F]{130}$/.test(val);
  const validateNonce = (val: string) =>
    Number.isInteger(Number(val)) && Number(val) >= 0;

  // Get selected edition data for ERC-1155
  const selectedEditionData = selectedEdition
    ? mockEditions.find((e) => e.id === selectedEdition)
    : null;

  // Calculate max quantity for ERC-1155
  const maxQuantity =
    isERC1155 && selectedEditionData
      ? Math.min(
          selectedEditionData.remaining,
          selectedEditionData.perWalletLimit,
          10 // per-transaction limit
        )
      : SUPPORTS_BATCH
        ? MINT_LIMIT
        : 1;

  return (
    <div className="space-y-5 bg-gray-100 dark:bg-gray-900 rounded-xs p-5 ">
      {isERC1155 && <EditionSelector />}
      {isAllowlistMint && (
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <Label className="text-sm text-white flex items-center gap-1">
              Allowlist Mint Credentials{" "}
              <span className="text-pink-500">*</span>
            </Label>
            <span className="text-sm text-gray-400">Required</span>
          </div>
          <div className="space-y-2">
            <div className="relative">
              <Input
                id="signature"
                value={signature || ""}
                onChange={(e) => {
                  const value = e.target.value;
                  setSignature(value);
                  if (value && !validateSignature(value)) {
                    setSignature(undefined);
                  }
                }}
                placeholder="Signature (0x...)"
                className={cn(
                  "h-10 text-sm bg-[#0f0a19] border-gray-800/50 text-white placeholder:text-gray-600 dark:bg-[#0a0612] dark:border-gray-900/50",
                  signature &&
                    !/^0x[0-9a-fA-F]{130}$/.test(signature) &&
                    "border-red-800 focus-visible:ring-red-800"
                )}
                aria-invalid={
                  signature && !validateSignature(signature) ? "true" : "false"
                }
              />
              {signature && validateSignature(signature) && (
                <CheckCircle2 className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-500" />
              )}
            </div>
            <p className="text-sm text-gray-400">
              65-byte hex signature provided by the allowlist
            </p>
          </div>
          <div className="space-y-2">
            <div className="relative">
              <Input
                id="nonce"
                value={nonce || ""}
                onChange={(e) => {
                  const value = e.target.value;
                  setNonce(value);
                  if (value && !validateNonce(value)) {
                    setNonce(undefined);
                  }
                }}
                placeholder="Nonce"
                type="number"
                min={0}
                className={cn(
                  "h-10 text-sm bg-[#0f0a19] border-gray-800/50 text-white placeholder:text-gray-600 dark:bg-[#0a0612] dark:border-gray-900/50",
                  nonce &&
                    (!Number.isInteger(Number(nonce)) || Number(nonce) < 0) &&
                    "border-red-800 focus-visible:ring-red-800"
                )}
                aria-invalid={nonce && !validateNonce(nonce) ? "true" : "false"}
              />
              {nonce && validateNonce(nonce) && (
                <CheckCircle2 className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-500" />
              )}
            </div>
            <p className="text-sm text-gray-400">
              Nonce value provided by the allowlist
            </p>
          </div>
        </div>
      )}
      <MintProgress />

      <div className="flex items-center justify-between gap-20">
        <div className="space-y-1.5 mt-3">
          <div className="text-xl text-gray-500 dark:text-gray-400">Price</div>
          <p className="text-4xl font-bold ">
            {mintCostData?.getMintCost?.mintPrice} ETH
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Gas Fee: {mintCostData?.getMintCost?.estimatedGas} ETH
          </p>
        </div>
        <MintAmount
          amount={amount}
          setAmount={setAmount}
          maxQuantity={maxQuantity}
        />
      </div>

      <div className="flex items-start space-x-3 pt-2">
        <Checkbox
          id="terms"
          checked={agreedToTerms}
          onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
          className="data-[state=checked]:bg-pink-500 data-[state=checked]:border-pink-500 border-gray-300 dark:data-[state=checked]:bg-pink-600 dark:data-[state=checked]:border-pink-600 dark:border-gray-800/50"
          aria-label="Agree to terms of service"
        />
        <Label htmlFor="terms" className="text-sm text-gray-400 leading-tight">
          By clicking mint, you agree to the{" "}
          <a
            href="#"
            className="text-pink-400 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Terms of Service
          </a>
          .
        </Label>
      </div>
    </div>
  );
}
