import type { Metadata, Viewport } from "next";
import "./globals.css";
import ClientWrapper from "./_WrapperUI";
import { Toaster } from "@/shared/components/ui/sonner";
import { SpeedInsights } from "@vercel/speed-insights/next";
import {
  OrganizationJsonLd,
  WebSiteJsonLd,
} from "@/shared/components/seo/JsonLd";

import { Space_Grotesk } from "next/font/google";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "https://nftmarketplace.com"
  ),
  title: {
    default: "NFT Marketplace - Buy, Sell & Create Digital Collectibles",
    template: "%s | NFT Marketplace",
  },
  description:
    "Discover, collect, and sell extraordinary NFTs. The premier marketplace for digital art, gaming items, and collectibles across multiple blockchains.",
  keywords: [
    "NFT",
    "NFT marketplace",
    "digital art",
    "crypto art",
    "blockchain",
    "Ethereum",
    "Web3",
    "digital collectibles",
    "NFT trading",
    "mint NFT",
    "create NFT",
    "buy NFT",
    "sell NFT",
    "NFT auction",
    "crypto collectibles",
  ],
  authors: [{ name: "NFT Marketplace Team" }],
  creator: "NFT Marketplace",
  publisher: "NFT Marketplace",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "NFT Marketplace",
    title: "NFT Marketplace - Buy, Sell & Create Digital Collectibles",
    description:
      "Discover, collect, and sell extraordinary NFTs. The premier marketplace for digital art, gaming items, and collectibles.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "NFT Marketplace - Digital Collectibles Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NFT Marketplace - Buy, Sell & Create Digital Collectibles",
    description:
      "Discover, collect, and sell extraordinary NFTs on the premier Web3 marketplace.",
    images: ["/twitter-image.png"],
    creator: "@nftmarketplace",
    site: "@nftmarketplace",
  },
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
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
      "vi-VN": "/vi-VN",
    },
  },
  verification: {
    google: "google-verification-code",
    yandex: "yandex-verification-code",
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`${spaceGrotesk.className} antialiased`}>
        <OrganizationJsonLd />
        <WebSiteJsonLd />
        <ClientWrapper>{children}</ClientWrapper>
        <Toaster />
        <SpeedInsights />
      </body>
    </html>
  );
}
