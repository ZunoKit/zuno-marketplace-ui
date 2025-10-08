import { LaunchpadPage } from "@/modules/launchpad";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "NFT Launchpad - Upcoming Projects & Exclusive Mints",
  description:
    "Discover and participate in exclusive NFT project launches. Get early access to vetted collections, upcoming mints, and new NFT projects on our launchpad platform.",
  keywords: [
    "NFT launchpad",
    "upcoming NFTs",
    "exclusive mints",
    "NFT projects",
    "early access",
    "vetted collections",
  ],
};

export default function LaunchPad() {
  return <LaunchpadPage />;
}
