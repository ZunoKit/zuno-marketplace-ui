import { Marketplace } from "@/modules/marketplace";
import { mockCollections, mockNFTs } from "@/shared/utils/mock/marketplace";

interface MarketplaceCollectionPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params,
}: MarketplaceCollectionPageProps) {
  const { slug } = await params;
  const collection =
    mockCollections.find(
      (c) => c.name.toLowerCase().replace(/\s+/g, "-") === slug
    ) || mockCollections[0];

  return {
    title: `Shop ${collection.name} NFTs | NFT Marketplace`,
    description: `Buy and sell NFTs from the ${collection.name} collection`,
  };
}

export default async function MarketplaceCollectionPage({
  params,
}: MarketplaceCollectionPageProps) {
  const { slug } = await params;

  // Find collection by slug
  const collection =
    mockCollections.find(
      (c) => c.name.toLowerCase().replace(/\s+/g, "-") === slug
    ) || mockCollections[0];

  // Filter NFTs for this collection
  const collectionNFTs = mockNFTs.filter(
    (nft) => nft.collection.address === collection.address
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">
          {collection.name} Marketplace
        </h1>
        <p className="text-muted-foreground">
          Buy and trade NFTs from this collection
        </p>
      </div>

      <Marketplace initialNFTs={collectionNFTs} />
    </div>
  );
}
