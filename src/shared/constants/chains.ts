/**
 * Blockchain Networks Configuration
 * Extended chain data using existing ChainInfo types
 */

import type { ChainInfo } from "@/shared/types/chain";

/**
 * Supported blockchain networks
 * Uses ChainInfo from shared types for consistency
 */
export const SUPPORTED_CHAINS: ChainInfo[] = [
  {
    id: "eip155:1",
    family: "EVM",
    name: "Ethereum",
    shortName: "ETH",
    vm: "EVM",
    nativeCurrency: { symbol: "ETH", decimals: 18, name: "Ether" },
    addressFormat: "EVM_HEX",
    addressRegex: "^0x[a-fA-F0-9]{40}$",
    evm: { chainId: 1, supports1559: true },
    blockTimeSeconds: 12,
    finality: { type: "probabilistic", typicalConfirmations: 64 },
    explorers: [
      {
        name: "Etherscan",
        url: "https://etherscan.io",
        txPath: "/tx/{hash}",
        addressPath: "/address/{address}",
      },
    ],
    rpcHints: {
      public: ["https://eth.llamarpc.com", "https://ethereum.publicnode.com"],
    },
    testnets: ["eip155:11155111"], // Sepolia
    icon: "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
    slug: "ethereum",
  },
  {
    id: "eip155:137",
    family: "EVM",
    name: "Polygon",
    shortName: "MATIC",
    vm: "EVM",
    nativeCurrency: { symbol: "MATIC", decimals: 18, name: "Polygon" },
    addressFormat: "EVM_HEX",
    addressRegex: "^0x[a-fA-F0-9]{40}$",
    evm: { chainId: 137, supports1559: true },
    blockTimeSeconds: 2,
    finality: { type: "probabilistic", typicalConfirmations: 128 },
    explorers: [
      {
        name: "PolygonScan",
        url: "https://polygonscan.com",
        txPath: "/tx/{hash}",
        addressPath: "/address/{address}",
      },
    ],
    rpcHints: {
      public: ["https://polygon-rpc.com", "https://polygon.llamarpc.com"],
    },
    icon: "https://assets.coingecko.com/coins/images/4713/large/polygon.png",
    slug: "polygon",
  },
  {
    id: "eip155:56",
    family: "EVM",
    name: "BNB Smart Chain",
    shortName: "BSC",
    vm: "EVM",
    nativeCurrency: { symbol: "BNB", decimals: 18, name: "BNB" },
    addressFormat: "EVM_HEX",
    addressRegex: "^0x[a-fA-F0-9]{40}$",
    evm: { chainId: 56, supports1559: false },
    blockTimeSeconds: 3,
    finality: { type: "probabilistic", typicalConfirmations: 15 },
    explorers: [
      {
        name: "BscScan",
        url: "https://bscscan.com",
        txPath: "/tx/{hash}",
        addressPath: "/address/{address}",
      },
    ],
    rpcHints: {
      public: ["https://bsc-dataseed.binance.org", "https://bsc.publicnode.com"],
    },
    icon: "https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png",
    slug: "bsc",
  },
  {
    id: "eip155:42161",
    family: "EVM",
    name: "Arbitrum One",
    shortName: "ARB",
    vm: "EVM",
    nativeCurrency: { symbol: "ETH", decimals: 18, name: "Ether" },
    addressFormat: "EVM_HEX",
    addressRegex: "^0x[a-fA-F0-9]{40}$",
    evm: { chainId: 42161, supports1559: true },
    blockTimeSeconds: 0.25,
    finality: { type: "probabilistic", typicalConfirmations: 1 },
    explorers: [
      {
        name: "Arbiscan",
        url: "https://arbiscan.io",
        txPath: "/tx/{hash}",
        addressPath: "/address/{address}",
      },
    ],
    rpcHints: {
      public: ["https://arb1.arbitrum.io/rpc", "https://arbitrum.llamarpc.com"],
    },
    icon: "https://assets.coingecko.com/coins/images/16547/large/photo_2023-03-29_21.47.00.jpeg",
    slug: "arbitrum",
  },
  {
    id: "eip155:10",
    family: "EVM",
    name: "Optimism",
    shortName: "OP",
    vm: "EVM",
    nativeCurrency: { symbol: "ETH", decimals: 18, name: "Ether" },
    addressFormat: "EVM_HEX",
    addressRegex: "^0x[a-fA-F0-9]{40}$",
    evm: { chainId: 10, supports1559: true },
    blockTimeSeconds: 2,
    finality: { type: "probabilistic", typicalConfirmations: 1 },
    explorers: [
      {
        name: "Optimistic Etherscan",
        url: "https://optimistic.etherscan.io",
        txPath: "/tx/{hash}",
        addressPath: "/address/{address}",
      },
    ],
    rpcHints: {
      public: ["https://mainnet.optimism.io", "https://optimism.llamarpc.com"],
    },
    icon: "https://assets.coingecko.com/coins/images/25244/large/Optimism.png",
    slug: "optimism",
  },
  // Testnets
  {
    id: "eip155:11155111",
    family: "EVM",
    name: "Sepolia",
    shortName: "SEP",
    vm: "EVM",
    nativeCurrency: { symbol: "SEP", decimals: 18, name: "Sepolia Ether" },
    addressFormat: "EVM_HEX",
    addressRegex: "^0x[a-fA-F0-9]{40}$",
    evm: { chainId: 11155111, supports1559: true },
    blockTimeSeconds: 12,
    finality: { type: "probabilistic", typicalConfirmations: 64 },
    explorers: [
      {
        name: "Etherscan",
        url: "https://sepolia.etherscan.io",
        txPath: "/tx/{hash}",
        addressPath: "/address/{address}",
      },
    ],
    rpcHints: {
      public: ["https://rpc.sepolia.org", "https://ethereum-sepolia.publicnode.com"],
    },
    icon: "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
    slug: "sepolia",
  },
];

/**
 * Get chain by EVM chain ID
 */
export function getChainByEvmId(chainId: number): ChainInfo | undefined {
  return SUPPORTED_CHAINS.find(chain => chain.evm?.chainId === chainId);
}

/**
 * Get chain by CAIP-2 ID
 */
export function getChainById(caip2Id: string): ChainInfo | undefined {
  return SUPPORTED_CHAINS.find(chain => chain.id === caip2Id);
}

/**
 * Get chain by slug
 */
export function getChainBySlug(slug: string): ChainInfo | undefined {
  return SUPPORTED_CHAINS.find(chain => chain.slug === slug);
}

/**
 * Default chain (Ethereum mainnet)
 */
export const DEFAULT_CHAIN = SUPPORTED_CHAINS[0]; // Ethereum

/**
 * Supported EVM chain IDs
 */
export const SUPPORTED_EVM_CHAIN_IDS = SUPPORTED_CHAINS.filter(chain => chain.evm).map(
  chain => chain.evm!.chainId
);
