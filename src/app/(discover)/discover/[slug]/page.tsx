import React from "react";
import type { Metadata } from "next";
import { mockChains } from "@/shared/utils/mock/mockChain";
import { notFound } from "next/navigation";
import ProductDiscovery from "@/modules/product-discovery";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const supportedChains = mockChains();
  const chain = supportedChains.find(c => String(c.slug) === slug);

  if (!chain) {
    return {
      title: "Chain not found",
      robots: { index: false, follow: false },
    };
  }

  const title = `Discover on ${chain.name}`;
  const description = `Explore NFTs and collections on the ${chain.name} blockchain.`;

  return {
    title,
    description,
    alternates: { canonical: `/discover/${slug}` },
    openGraph: {
      title,
      description,
      type: "website",
      url: `/discover/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function DiscoverChainPage({ params }: PageProps) {
  const { slug } = await params;
  const supportedChains = mockChains();
  const isValidChain = supportedChains.some(chain => String(chain.slug) === slug);

  if (!isValidChain) {
    notFound();
  }

  const selectedChain = supportedChains.find(chain => String(chain.slug) === slug);

  return (
    <div>
      <ProductDiscovery />

      <div className="pt-20 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Discover on {selectedChain?.name}
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Explore NFTs and collections on the {selectedChain?.name} blockchain.
          </p>

          <div className="mt-8 p-6 bg-gray-50 dark:bg-[#1A1F2C] rounded-lg">
            <p className="text-gray-500 dark:text-gray-400">
              Content for {selectedChain?.name} will be displayed here...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
