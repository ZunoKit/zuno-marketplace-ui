import { NFTDetailView } from "@/modules/nft-detail";
import { generateNFTDetail } from "@/shared/utils/mock/nft-detail";

interface NFTDetailPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: NFTDetailPageProps) {
  const { slug } = await params;
  // In real app, fetch NFT data based on slug
  const nft = generateNFTDetail("ethereum", "0x123...", slug);

  return {
    title: `${nft.name} | NFT Marketplace`,
    description: nft.metadata.description || `View details for ${nft.name}`,
  };
}

export default async function NFTDetailPage({ params }: NFTDetailPageProps) {
  const { slug } = await params;
  // In real app, parse slug and fetch NFT data
  // Slug format could be: "collection-name-token-id" or just a unique identifier
  const nft = generateNFTDetail("ethereum", "0x123...", slug);

  return <NFTDetailView nft={nft} />;
}
