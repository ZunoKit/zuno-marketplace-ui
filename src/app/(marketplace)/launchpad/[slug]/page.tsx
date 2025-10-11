import MintNFT from "@/modules/mint/mint-nft/MintNFT";
import { Metadata } from "next";
import { notFound } from "next/navigation";

import StructuredData from "@/shared/components/seo/StructuredData";
import { fetchCollectionBySlug } from "@/shared/utils/collection";
import { Collection } from "@/shared/types";

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const collection = await fetchCollectionBySlug(slug);
  try {
    if (!collection) {
      return {
        title: "Collection Not Found",
        description: "The requested NFT collection could not be found.",
        robots: {
          index: false,
          follow: false,
        },
      };
    }

    const title = `${collection.name} - NFT Collection | Mint Now`;
    const description =
      collection.description ||
      `Discover and mint unique NFTs from the ${collection.name} collection.`;
    const imageUrl =
      collection.bannerUrl || collection.imageUrl || `/api/collections/${slug}/banner`;

    return {
      title,
      description,
      keywords: [
        "NFT",
        "Non-Fungible Token",
        "Digital Art",
        "Blockchain",
        "Crypto Art",
        collection.name,
        "Mint",
        "Collection",
        "Web3",
      ],
      authors: [{ name: "NFT Marketplace" }],
      creator: "NFT Marketplace",
      publisher: "NFT Marketplace",
      formatDetection: {
        email: false,
        address: false,
        telephone: false,
      },
      metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),

      // Open Graph metadata
      openGraph: {
        title,
        description,
        url: `/launch-pad/${slug}`,
        siteName: "NFT Marketplace",
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: `${collection.name} NFT Collection`,
          },
        ],
        locale: "en_US",
        type: "website",
      },

      // Twitter Card metadata
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [imageUrl],
        creator: "@nftmarketplace",
        site: "@nftmarketplace",
      },

      // Additional metadata
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },

      // Structured data for rich snippets
      alternates: {
        canonical: `/launch-pad/${slug}`,
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);

    // Fallback metadata
    return {
      title: "NFT Collection | Mint Now",
      description: "Discover and mint unique NFTs from our exclusive collections.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }
}

export default async function MintPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // Validate slug format
  if (!slug || typeof slug !== "string") {
    notFound();
  }

  // Fetch collection data for structured data
  const collection = await fetchCollectionBySlug(slug);

  return (
    <>
      {collection && <StructuredData collection={collection as Collection} slug={slug} />}
      <MintNFT slug={slug} />
    </>
  );
}
