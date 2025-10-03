// ---------------- mockCollection.ts ----------------
import { TokenStandard } from "@/shared/types";
import type { Collection, ChainBinding } from "@/shared/types/collection";
import { randomImage } from "@/shared/utils/mock/randomImage";

/** simple helpers */
const nowIso = () => new Date().toISOString();
const rand = (n = 8) =>
  Math.random()
    .toString(16)
    .slice(2, 2 + n);
const randInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const BASE58 = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";

/** Generate a pseudo EVM address (0x + 40 hex) */
function randomEvmAddress(): `0x${string}` {
  const hex = Array.from(
    { length: 40 },
    () => "0123456789abcdef"[randInt(0, 15)]
  ).join("");
  return ("0x" + hex) as `0x${string}`;
}

/** Generate a pseudo Solana base58 address (length ~ 44) */
function randomSolanaAddress(len = 44): string {
  return Array.from(
    { length: len },
    () => BASE58[randInt(0, BASE58.length - 1)]
  ).join("");
}

/** Options to shape the mock */
export type MockCollectionKind =
  | "ethereum"
  | "polygon"
  | "base"
  | "arbitrum"
  | "optimism"
  | "solana";

type KindSpec = {
  chainId: string; // CAIP2
  tokenStandard: TokenStandard;
  contractAddress?: `0x${string}`; // EVM
  mintAuthority?: string; // Solana
};

function kindToBinding(kind: MockCollectionKind): ChainBinding {
  switch (kind) {
    case "ethereum":
      return {
        chainId: "eip155:1",
        tokenStandard: "ERC721",
        contractAddress: randomEvmAddress(),
        isPrimary: true,
      };
    case "polygon":
      return {
        chainId: "eip155:137",
        tokenStandard: "ERC721",
        contractAddress: randomEvmAddress(),
        isPrimary: true,
      };
    case "base":
      return {
        chainId: "eip155:8453",
        tokenStandard: "ERC721",
        contractAddress: randomEvmAddress(),
        isPrimary: true,
      };
    case "arbitrum":
      return {
        chainId: "eip155:42161",
        tokenStandard: "ERC721",
        contractAddress: randomEvmAddress(),
        isPrimary: true,
      };
    case "optimism":
      return {
        chainId: "eip155:10",
        tokenStandard: "ERC721",
        contractAddress: randomEvmAddress(),
        isPrimary: true,
      };
    case "solana":
      return {
        chainId: "solana:mainnet",
        tokenStandard: "SPL",
        mintAuthority: randomSolanaAddress(44),
        isPrimary: true,
      };
  }
}

/** Build a slug-ish string */
function toSlug(name: string) {
  return (
    name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "") +
    "-" +
    rand(4)
  );
}

/** Main factory */
export function makeMockCollection(
  name = "Sample Collection",
  kind: MockCollectionKind = "ethereum",
  overrides: Partial<Collection> = {}
): Collection {
  const primary = kindToBinding(kind);

  // ~50% chance to be multi-chain (add an extra binding from a different kind)
  const maybeExtra: ChainBinding[] = (() => {
    const kinds: MockCollectionKind[] = [
      "polygon",
      "base",
      "arbitrum",
      "optimism",
      "solana",
    ];
    const extraKind = kinds.find((k) => k !== kind && Math.random() < 0.25);
    return extraKind ? [{ ...kindToBinding(extraKind), isPrimary: false }] : [];
  })();

  const slug = overrides.slug ?? toSlug(name);
  const createdAt = nowIso();

  // Generate minting data
  const now = new Date();
  const statuses: Array<"upcoming" | "live" | "ended" | "paused"> = [
    "upcoming",
    "live",
    "ended",
    "paused",
  ];
  const status = statuses[randInt(0, 3)];

  const mintStartDate = new Date(
    now.getTime() + randInt(-7, 30) * 24 * 60 * 60 * 1000
  ).toISOString();
  const mintEndDate = new Date(
    new Date(mintStartDate).getTime() + randInt(1, 14) * 24 * 60 * 60 * 1000
  ).toISOString();
  const maxSupply = randInt(1000, 10000);
  const totalMinted =
    status === "live"
      ? randInt(0, maxSupply * 0.8)
      : status === "ended"
        ? randInt(maxSupply * 0.5, maxSupply)
        : 0;

  const prices = [
    "0.05 ETH",
    "0.1 ETH",
    "0.2 ETH",
    "0.5 ETH",
    "1 ETH",
    "2 SOL",
    "5 SOL",
  ];
  const mintPrice = prices[randInt(0, prices.length - 1)];

  const base: Collection = {
    id: "col_" + rand(12),
    slug,
    name,
    description: "A mock collection for development & testing.",
    imageUrl: randomImage(),
    bannerUrl: randomImage(),
    websiteUrl: `https://example.com/${slug}`,
    socialLinks: {
      twitter: `https://x.com/${slug}`,
      discord: `https://discord.gg/${rand(6)}`,
      telegram: `https://t.me/${slug}`,
      instagram: `https://www.instagram.com/${slug}`,
      facebook: `https://www.facebook.com/${slug}`,
      youtube: `https://www.youtube.com/${slug}`,
      tiktok: `https://www.tiktok.com/${slug}`,
    },
    isVerified: Math.random() < 0.35,
    createdAt,
    updatedAt: createdAt,

    // Minting related fields
    status,
    mintStartDate,
    mintEndDate,
    publicMint:
      Math.random() < 0.7
        ? {
            startDate: mintStartDate,
            endDate: mintEndDate,
            mintPrice,
          }
        : undefined,
    totalMinted,
    maxSupply,
    mintPrice,
  };

  // shallow override; feel free to deep merge if you need
  return { ...base, ...overrides };
}

/** Convenience variants */
export const mockCollectionETH = (
  name = "ETH Legends",
  overrides: Partial<Collection> = {}
) => makeMockCollection(name, "ethereum", overrides);

export const mockCollectionPOL = (
  name = "POL Pixels",
  overrides: Partial<Collection> = {}
) => makeMockCollection(name, "polygon", overrides);

export const mockCollectionBASE = (
  name = "Base Buddies",
  overrides: Partial<Collection> = {}
) => makeMockCollection(name, "base", overrides);

export const mockCollectionARB = (
  name = "Arbi Adventurers",
  overrides: Partial<Collection> = {}
) => makeMockCollection(name, "arbitrum", overrides);

export const mockCollectionSOL = (
  name = "SOL Spirits",
  overrides: Partial<Collection> = {}
) => makeMockCollection(name, "solana", overrides);

/** Generate a list quickly */
export function makeMockCollections(
  count = 5,
  kind: MockCollectionKind = "ethereum"
): Collection[] {
  const names = [
    "Genesis Art",
    "Cyber Punks",
    "Pixel Pets",
    "Chain Explorers",
    "Meta Masters",
    "Solana Stars",
    "Base Bloom",
    "Arbi Army",
  ];
  return Array.from({ length: count }, (_, i) =>
    makeMockCollection(`${names[i % names.length]} #${i + 1}`, kind)
  );
}
