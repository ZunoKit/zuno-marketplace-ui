import { useState, useEffect } from "react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Collection } from "@/shared/types";
import { makeMockCollection } from "@/shared/utils/mock/mockCollection";

export default function ExploreCollectionButton() {
  const [collection, setCollection] = useState<Collection | null>(null);
  useEffect(() => {
    setCollection(makeMockCollection());
  }, []);
  return (
    <div className="w-full bg-gray-50 dark:bg-[#0c0916] p-3 rounded-xs">
      <Link
        href={`/marketplace/${collection?.slug}`}
        className="flex items-center justify-center gap-2 p-2 w-full rounded-xs bg-gray-200 hover:bg-gray-300 text-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-300 text-sm"
      >
        <p>Explore Collection</p>
        <ExternalLink className="w-3 h-3" />
      </Link>
    </div>
  );
}
