import ExistingCollections from "./ExistingCollections";
import NewCollection from "./NewCollection";

export default function CreateManageContent() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <NewCollection />
      <ExistingCollections />
    </div>
  );
}
