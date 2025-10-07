import { type Wallet, type Chain } from "@/shared/types/wallet";

// Mock chains
export const mockChains: Chain[] = [
  {
    id: "1",
    name: "Ethereum",
    icon: "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://mainnet.infura.io/v3/"],
    blockExplorers: ["https://etherscan.io"],
  },
  {
    id: "137",
    name: "Polygon",
    icon: "https://assets.coingecko.com/coins/images/4713/large/matic-token-icon.png",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: ["https://polygon-rpc.com/"],
    blockExplorers: ["https://polygonscan.com"],
  },
  {
    id: "56",
    name: "BNB Chain",
    icon: "https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png",
    nativeCurrency: {
      name: "BNB",
      symbol: "BNB",
      decimals: 18,
    },
    rpcUrls: ["https://bsc-dataseed.binance.org/"],
    blockExplorers: ["https://bscscan.com"],
  },
];

// Mock wallets
export const mockWallets: Wallet[] = [
  {
    id: "metamask",
    name: "MetaMask",
    icon: "https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg",
    description:
      "The most popular Web3 wallet with millions of users worldwide",
    supportedChains: mockChains,
    features: [
      {
        name: "Browser Extension",
        description: "Easy access from your browser",
      },
      {
        name: "Mobile App",
        description: "Take your wallet anywhere",
      },
      {
        name: "Hardware Wallet Support",
        description: "Connect Ledger and Trezor",
      },
    ],
    chromeExtensionUrl: "https://chrome.google.com/webstore/detail/metamask/",
    firefoxExtensionUrl:
      "https://addons.mozilla.org/firefox/addon/ether-metamask/",
    mobileAppUrl: {
      ios: "https://apps.apple.com/app/metamask/",
      android: "https://play.google.com/store/apps/details?id=io.metamask",
    },
    isInstalled: true,
    isPopular: true,
  },
  {
    id: "walletconnect",
    name: "WalletConnect",
    icon: "https://walletconnect.org/walletconnect-logo.svg",
    description: "Connect with 300+ wallets using QR codes or deep linking",
    supportedChains: mockChains,
    features: [
      {
        name: "Universal Protocol",
        description: "Works with any WalletConnect compatible wallet",
      },
      {
        name: "Secure Connection",
        description: "End-to-end encrypted connection",
      },
      {
        name: "Multi-Chain",
        description: "Support for multiple blockchains",
      },
    ],
    downloadUrl: "https://walletconnect.org/",
    isPopular: true,
  },
  {
    id: "coinbase",
    name: "Coinbase Wallet",
    icon: "https://avatars.githubusercontent.com/u/1885080",
    description: "Self-custody wallet from Coinbase",
    supportedChains: mockChains,
    features: [
      {
        name: "Easy Onboarding",
        description: "Simple setup for beginners",
      },
      {
        name: "DApp Browser",
        description: "Built-in DApp browser",
      },
      {
        name: "Cloud Backup",
        description: "Secure cloud backup options",
      },
    ],
    chromeExtensionUrl:
      "https://chrome.google.com/webstore/detail/coinbase-wallet/",
    mobileAppUrl: {
      ios: "https://apps.apple.com/app/coinbase-wallet/",
      android: "https://play.google.com/store/apps/details?id=org.toshi",
    },
    isPopular: true,
  },
  {
    id: "trust",
    name: "Trust Wallet",
    icon: "https://trustwallet.com/assets/images/media/assets/TWT.svg",
    description: "Binance's official decentralized wallet",
    supportedChains: mockChains,
    features: [
      {
        name: "Multi-Chain Support",
        description: "Support for 70+ blockchains",
      },
      {
        name: "Staking",
        description: "Earn rewards by staking",
      },
      {
        name: "NFT Support",
        description: "Store and view your NFTs",
      },
    ],
    mobileAppUrl: {
      ios: "https://apps.apple.com/app/trust-wallet/",
      android:
        "https://play.google.com/store/apps/details?id=com.wallet.crypto.trustapp",
    },
    isPopular: false,
  },
  {
    id: "ledger",
    name: "Ledger",
    icon: "https://www.ledger.com/wp-content/uploads/2021/11/Ledger-logo.svg",
    description: "Hardware wallet for maximum security",
    supportedChains: mockChains,
    features: [
      {
        name: "Hardware Security",
        description: "Private keys never leave the device",
      },
      {
        name: "Ledger Live",
        description: "Companion app for managing assets",
      },
      {
        name: "Wide Support",
        description: "Support for 5000+ cryptocurrencies",
      },
    ],
    downloadUrl: "https://www.ledger.com/",
    isPopular: false,
  },
];

// Mock wallet stats
export const mockWalletStats = {
  totalWallets: mockWallets.length,
  popularWallets: mockWallets.filter((w) => w.isPopular).length,
  supportedChains: mockChains.length,
};
