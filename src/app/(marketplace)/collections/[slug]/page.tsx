import Image from "next/image";
import Link from "next/link";
import { mockCollections, mockNFTs } from "@/shared/utils/mock/marketplace";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { Heart, ShoppingCart, ExternalLink } from "lucide-react";

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
    description: collection.description || `Browse NFTs from ${collection.name} collection`,
  };
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { slug } = await params;
  // In real app, fetch collection and its NFTs based on slug
  const collection =
    mockCollections.find(c => c.name.toLowerCase().replace(/\s+/g, "-") === slug) ||
    mockCollections[0];

  // Filter NFTs for this collection
  const collectionNFTs = mockNFTs.filter(nft => nft.collection.address === collection.address);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Collection Header */}
      <div className="mb-8">
        <div className="relative h-48 md:h-64 rounded-xl overflow-hidden mb-6">
          <div
            className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500"
            style={{
              backgroundImage: collection.banner ? `url(${collection.banner})` : undefined,
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
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Collection Items</h2>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Price: Low to High
            </Button>
            <Button variant="outline" size="sm">
              Filter
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {collectionNFTs.map(nft => (
            <Card key={nft.id} className="group hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <Link href={`/nft/${nft.id}`}>
                  <div className="aspect-square relative overflow-hidden rounded-t-lg">
                    <Image
                      src={nft.image}
                      alt={nft.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="bg-white/80 backdrop-blur-sm"
                        onClick={e => {
                          e.preventDefault();
                          // Handle like action
                        }}
                      >
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Link>

                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-xs text-muted-foreground">{collection.name}</p>
                      <h3 className="font-semibold">{nft.name}</h3>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      #{nft.id.slice(-4)}
                    </Badge>
                  </div>

                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-xs text-muted-foreground">Current Price</p>
                      <p className="font-bold">{nft.price} ETH</p>
                    </div>
                    <div className="flex gap-1">
                      <Button size="sm" variant="outline">
                        <ShoppingCart className="h-3 w-3 mr-1" />
                        Buy
                      </Button>
                      <Button size="icon" variant="ghost">
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {collectionNFTs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No NFTs found in this collection</p>
          </div>
        )}
      </div>
    </div>
  );
}
