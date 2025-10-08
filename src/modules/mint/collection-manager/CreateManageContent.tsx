import ExistingCollections from "@/modules/mint/collection-manager/ExistingCollections";
import NewCollection from "@/modules/mint/collection-manager/NewCollection";

export default function CreateManageContent() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <NewCollection />
      <ExistingCollections />
    </div>
  );
}
