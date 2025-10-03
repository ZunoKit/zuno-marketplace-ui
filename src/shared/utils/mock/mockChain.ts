import { ChainInfo } from "@/shared/types/chain";

export const mockChains = (): ChainInfo[] => [
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
    testnets: ["eip155:11155111"], // Sepolia
    icon: "https://assets.coingecko.com/coins/images/279/large/ethereum.png?1746019748",
    slug: "ethereum",
  },
  {
    id: "eip155:31337",
    family: "EVM",
    name: "Anvil (Foundry Local)",
    shortName: "ANVIL",
    vm: "EVM",
    nativeCurrency: { symbol: "ETH", decimals: 18, name: "Ether" },
    addressFormat: "EVM_HEX",
    addressRegex: "^0x[a-fA-F0-9]{40}$",
    evm: { chainId: 31337, supports1559: true }, // <— thêm dòng này nếu thiếu
    blockTimeSeconds: 0,
    finality: { type: "probabilistic", typicalConfirmations: 0 },
    explorers: [],
    rpcHints: { public: ["http://127.0.0.1:8545"] }, // <— thêm gợi ý RPC local
    testnets: [],
    icon: "https://assets.coingecko.com/coins/images/279/large/ethereum.png?1746019748",
    slug: "anvil",
  },
];
