import { NFTDetailView } from "@/modules/nft-detail";
import { generateNFTDetail } from "@/shared/utils/mock/nft-detail";
import { generateNFTJsonLd, generateBreadcrumbJsonLd } from "@/shared/utils/structured-data";
import { Metadata } from "next";

interface NFTDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: NFTDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  // In real app, fetch NFT data based on slug
  const nft = generateNFTDetail("ethereum", "0x123...", slug);

  return {
    title: `${nft.name} - Buy NFT | ${nft.collection.name} Collection`,
    description:
      nft.metadata.description ||
      `${nft.name} from ${nft.collection.name} collection. Current price: ${nft.price} ${nft.currency}. View details, make offers, and buy this unique NFT.`,
    keywords: [
      nft.name,
      nft.collection.name,
      "NFT",
      "digital art",
      "buy NFT",
      nft.blockchain.chain,
    ],
    openGraph: {
      title: nft.name,
      description: nft.metadata.description || `Unique NFT from ${nft.collection.name}`,
      images: [nft.image],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: nft.name,
      description: `${nft.price} ${nft.currency} • ${nft.collection.name}`,
      images: [nft.image],
    },
    alternates: {
      canonical: `/nft/${slug}`,
    },
  };
}

export default async function NFTDetailPage({ params }: NFTDetailPageProps) {
  const { slug } = await params;
  // In real app, parse slug and fetch NFT data
  // Slug format could be: "collection-name-token-id" or just a unique identifier
  const nft = generateNFTDetail("ethereum", "0x123...", slug);

  const jsonLd = generateNFTJsonLd({
    name: nft.name,
    description: nft.metadata.description,
    image: nft.image,
    price: nft.price,
    currency: nft.currency,
    creator: nft.owner.name,
    collection: nft.collection.name,
  });

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", url: "/" },
    { name: "Collections", url: "/collections" },
    {
      name: nft.collection.name,
      url: `/collections/${nft.collection.name.toLowerCase().replace(/\s+/g, "-")}`,
    },
    { name: nft.name, url: `/nft/${slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <NFTDetailView nft={nft} />
    </>
  );
}
