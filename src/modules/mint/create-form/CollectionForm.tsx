"use client";

import { Button } from "@/shared/components/ui/button";
import { Form } from "@/shared/components/ui/form";
import { RotateCcw } from "lucide-react";
import { CollectionDetails } from "@/modules/mint/create-form/CollectionDetails";
import { ArtSection } from "@/modules/mint/create-form/ArtSection";
import { MintDetails } from "@/modules/mint/create-form/MintDetails";
import { CollectionProcess } from "@/modules/mint/create-form/CollectionProcess";
import { useForm } from "react-hook-form";
import {
  MintTerminalCreateForm,
  MintTerminalCreateFormSchema,
} from "@/shared/types/mint";
import { zodResolver } from "@hookform/resolvers/zod";

export default function CollectionForm() {
  const form = useForm<MintTerminalCreateForm>({
    resolver: zodResolver(MintTerminalCreateFormSchema),
    mode: "onChange", // Trigger validation on change
    defaultValues: {
      chain: "sepolia", // Set a default chain instead of empty string
      name: "",
      symbol: "",
      collectionImage: undefined, // Don't set to null, let it be undefined
      artworkMode: "ERC721", // Default to ERC721
      mintStartAt: new Date(Date.now()).toISOString(), // 5 minutes from now
      description: "",
      sameArtworkImage: undefined, // Don't set to null, let it be undefined
      metadataBaseUrl: "", // Empty string is fine for ERC721 artwork mode
      mintPrice: "0",
      royaltyPercent: 0,
      maxSupply: null,
      mintLimitPerWallet: null,
      stages: [
        {
          public: {
            price: "0",
            duration: null,
          },
        },
      ],
      agreeTos: true,
    },
  });

  const handleClearForm = () => {
    form.reset();
  };

  const onSubmit = (data: MintTerminalCreateForm) => {
    const { success, error } = MintTerminalCreateFormSchema.safeParse(data);
    if (!success) {
      console.log(error);
      return;
    }
    console.log(data);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-end mb-2">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={handleClearForm}
          className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
        >
          <RotateCcw className="h-4 w-4 mr-1" /> Clear Form
        </Button>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <CollectionDetails />
          <ArtSection />
          <MintDetails />

          {/* Terms of Service */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="agreeTos"
              {...form.register("agreeTos")}
              className="rounded border-gray-300 dark:border-gray-600"
            />
            <label
              htmlFor="agreeTos"
              className="text-sm text-gray-900 dark:text-white"
            >
              I agree to the Terms of Service
            </label>
          </div>
          {form.formState.errors.agreeTos && (
            <p className="text-red-500 text-sm">
              {form.formState.errors.agreeTos.message}
            </p>
          )}

          <Button
            type="submit"
            className="w-full bg-pink-600 hover:bg-pink-700 text-white"
            disabled={form.formState.isSubmitting || !form.formState.isValid}
          >
            {form.formState.isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </Form>
      <CollectionProcess
        isOpen={false}
        onOpenChange={() => {}}
        step1Status={"pending"}
        step2Status={"pending"}
      />
    </div>
  );
}
