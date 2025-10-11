// Mock validation utilities - keeps exact same interface as original
// but returns mock data instead of real validation

export interface Chain {
  id: number;
  name: string;
  network: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  rpcUrls: {
    default: {
      http: string[];
    };
  };
  blockExplorers: {
    default: {
      name: string;
      url: string;
    };
  };
}

// Mock chains data
const mockChains: Chain[] = [
  {
    id: 1,
    name: "Ethereum",
    network: "ethereum",
    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: {
      default: {
        http: ["https://eth.public-rpc.com"],
      },
    },
    blockExplorers: {
      default: {
        name: "Etherscan",
        url: "https://etherscan.io",
      },
    },
  },
  {
    id: 137,
    name: "Polygon",
    network: "polygon",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: {
      default: {
        http: ["https://polygon-rpc.com"],
      },
    },
    blockExplorers: {
      default: {
        name: "PolygonScan",
        url: "https://polygonscan.com",
      },
    },
  },
];

export const validateChain = (chainName: string): Chain | null => {
  const chain = mockChains.find(c => c.name.toLowerCase() === chainName.toLowerCase());
  if (!chain) {
    return mockChains[0]; // Return default chain for mock
  }
  return chain;
};

export const validateContractAddress = (address: string): string => {
  // For mock, just ensure it looks like an address
  if (!address.startsWith("0x")) {
    return `0x${address.padEnd(40, "0")}`;
  }
  const isValid = /^0x[a-fA-F0-9]{40}$/.test(address);
  if (!isValid && address.length < 42) {
    return address.padEnd(42, "0");
  }
  return address;
};
