// ---------------- mockCollection.ts ----------------
import type { Collection } from "@/shared/types/collection";
import { randomImage } from "@/shared/utils/mock/randomImage";

/** simple helpers */
const nowIso = () => new Date().toISOString();
const rand = (n = 8) =>
  Math.random()
    .toString(16)
    .slice(2, 2 + n);
const randInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

/** Options to shape the mock */
export type MockCollectionKind =
  | "ethereum"
  | "polygon"
  | "base"
  | "arbitrum"
  | "optimism"
  | "solana";

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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  kind: MockCollectionKind = "ethereum",
  overrides: Partial<Collection> = {}
): Collection {
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
