import CreateManageLayout from "@/modules/mint/collection-manager/CreateManageLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create or Manage NFT Collections | NFT Marketplace",
  description:
    "Create new NFT collections or manage existing ones. Build, deploy, and grow your NFT drops with our comprehensive collection management tools.",
  keywords: [
    "NFT collection",
    "create NFT",
    "manage NFT",
    "NFT drops",
    "NFT marketplace",
    "digital art",
    "blockchain",
  ],
  openGraph: {
    title: "Create or Manage NFT Collections | NFT Marketplace",
    description:
      "Create new NFT collections or manage existing ones. Build, deploy, and grow your NFT drops with our comprehensive collection management tools.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Create or Manage NFT Collections | NFT Marketplace",
    description:
      "Create new NFT collections or manage existing ones. Build, deploy, and grow your NFT drops with our comprehensive collection management tools.",
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
};

export default function CreateOrManagePage() {
  return <CreateManageLayout />;
}
