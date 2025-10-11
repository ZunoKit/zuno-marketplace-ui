import Script from "next/script";

interface JsonLdProps {
  data: Record<string, unknown>;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <Script
      id="json-ld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
      strategy="afterInteractive"
    />
  );
}

// Organization Schema
export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Zuno Marketplace",
    url: process.env.NEXT_PUBLIC_APP_URL || "https://zuno.io",
    logo: `${process.env.NEXT_PUBLIC_APP_URL || "https://zuno.io"}/images/logo.png`,
    description:
      "The premier marketplace for digital art, gaming items, and collectibles across multiple blockchains.",
    sameAs: [
      "https://twitter.com/nftmarketplace",
      "https://discord.gg/nftmarketplace",
      "https://instagram.com/nftmarketplace",
      "https://youtube.com/@nftmarketplace",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: "support@nftmarketplace.com",
      availableLanguage: ["English", "Vietnamese"],
    },
  };

  return <JsonLd data={data} />;
}

// WebSite Schema with SearchAction
export function WebSiteJsonLd() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://nftmarketplace.com";

  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "NFT Marketplace",
    url: baseUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}/marketplace?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return <JsonLd data={data} />;
}

// Product Schema for NFT
export function NFTJsonLd({
  name,
  description,
  image,
  price,
  currency = "ETH",
  creator,
  collection,
  tokenId,
}: {
  name: string;
  description: string;
  image: string;
  price: string;
  currency?: string;
  creator: string;
  collection: string;
  tokenId: string;
}) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://nftmarketplace.com";

  const data = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    image,
    sku: tokenId,
    brand: {
      "@type": "Brand",
      name: collection,
    },
    offers: {
      "@type": "Offer",
      price,
      priceCurrency: currency,
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Person",
        name: creator,
      },
    },
    category: "Digital Art",
    url: `${baseUrl}/nft/${tokenId}`,
  };

  return <JsonLd data={data} />;
}

// BreadcrumbList Schema
export function BreadcrumbJsonLd({ items }: { items: Array<{ name: string; url: string }> }) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://nftmarketplace.com";

  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${baseUrl}${item.url}`,
    })),
  };

  return <JsonLd data={data} />;
}

// FAQ Schema
export function FAQJsonLd({ faqs }: { faqs: Array<{ question: string; answer: string }> }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(faq => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return <JsonLd data={data} />;
}
