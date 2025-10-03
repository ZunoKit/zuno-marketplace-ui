---
name: ⚡ Phase 2 - Wallet Integration
about: Implement cryptocurrency wallet connection and management
title: "[PHASE 2] Wallet Connection & Management"
labels: "enhancement, phase-2, wallet, blockchain, high-priority"
assignees: ""
---

## 🎯 **Objective**

Implement comprehensive wallet connection system supporting multiple wallet providers and chain switching.

## 📋 **Tasks**

### **2.1 Wallet Provider Setup**

- [ ] Install wallet integration libraries:
  - [ ] `@web3modal/wagmi` for WalletConnect
  - [ ] `wagmi` for Ethereum interaction
  - [ ] `@rainbow-me/rainbowkit` (alternative)
- [ ] Configure supported wallets:
  - [ ] MetaMask
  - [ ] WalletConnect
  - [ ] Coinbase Wallet
  - [ ] Trust Wallet

### **2.2 Chain Configuration**

- [ ] Setup supported networks:
  - [ ] Ethereum Mainnet
  - [ ] Polygon
  - [ ] Sepolia (testnet)
  - [ ] Base (optional)
- [ ] Configure RPC endpoints
- [ ] Add network switching functionality
- [ ] Handle chain change events

### **2.3 Wallet Connection UI**

- [ ] Create `WalletButton` component
- [ ] Add wallet selection modal
- [ ] Show connection status
- [ ] Display wallet address (truncated)
- [ ] Add disconnect functionality
- [ ] Show network indicator

### **2.4 Wallet State Management**

- [ ] Extend `useAuthStore` with wallet state:
  - [ ] `connectedWallet: string | null`
  - [ ] `walletAddress: string | null`
  - [ ] `currentChain: Chain | null`
  - [ ] `isConnecting: boolean`
- [ ] Add wallet actions:
  - [ ] `connectWallet(provider)`
  - [ ] `disconnectWallet()`
  - [ ] `switchChain(chainId)`

### **2.5 Integration with Existing Components**

- [ ] Update `ChainMenu` to use real wallet data
- [ ] Add wallet connection to navigation
- [ ] Show wallet status in user profile
- [ ] Integrate with minting forms
- [ ] Add wallet validation to forms

## **📁 File Structure**

```
src/shared/
├── hooks/
│   ├── useWallet.ts
│   ├── useChain.ts
│   └── useBalance.ts
├── components/wallet/
│   ├── WalletButton.tsx
│   ├── WalletModal.tsx
│   ├── ChainSwitcher.tsx
│   └── WalletStatus.tsx
├── utils/
│   ├── wallet.ts
│   ├── chains.ts
│   └── constants.ts
└── types/
    └── wallet.ts
```

## **🔧 Implementation Details**

### **Wallet Hook Example**

```typescript
export const useWallet = () => {
  const { connectAsync, disconnect } = useConnect();
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();

  const connectWallet = async (connector: Connector) => {
    try {
      await connectAsync({ connector });
    } catch (error) {
      // Handle connection error
    }
  };

  return {
    address,
    isConnected,
    chain,
    connectWallet,
    disconnect,
  };
};
```

### **Chain Configuration**

```typescript
export const supportedChains = [
  {
    id: 1,
    name: "Ethereum",
    rpcUrl: "https://eth-mainnet.alchemyapi.io/v2/...",
    blockExplorer: "https://etherscan.io",
  },
  {
    id: 137,
    name: "Polygon",
    rpcUrl: "https://polygon-rpc.com",
    blockExplorer: "https://polygonscan.com",
  },
  // ... more chains
];
```

## **✅ Acceptance Criteria**

- [ ] Users can connect/disconnect wallets
- [ ] Chain switching works correctly
- [ ] Wallet state persists across page reloads
- [ ] Error handling for connection failures
- [ ] Mobile wallet support (WalletConnect)
- [ ] Security best practices implemented
- [ ] Wallet connection integrated with existing UI

## **🔗 Related Issues**

- Depends on: State Management Setup
- Blocks: Smart Contract Integration

## **⏱️ Estimated Time**

**4-6 days**

## **🏷️ Labels**

`enhancement` `phase-2` `wallet` `blockchain` `high-priority` `web3`
