"use client";
import CollectionOverviewTabs from "@/modules/mint/mint-nft/CollectionOverviewTabs";
import { CollectionMediaShowcase } from "@/modules/mint/mint-nft/CollectionMediaShowcase";
import MintPanel from "@/modules/mint/mint-nft/MintPanel";
import ExploreCollectionButton from "@/modules/mint/mint-nft/ExploreCollectionButton";
import { useTheme } from "next-themes";
import MintNFTSkeleton from "@/modules/mint/mint-nft/MintNFTSkeleton";
import { useMintState } from "./hooks/useMintState";

type MintNFTProps = { slug: string };

export default function MintNFT({}: MintNFTProps) {
  const { theme } = useTheme();
  const { currentImage, setCurrentImage } = useMintState();

  if (false) return <MintNFTSkeleton />;

  return (
    <>
      <div className="relative">
        {currentImage && (
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${currentImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              filter: `blur(50px) brightness(${
                theme === "dark" ? "0.3" : "0.5"
              })`,
              opacity: theme === "dark" ? "0.7" : "0.5",
            }}
          />
        )}
        <div className="flex xl:flex-row items-center justify-center gap-10 flex-col mb-20">
          <CollectionMediaShowcase onImageChange={setCurrentImage} />
          <div className="flex flex-col gap-5 z-1">
            <MintPanel currentGalleryImage={currentImage} />
            <ExploreCollectionButton />
          </div>
        </div>
      </div>
      <CollectionOverviewTabs />
    </>
  );
}
