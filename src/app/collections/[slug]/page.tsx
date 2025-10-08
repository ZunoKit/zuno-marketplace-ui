import { Marketplace } from "@/modules/marketplace";
import { mockCollections, mockNFTs } from "@/shared/utils/mock/marketplace";

interface CollectionPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: CollectionPageProps) {
  const { slug } = await params;
  // In real app, fetch collection based on slug
  const collection = mockCollections[0];

  return {
    title: `${collection.name} Collection | NFT Marketplace`,
    description:
      collection.description ||
      `Browse NFTs from ${collection.name} collection`,
  };
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { slug } = await params;
  // In real app, fetch collection and its NFTs based on slug
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
      {/* Collection Header */}
      <div className="mb-8">
        <div className="relative h-48 md:h-64 rounded-xl overflow-hidden mb-6">
          <div
            className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500"
            style={{
              backgroundImage: collection.banner
                ? `url(${collection.banner})`
                : undefined,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              {collection.name}
              {collection.verified && " ✓"}
            </h1>
            <p className="text-white/80">{collection.description}</p>
          </div>
        </div>

        {/* Collection Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-card rounded-lg p-4 border">
            <p className="text-sm text-muted-foreground mb-1">Items</p>
            <p className="text-2xl font-bold">{collection.itemCount}</p>
          </div>
          <div className="bg-card rounded-lg p-4 border">
            <p className="text-sm text-muted-foreground mb-1">Owners</p>
            <p className="text-2xl font-bold">{collection.ownerCount}</p>
          </div>
          <div className="bg-card rounded-lg p-4 border">
            <p className="text-sm text-muted-foreground mb-1">Floor Price</p>
            <p className="text-2xl font-bold">{collection.floorPrice} ETH</p>
          </div>
          <div className="bg-card rounded-lg p-4 border">
            <p className="text-sm text-muted-foreground mb-1">Volume (24h)</p>
            <p className="text-2xl font-bold">{collection.volume24h} ETH</p>
          </div>
        </div>
      </div>

      {/* NFT Grid */}
      <Marketplace initialNFTs={collectionNFTs} />
    </div>
  );
}
