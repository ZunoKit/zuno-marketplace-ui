import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CreateManageHeader() {
  return (
    <header className="mb-8">
      <Link
        href="/create/nft"
        className="inline-flex items-center text-gray-900 hover:text-gray-700 dark:text-white dark:hover:text-gray-300 transition-colors"
      >
        <ArrowLeft className="mr-2 h-5 w-5" />
        <span className="text-lg font-medium">Create NFT Drop</span>
      </Link>
    </header>
  );
}
