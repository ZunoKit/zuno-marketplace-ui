import { Suspense } from "react";
import ChainMenu from "@/modules/chain/chain-menu/ChainMenu";
import ChainTabsSkeleton from "@/modules/chain/chain-menu/ChainMenuSke";

export default function DiscoverLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-8">
      <Suspense fallback={<ChainTabsSkeleton />}>
        <ChainMenu />
      </Suspense>
      {children}
    </div>
  );
}
