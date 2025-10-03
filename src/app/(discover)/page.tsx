import ProductDiscovery from "@/modules/product-discovery";

export const metadata = {
  title: "NFT Marketplace | Explore Collections Across Multiple Chains",
  description:
    "Discover, collect, and sell extraordinary NFTs across multiple blockchains",
};

export default function Home() {
  return (
    <div className="">
      <ProductDiscovery />
    </div>
  );
}
