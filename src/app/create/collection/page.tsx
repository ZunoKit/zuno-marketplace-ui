import { CreateCollectionForm } from "@/modules/create/CreateCollectionForm";

export const metadata = {
  title: "Create Collection | NFT Marketplace",
  description: "Launch your own NFT collection with custom settings",
};

export default function CreateCollectionPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <CreateCollectionForm />
    </div>
  );
}
