import { ChainInfo } from "@/shared/types/chain";
import { SUPPORTED_CHAINS } from "@/shared/constants/chains";

/**
 * Mock chains for development and testing
 * Uses SUPPORTED_CHAINS from constants + adds local dev chains
 */
export const mockChains = (): ChainInfo[] => [
  ...SUPPORTED_CHAINS,
  // Local development chain
  {
    id: "eip155:31337",
    family: "EVM",
    name: "Anvil (Foundry Local)",
    shortName: "ANVIL",
    vm: "EVM",
    nativeCurrency: { symbol: "ETH", decimals: 18, name: "Ether" },
    addressFormat: "EVM_HEX",
    addressRegex: "^0x[a-fA-F0-9]{40}$",
    evm: { chainId: 31337, supports1559: true },
    blockTimeSeconds: 0,
    finality: { type: "probabilistic", typicalConfirmations: 0 },
    explorers: [],
    rpcHints: { public: ["http://127.0.0.1:8545"] },
    testnets: [],
    icon: "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
    slug: "anvil",
  },
];
