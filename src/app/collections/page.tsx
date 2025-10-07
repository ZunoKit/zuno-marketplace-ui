import { CollectionsList } from "@/modules/collections";

export const metadata = {
  title: "Browse Collections | NFT Marketplace",
  description: "Explore all NFT collections available on our marketplace",
};

export default function CollectionsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <CollectionsList />
    </div>
  );
}
