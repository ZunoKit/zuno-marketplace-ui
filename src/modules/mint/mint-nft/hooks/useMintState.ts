"use client";

import { useState, useEffect, useMemo } from "react";
import { toast } from "sonner";
import { Collection } from "@/shared/types";
import { makeMockCollection } from "@/shared/utils/mock/mockCollection";
import { randomImage } from "@/shared/utils/mock/randomImage";

export function useMintState() {
  const [collection, setCollection] = useState<Collection | null>(null);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [activeTab, setActiveTab] = useState("mint");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isMintingNft, setIsMintingNft] = useState(false);
  const [isLoading] = useState(false);
  const [currentImage, setCurrentImage] = useState<string | undefined>();
  const [amount, setAmount] = useState(1);
  // Edition selector for ERC-1155
  const [selectedEdition, setSelectedEdition] = useState<string | null>(null);
  const [signature, setSignature] = useState<string | undefined>();
  const [nonce, setNonce] = useState<string | undefined>();

  const [editionFilter, setEditionFilter] = useState<string>("");
  const [editionSortBy, setEditionSortBy] = useState<"price" | "remaining" | "newest">("price");
  const [editionViewMode, setEditionViewMode] = useState<"grid" | "list">("grid");
  // Single token standard state
  const [tokenStandard, setTokenStandard] = useState<"ERC721" | "ERC1155">("ERC1155");

  // Mock constants for demo - replace with actual data
  const SUPPORTS_BATCH = true; // ERC721A support
  const HAS_REVEAL = true;
  const RANDOM_ASSIGNMENT = true;

  useEffect(() => {
    setCollection(makeMockCollection());
  }, []);

  // Reset selected edition when switching token standards
  useEffect(() => {
    console.log("Token standard changed to:", tokenStandard);
    setSelectedEdition(null);
  }, [tokenStandard]);

  // Computed values based on token standard
  const isSameArtType = useMemo(() => tokenStandard === "ERC1155", [tokenStandard]);

  const isERC1155 = useMemo(() => tokenStandard === "ERC1155", [tokenStandard]);

  const isERC721 = useMemo(() => tokenStandard === "ERC721", [tokenStandard]);

  const isAllowlistMint = useMemo(() => {
    // Mock logic, replace with actual logic
    return activeTab === "mint" && false; // Simplified for demo
  }, [activeTab]);

  const handleMintConfirm = () => {
    setShowConfirmModal(true);
  };

  const submitMint = () => {
    setIsMintingNft(true);
    // Mock minting process
    setTimeout(() => {
      setIsMintingNft(false);
      setShowConfirmModal(false);
      toast.success("NFT minted successfully!");
    }, 2000);
  };

  const lastMintCost = {
    mintPrice: "0.01",
    estimatedGas: "0.001",
    totalPrice: "0.011",
  };

  const mintCostData = {
    getMintCost: {
      success: true,
      mintPrice: "0.01",
      estimatedGas: "0.001",
      totalPrice: "0.011",
    },
  };

  const activeStageData = {
    getActiveStage: {
      isPublicMint: true,
    },
  };

  const nftsData = {
    getNfts: {
      nfts: [],
    },
  };

  const isConnected = true;

  // Mock editions for ERC-1155 demo
  const mockEditions = [
    {
      id: "1",
      name: "Gold Edition",
      imageUrl: randomImage(),
      price: "0.05",
      remaining: 45,
      maxSupply: 100,
      perWalletLimit: 5,
    },
    {
      id: "2",
      name: "Silver Edition",
      imageUrl: randomImage(),
      price: "0.03",
      remaining: 120,
      maxSupply: 200,
      perWalletLimit: 10,
    },
    {
      id: "3",
      name: "Bronze Edition",
      imageUrl: randomImage(),
      price: "0.01",
      remaining: 300,
      maxSupply: 500,
      perWalletLimit: 20,
    },
  ];

  return {
    collection,
    agreedToTerms,
    setAgreedToTerms,

    activeTab,
    setActiveTab,
    showConfirmModal,
    setShowConfirmModal,
    isMintingNft,
    isLoading,
    currentImage,
    setCurrentImage,

    isSameArtType,
    isAllowlistMint,
    // Token standard - single source of truth
    tokenStandard,
    setTokenStandard,
    // Computed token standard flags
    isERC1155,
    isERC721,
    // Other constants
    SUPPORTS_BATCH,
    HAS_REVEAL,
    RANDOM_ASSIGNMENT,
    // Edition selector
    selectedEdition,
    setSelectedEdition,

    mockEditions,
    // Handlers

    handleMintConfirm,
    submitMint,
    lastMintCost,
    mintCostData,
    activeStageData,
    nftsData,
    isConnected,
    amount,
    setAmount,
    signature,
    setSignature,
    nonce,
    setNonce,
    editionFilter,
    setEditionFilter,
    editionSortBy,
    setEditionSortBy,
    editionViewMode,
    setEditionViewMode,
  };
}
