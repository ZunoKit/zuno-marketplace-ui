/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { cn } from "@/shared/utils/tailwind-utils";
import { CheckCircle2 } from "lucide-react";

import { useMintState } from "./hooks/useMintState";
import EditionSelector from "./EditionSelector";

export default function MintInfo() {
  const {
    collection,
    isSameArtType,
    isAllowlistMint,
    agreedToTerms,
    setAgreedToTerms,

    // Token standard flags
    isERC1155,
    isERC721,
    tokenStandard,

    SUPPORTS_BATCH,
    HAS_REVEAL,
    RANDOM_ASSIGNMENT,
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
    <div className="space-y-4">
      {/* Token Standard Info */}
      <div className="p-3 bg-gray-50 dark:bg-[#0f0a19] rounded-lg border border-gray-200 dark:border-gray-800/50">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            Token Standard: {tokenStandard}
          </span>
          <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
            {tokenStandard === "ERC721" ? "ERC721" : "ERC1155"}
          </span>
        </div>
        {isERC721 && SUPPORTS_BATCH && (
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
            ERC-721A batch minting supported
          </p>
        )}
      </div>

      {isERC1155 && <EditionSelector />}

      {/* Allowlist Mint Inputs */}
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

      <div className="space-y-2">
        {/* ERC-721 without batch support - quantity fixed at 1 */}
        {isERC721 && !SUPPORTS_BATCH ? (
          <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Quantity is fixed at 1 for this ERC-721 collection
            </span>
          </div>
        ) : (
          /* Quantity stepper for ERC-1155 (mandatory) or ERC-721A (optional) */
          <div className="flex items-center gap-3">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setAmount(Math.max(1, amount - 1))}
              disabled={amount <= 1}
              className="w-10 h-10 p-0"
            >
              -
            </Button>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) =>
                setAmount(
                  Math.max(1, Math.min(maxQuantity, Number(e.target.value)))
                )
              }
              min={1}
              max={maxQuantity}
              className="h-10 text-sm bg-[#0f0a19] border-gray-800/50 text-white text-center w-20"
              aria-label="Number of NFTs to mint"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setAmount(Math.min(maxQuantity, amount + 1))}
              disabled={amount >= maxQuantity}
              className="w-10 h-10 p-0"
            >
              +
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setAmount(maxQuantity)}
              disabled={amount >= maxQuantity}
              className="text-xs px-2"
            >
              Max
            </Button>
          </div>
        )}

        <p className="text-sm text-gray-400">
          {isERC1155 && selectedEditionData ? (
            <>
              Minting {amount} of &quot;{selectedEditionData.name}&quot;
              edition.
              {selectedEditionData.remaining <
                selectedEditionData.perWalletLimit && (
                <span className="text-orange-400">
                  {" "}
                  Limited supply remaining!
                </span>
              )}
            </>
          ) : isERC721 && SUPPORTS_BATCH ? (
            <>
              Batch mint {amount} NFT{amount > 1 ? "s" : ""} in one transaction.{" "}
              {isSameArtType
                ? "All NFTs share the same metadata."
                : "Each NFT requires unique metadata (use Batch Upload for multiple NFTs)."}
            </>
          ) : (
            "Single NFT mint."
          )}
        </p>

        {/* ERC-1155 Edition not selected warning */}
        {isERC1155 && !selectedEdition && (
          <p className="text-sm text-red-400">
            Please select an edition above to continue.
          </p>
        )}
      </div>

      {/* Terms Agreement */}
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
