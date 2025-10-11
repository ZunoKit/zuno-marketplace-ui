/**
 * Smart Contract Addresses
 */

export interface ContractAddresses {
  marketplace: string;
  nftFactory: string;
  auction: string;
  launchpad: string;
}

// Mainnet contracts
export const MAINNET_CONTRACTS: Record<number, ContractAddresses> = {
  1: {
    // Ethereum
    marketplace: "0x0000000000000000000000000000000000000000",
    nftFactory: "0x0000000000000000000000000000000000000000",
    auction: "0x0000000000000000000000000000000000000000",
    launchpad: "0x0000000000000000000000000000000000000000",
  },
  137: {
    // Polygon
    marketplace: "0x0000000000000000000000000000000000000000",
    nftFactory: "0x0000000000000000000000000000000000000000",
    auction: "0x0000000000000000000000000000000000000000",
    launchpad: "0x0000000000000000000000000000000000000000",
  },
  56: {
    // BSC
    marketplace: "0x0000000000000000000000000000000000000000",
    nftFactory: "0x0000000000000000000000000000000000000000",
    auction: "0x0000000000000000000000000000000000000000",
    launchpad: "0x0000000000000000000000000000000000000000",
  },
};

// Testnet contracts
export const TESTNET_CONTRACTS: Record<number, ContractAddresses> = {
  11155111: {
    // Sepolia
    marketplace: "0x0000000000000000000000000000000000000000",
    nftFactory: "0x0000000000000000000000000000000000000000",
    auction: "0x0000000000000000000000000000000000000000",
    launchpad: "0x0000000000000000000000000000000000000000",
  },
};

export const getContractAddresses = (chainId: number): ContractAddresses => {
  return MAINNET_CONTRACTS[chainId] || TESTNET_CONTRACTS[chainId] || TESTNET_CONTRACTS[11155111];
};
