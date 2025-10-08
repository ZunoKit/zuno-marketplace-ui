export interface Wallet {
  id: string;
  name: string;
  icon: string;
  description?: string;
  supportedChains: Chain[];
  features: WalletFeature[];
  downloadUrl?: string;
  chromeExtensionUrl?: string;
  firefoxExtensionUrl?: string;
  mobileAppUrl?: {
    ios?: string;
    android?: string;
  };
  isInstalled?: boolean;
  isPopular?: boolean;
}

export interface Chain {
  id: string;
  name: string;
  icon?: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  rpcUrls: string[];
  blockExplorers?: string[];
}

export interface WalletFeature {
  name: string;
  description: string;
  icon?: string;
}

export interface WalletConnection {
  walletId: string;
  address: string;
  chainId: string;
  balance?: string;
  isConnected: boolean;
  lastConnected?: Date;
}

export type WalletCategory =
  | "popular"
  | "mobile"
  | "browser"
  | "hardware"
  | "all";
