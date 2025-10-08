import ProductDiscovery from "@/modules/product-discovery";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home - Discover Trending NFT Collections",
  description:
    "Explore the hottest NFT collections, trending digital art, and exclusive drops. Start your NFT journey with verified collections across Ethereum, Polygon, and more.",
  keywords: [
    "trending NFTs",
    "hot NFT collections",
    "NFT drops",
    "digital art marketplace",
    "crypto collectibles",
    "NFT launchpad",
    "verified NFT collections",
  ],
  openGraph: {
    title: "NFT Marketplace - Discover Trending Digital Collectibles",
    description:
      "Join thousands of collectors trading NFTs on the premier Web3 marketplace. Exclusive drops, verified collections, and seamless multi-chain support.",
    images: [
      {
        url: "/og-home.png",
        width: 1200,
        height: 630,
        alt: "NFT Marketplace Homepage",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Discover Trending NFT Collections",
    description:
      "Explore verified NFT collections, exclusive drops, and trending digital art on our marketplace.",
    images: ["/twitter-home.png"],
  },
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <div className="">
      <ProductDiscovery />
    </div>
  );
}
