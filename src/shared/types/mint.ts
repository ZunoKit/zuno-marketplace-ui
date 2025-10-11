import { z } from "zod";

// EVM chains Mint Terminal đang hỗ trợ thu phí (có thể mở rộng thêm)
export type EvmChain =
  | "base"
  | "arbitrum"
  | "polygon"
  | "bsc"
  | "sei"
  | "apechain"
  | "abstract"
  | "berachain"
  | "monad-testnet"
  | "anvil"
  | (string & {}); // forward-compatible

export const PRICE_REGEX = /^(?:0|[1-9]\d*)(?:\.\d{1,18})?$/;
export const EVM_ADDR_REGEX = /^0x[a-fA-F0-9]{40}$/;

export const ArtworkModeSchema = z.enum(["ERC721", "ERC1155"]);
export type ArtworkMode = z.infer<typeof ArtworkModeSchema>;

export const PriceSchema = z
  .string()
  .regex(PRICE_REGEX, "Giá không hợp lệ (tối đa 18 chữ số thập phân)");
export type PriceString = z.infer<typeof PriceSchema>; // ví dụ "0", "0.01" (native token của chain)

export const StageDurationSchema = z
  .object({
    days: z.number().int().min(0, "Required days must be greater than 0"),
    hours: z
      .number()
      .int()
      .min(0, "Required hours must be greater than 0")
      .max(23, "Required hours must be less than 24"),
  })
  .refine(
    duration => duration.days > 0 || duration.hours > 0,
    "Total duration must be greater than 0"
  );
export type StageDuration = z.infer<typeof StageDurationSchema>;

export const BaseStageSchema = z.object({
  price: PriceSchema.optional(), // nếu không set → dùng defaultPrice ở form
  duration: StageDurationSchema.nullable(), // public có thể null (open-ended)
});
export type BaseStage = z.infer<typeof BaseStageSchema>;

export const PresaleStageSchema = BaseStageSchema.extend({
  duration: StageDurationSchema, // bắt buộc và > 0
  allowlistAddresses: z
    .array(z.string().trim().toLowerCase().regex(EVM_ADDR_REGEX, "Invalid EVM address"))
    .min(1, "Presale requires at least 1 allowlist address")
    .max(5000, "Maximum 5000 allowlist addresses")
    .superRefine((arr, ctx) => {
      // Check for duplicate addresses
      const uniq = new Set(arr);
      if (uniq.size !== arr.length) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Allowlist addresses must be unique",
        });
      }

      // Check each address format
      arr.forEach((addr, index) => {
        if (!EVM_ADDR_REGEX.test(addr)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: [index],
            message: `Invalid EVM address: "${addr}". Must be 42 characters (0x + 40 hex characters)`,
          });
        }
      });
    }),
});

export const PublicStageSchema = BaseStageSchema.extend({
  duration: StageDurationSchema.nullable().optional(),
});
export type PresaleStage = z.infer<typeof PresaleStageSchema>;

export type PublicStage = z.infer<typeof PublicStageSchema>;

export const MintStageSchema = z.object({
  presale: PresaleStageSchema.optional(),
  public: PublicStageSchema, // bắt buộc
});
export type MintStage = z.infer<typeof MintStageSchema>;

export const IsoDate = z
  .string()
  .refine(
    s => !Number.isNaN(Date.parse(s)),
    "Time must be a valid ISO-8601 (e.g. 2025-08-20T00:00:00Z)"
  );

export const RoyaltyPercentSchema = z
  .number()
  .min(0, "royaltyPercent must be greater than 0%")
  .max(100, "royaltyPercent must be less than 100%")
  .optional();

export const EvmChainSchema = z.string().min(1); // forward-compatible (không khóa cứng danh sách)

const FileSchema = z
  // Trong trình duyệt: File tồn tại; trong SSR/test: fallback qua typeof === 'object'
  .any()
  .refine(
    f =>
      f === undefined ||
      f === null ||
      (typeof File !== "undefined" ? f instanceof File : typeof f === "object"),
    "Collection image must be a valid File"
  );

export const MintTerminalCreateFormSchema = z
  .object({
    // Required
    chain: EvmChainSchema, // ví dụ 'base'
    name: z.string().min(1, "name is required"),
    symbol: z.string().min(1, "symbol is required"),
    collectionImage: FileSchema.optional(), // khuyến nghị 800×800 .jpg
    artworkMode: ArtworkModeSchema,
    mintStartAt: IsoDate, // ISO 8601

    // Optional / tùy mode
    description: z.string().max(5000).optional(),

    // ERC1155 specific fields
    sameArtworkImage: FileSchema.optional(), // Ảnh cho ERC1155

    // ERC721 specific fields
    metadataBaseUrl: z.string().optional(), // Base URL cho metadata ERC721

    // Mint settings
    mintPrice: PriceSchema.optional(), // default "0" = FREE nếu không set
    royaltyPercent: RoyaltyPercentSchema,
    maxSupply: z
      .number()
      .int("maxSupply must be an integer")
      .positive("maxSupply must be greater than 0")
      .nullable()
      .optional(),
    mintLimitPerWallet: z
      .number()
      .int("mintLimitPerWallet must be an integer")
      .positive("mintLimitPerWallet must be greater than 0")
      .nullable()
      .optional(),

    // Stages
    stages: z.array(MintStageSchema).min(1, "At least 1 block stage (public is required)"),

    // Legal
    agreeTos: z.literal(true, {
      message: "You must agree to the Terms of Service to continue",
    }),
  })
  .superRefine((form, ctx) => {
    // --- Artwork mode ràng buộc ---
    if (form.artworkMode === "ERC1155") {
      if (!form.sameArtworkImage) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "sameArtworkImage is required when artworkMode = 'ERC1155'",
        });
      }
    }
    if (form.artworkMode === "ERC721") {
      if (!form.metadataBaseUrl) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "metadataBaseUrl is required when artworkMode = 'ERC721'",
        });
      } else if (!form.metadataBaseUrl.match(/^https?:\/\/.+/)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "metadataBaseUrl must be a valid URL when artworkMode = 'ERC721'",
        });
      }
    }

    // --- Hiện tại hỗ trợ 1 block stage (presale + public) ---
    if (form.stages.length !== 1) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Currently only support 1 block stage (presale and/or public).",
      });
      return; // các check dưới dựa trên 1 block
    }

    const stage = form.stages[0];
    // Giá hiệu lực của từng stage = stage.price ?? form.mintPrice ?? "0"
    const effPrice = (p?: string) => {
      const price = p ?? form.mintPrice ?? "0";
      return price === "" ? "0" : price;
    };
    if (!PRICE_REGEX.test(effPrice(stage.public.price))) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Public price is invalid",
      });
    }
    if (stage.presale && !PRICE_REGEX.test(effPrice(stage.presale.price))) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Presale price is invalid",
      });
    }
  });

export type MintTerminalCreateForm = z.infer<typeof MintTerminalCreateFormSchema>;
