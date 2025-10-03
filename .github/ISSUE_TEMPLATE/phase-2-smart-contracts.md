---
name: ⚡ Phase 2 - Smart Contract Integration
about: Connect frontend to NFT and marketplace smart contracts
title: "[PHASE 2] Smart Contract Integration"
labels: "enhancement, phase-2, smart-contracts, blockchain, high-priority"
assignees: ""
---

## 🎯 **Objective**

Integrate frontend with NFT collection, minting, and marketplace smart contracts.

## 📋 **Tasks**

### **2.1 Smart Contract Setup**

- [ ] Define contract interfaces and ABIs
- [ ] Setup contract address configuration
- [ ] Create contract instance utilities
- [ ] Add gas estimation helpers
- [ ] Configure transaction retry logic

### **2.2 NFT Collection Contracts**

- [ ] ERC721 contract integration:
  - [ ] Deploy collection
  - [ ] Mint NFTs
  - [ ] Get collection metadata
  - [ ] Transfer tokens
- [ ] ERC1155 contract integration:
  - [ ] Batch minting
  - [ ] Edition management
  - [ ] Supply tracking

### **2.3 Marketplace Contracts**

- [ ] Listing functionality:
  - [ ] Create listings
  - [ ] Update prices
  - [ ] Cancel listings
- [ ] Buying functionality:
  - [ ] Purchase NFTs
  - [ ] Handle payments
  - [ ] Transfer ownership
- [ ] Auction functionality (optional):
  - [ ] Create auctions
  - [ ] Place bids
  - [ ] End auctions

### **2.4 Minting Integration**

- [ ] Connect `CollectionForm` to deployment contracts
- [ ] Integrate `MintForm` with minting contracts
- [ ] Add transaction status tracking
- [ ] Handle minting errors and retries
- [ ] Show gas estimates

### **2.5 Contract Hooks**

- [ ] `useContract` - General contract interaction
- [ ] `useMintNFT` - NFT minting operations
- [ ] `useMarketplace` - Marketplace operations
- [ ] `useTokenInfo` - Token metadata and info
- [ ] `useTransactionStatus` - Transaction tracking

## **📁 File Structure**

```
src/shared/
├── contracts/
│   ├── abis/
│   │   ├── ERC721.json
│   │   ├── ERC1155.json
│   │   └── Marketplace.json
│   ├── addresses.ts
│   ├── types.ts
│   └── utils.ts
├── hooks/
│   ├── useContract.ts
│   ├── useMintNFT.ts
│   ├── useMarketplace.ts
│   └── useTransactionStatus.ts
└── services/
    ├── contract.service.ts
    └── transaction.service.ts
```

## **🔧 Implementation Details**

### **Contract Hook Example**

```typescript
export const useMintNFT = () => {
  const { address } = useAccount();
  const { writeAsync } = useContractWrite({
    address: NFT_CONTRACT_ADDRESS,
    abi: ERC721_ABI,
    functionName: "mint",
  });

  const mintNFT = async (to: string, tokenURI: string) => {
    try {
      const tx = await writeAsync({
        args: [to, tokenURI],
      });
      return tx;
    } catch (error) {
      throw new Error("Minting failed");
    }
  };

  return { mintNFT };
};
```

### **Transaction Status Tracking**

```typescript
export const useTransactionStatus = (hash?: string) => {
  const { data, isLoading, isError } = useWaitForTransaction({
    hash,
  });

  return {
    status: isLoading ? "pending" : data ? "success" : "idle",
    receipt: data,
    isLoading,
    isError,
  };
};
```

### **Contract Service**

```typescript
export class ContractService {
  static async deployCollection(params: DeployParams) {
    // Deploy new collection contract
  }

  static async mintNFT(params: MintParams) {
    // Mint new NFT
  }

  static async listNFT(params: ListingParams) {
    // List NFT on marketplace
  }
}
```

## **🎯 Integration Points**

- [ ] Update `CollectionForm` to deploy real contracts
- [ ] Connect `MintForm` to minting functions
- [ ] Add transaction confirmations to UI
- [ ] Show real-time contract events
- [ ] Handle transaction failures gracefully

## **✅ Acceptance Criteria**

- [ ] Can deploy NFT collections on-chain
- [ ] Minting creates real NFTs
- [ ] Marketplace operations work end-to-end
- [ ] Transaction status is tracked and displayed
- [ ] Gas estimation is accurate
- [ ] Error handling for all contract interactions
- [ ] Support for multiple contract standards

## **🔗 Related Issues**

- Depends on: Wallet Integration
- Blocks: Real-time Data Integration

## **⏱️ Estimated Time**

**5-7 days**

## **🏷️ Labels**

`enhancement` `phase-2` `smart-contracts` `blockchain` `high-priority` `web3`
