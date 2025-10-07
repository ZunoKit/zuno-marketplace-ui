export function generateNFTJsonLd(nft: {
  name: string;
  description?: string;
  image: string;
  price: string;
  currency: string;
  creator?: string;
  collection?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: nft.name,
    description: nft.description,
    image: nft.image,
    offers: {
      "@type": "Offer",
      price: nft.price,
      priceCurrency: nft.currency,
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "NFT Marketplace",
      },
    },
    creator: {
      "@type": "Person",
      name: nft.creator || "Unknown Artist",
    },
    category: "Digital Art",
    isAccessoryOrSparePartFor: {
      "@type": "Product",
      name: nft.collection || "NFT Collection",
    },
  };
}

export function generateCollectionJsonLd(collection: {
  name: string;
  description?: string;
  image?: string;
  creator: string;
  itemCount: number;
  floorPrice?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWorkSeries",
    name: collection.name,
    description: collection.description,
    image: collection.image,
    creator: {
      "@type": "Person",
      name: collection.creator,
    },
    numberOfItems: collection.itemCount,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: 4.5,
      reviewCount: Math.floor(collection.itemCount * 0.3),
    },
    offers: collection.floorPrice
      ? {
          "@type": "AggregateOffer",
          lowPrice: collection.floorPrice,
          priceCurrency: "ETH",
          offerCount: collection.itemCount,
        }
      : undefined,
  };
}

export function generateAuctionJsonLd(auction: {
  name: string;
  description?: string;
  image: string;
  currentBid: string;
  endTime: Date;
  seller: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Auction",
    name: auction.name,
    description: auction.description,
    image: auction.image,
    auctionEndDate: auction.endTime.toISOString(),
    seller: {
      "@type": "Person",
      name: auction.seller,
    },
    offers: {
      "@type": "Offer",
      price: auction.currentBid,
      priceCurrency: "ETH",
      availability: "https://schema.org/InStock",
    },
  };
}

export function generateMarketplaceJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "NFT Marketplace",
    url: process.env.NEXT_PUBLIC_APP_URL || "https://nftmarketplace.com",
    description: "The premier marketplace for digital art and collectibles",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${process.env.NEXT_PUBLIC_APP_URL}/marketplace?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
    sameAs: [
      "https://twitter.com/nftmarketplace",
      "https://discord.gg/nftmarketplace",
      "https://instagram.com/nftmarketplace",
    ],
  };
}

export function generateBreadcrumbJsonLd(
  items: Array<{ name: string; url: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${process.env.NEXT_PUBLIC_APP_URL}${item.url}`,
    })),
  };
}
