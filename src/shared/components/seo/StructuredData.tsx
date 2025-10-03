import { Collection } from "@/shared/types/collection";

interface StructuredDataProps {
  collection: Collection;
  slug: string;
}

export default function StructuredData({
  collection,
  slug,
}: StructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${process.env.NEXT_PUBLIC_APP_URL}/launch-pad/${slug}`,
    name: collection.name,
    description: collection.description,
    image: collection.bannerUrl || collection.imageUrl,
    url: `${process.env.NEXT_PUBLIC_APP_URL}/launch-pad/${slug}`,
    author: {
      "@type": "Organization",
      name: "NFT Marketplace",
      url: process.env.NEXT_PUBLIC_APP_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "NFT Marketplace",
      url: process.env.NEXT_PUBLIC_APP_URL,
    },
    dateCreated: collection.createdAt,
    dateModified: collection.updatedAt,
    genre: collection.category,
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
    offers: {
      "@type": "Offer",
      price: collection.mintPrice,
      priceCurrency: "ETH",
      availability:
        collection.status === "live"
          ? "https://schema.org/InStock"
          : "https://schema.org/PreOrder",
      validFrom: collection.mintStartDate,
      validThrough: collection.mintEndDate,
    },
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Total Supply",
        value: collection.totalSupply,
      },
      {
        "@type": "PropertyValue",
        name: "Total Minted",
        value: collection.totalMinted,
      },
      {
        "@type": "PropertyValue",
        name: "Royalty",
        value: `${(collection.royaltyBps || 0) / 100}%`,
      },
      {
        "@type": "PropertyValue",
        name: "Token Standard",
        value: collection.metadataStandard,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
