import { CAIP2, ISODate, ChainFamily } from "./primitives";

/** ===== Phân loại chain ===== */
export type VMKind =
  | "EVM"
  | "SVM" // Solana Virtual Machine
  | "MOVE" // Aptos/Sui
  | "BITCOIN_SCRIPT"
  | "COSMWASM"
  | "TVM" // Tron
  | "OTHER";

export type AddressFormat =
  | "EVM_HEX" // 0x + 40 hex
  | "BASE58" // generic base58
  | "SOLANA_BASE58" // base58 (32–44 chars)
  | "BECH32" // bc1..., cosmos1..., etc.
  | "ED25519_PUBKEY"
  | "OTHER";

/** ===== Đơn vị tiền tệ gốc trên chain ===== */
export interface NativeCurrency {
  symbol: string; // ETH, SOL, BTC, POL, OP...
  decimals: number; // 18 (EVM), 9 (SOL), 8 (BTC), ...
  name?: string; // Ether, Solana, Bitcoin...
}

/** ===== Explorer / RPC ===== */
export interface Explorer {
  name: string;
  url: string; // https://etherscan.io
  txPath?: string; // /tx/{hash}
  addressPath?: string; // /address/{address}
  blockPath?: string; // /block/{height}
}

export interface RpcHints {
  public?: string[]; // endpoint public (nếu có)
  notes?: string[]; // lưu ý dùng RPC
}

/** ===== Thông tin chain cốt lõi ===== */
export interface ChainInfo {
  id: CAIP2; // CAIP-2
  family: ChainFamily; // EVM, SOLANA, ...
  name: string; // Ethereum, Solana, ...
  shortName?: string; // ETH, SOL, BTC, ...
  vm: VMKind; // EVM, SVM, MOVE, ...
  nativeCurrency: NativeCurrency;
  icon: string;
  slug: string;

  // Định danh/format địa chỉ
  addressFormat: AddressFormat;
  addressRegex?: string; // pattern validate ở runtime

  // EVM-only mở rộng
  evm?: {
    chainId: number; // EIP-155 (vd 1, 137, 8453)
    supports1559?: boolean; // fee market EIP-1559
  };

  // Thông số mạng (tuỳ chọn)
  blockTimeSeconds?: number; // ~12 (ETH), ~0.4 (SOL)...
  finality?: {
    type: "probabilistic" | "deterministic";
    typicalConfirmations?: number; // EVM/Bitcoin
    slotCommitment?: number; // Solana, nếu dùng
  };

  explorers?: Explorer[];
  rpcHints?: RpcHints;

  // Liên quan network
  testnets?: CAIP2[]; // danh sách CAIP-2 của testnet
  createdAt?: ISODate;
  updatedAt?: ISODate;
}

export const isEvmChain = (
  c: ChainInfo
): c is ChainInfo & { evm: { chainId: number } } =>
  c.family === "EVM" && !!c.evm;
