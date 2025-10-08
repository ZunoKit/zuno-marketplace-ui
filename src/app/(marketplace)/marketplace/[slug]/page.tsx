import ShopNFTs from "@/modules/marketplace";
import { fetchCollection } from "@/shared/utils/mock/collection";
import {
  validateChain,
  validateContractAddress,
} from "@/shared/utils/validate";

interface MarketplacePageProps {
  params: Promise<{
    slug: string;
  }>;
}

async function getCollectionData(slug: string) {
  try {
    // For mock data, we'll use slug as collection identifier
    // In production, this would parse chain-contractAddress format
    const chainName = "ethereum"; // Mock chain
    const contractAddress = `0x${slug.padEnd(40, "0")}`; // Mock address from slug

    const chain = validateChain(chainName);
    const validatedAddress = validateContractAddress(contractAddress);
    const collection = await fetchCollection(
      String(chain?.id),
      validatedAddress
    );

    return {
      chain,
      validatedAddress,
      collection,
      error: null,
    };
  } catch (error) {
    return {
      chain: null,
      validatedAddress: null,
      collection: null,
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}

export async function generateMetadata({ params }: MarketplacePageProps) {
  const { slug } = await params;
  const { chain, collection, error } = await getCollectionData(slug);

  if (error || !collection) {
    return {
      title: "Collection Not Found | NFT Marketplace",
      description: error || "The requested collection does not exist",
    };
  }

  return {
    title: `${collection.name} | ${chain?.name} | NFT Marketplace`,
    description:
      collection.description ||
      `Discover, buy, and sell unique NFTs from the ${collection.name} collection on ${chain?.name} blockchain`,
    openGraph: {
      title: `${collection.name} Collection on ${chain?.name}`,
      description:
        collection.description ||
        `Explore the ${collection.name} NFT collection on ${chain?.name} blockchain`,
    },
  };
}

export default async function Page({ params }: MarketplacePageProps) {
  const { slug } = await params;
  const { validatedAddress, collection, error } = await getCollectionData(slug);

  if (error || !collection) {
    return (
      <div className="text-center p-4">
        Error: {error || "Collection not found"}
      </div>
    );
  }

  return (
    <ShopNFTs
      contractAddress={validatedAddress}
      initialCollection={collection}
    />
  );
}
