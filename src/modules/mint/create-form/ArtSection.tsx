"use client";

import type React from "react";
import { Label } from "@/shared/components/ui/label";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { Button } from "@/shared/components/ui/button";
import { Check, Link, Upload, X } from "lucide-react";
import { Input } from "@/shared/components/ui/input";
import Image from "next/image";
import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/shared/components/ui/form";
import { ArtworkMode } from "@/shared/types/mint";

export function ArtSection() {
  const { formState, setValue } = useFormContext();

  const handleArtworkModeChange = (mode: ArtworkMode) => {
    setValue("artworkMode", mode);

    if (mode === "ERC1155") {
      // Clear ERC721 related fields
      setValue("metadataBaseUrl", "");
    } else {
      // Clear ERC1155 related fields
      setValue("sameArtworkImage", null);
      // Also clear the file input
      const fileInput = document.getElementById(
        "nft-artwork"
      ) as HTMLInputElement;
      if (fileInput) {
        fileInput.value = "";
      }
    }
  };

  return (
    <div className="space-y-4 bg-white dark:bg-[#0e0a1a] p-6 rounded-lg border border-gray-200 dark:border-[#3a3450]">
      <Label className="text-gray-900 dark:text-white">NFT Art Type</Label>
      {formState.isSubmitting ? (
        <Skeleton className="h-80 w-full mt-1" />
      ) : (
        <FormField
          name="artworkMode"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <div className="flex flex-col gap-4">
                    {/* ERC1155 Option */}
                    <div
                      className={`relative flex items-start gap-4 p-4 rounded-lg border cursor-pointer transition-all ${
                        field.value === "ERC1155"
                          ? "border-gray-300 bg-gray-50 dark:border-[#3a3450] dark:bg-[#1a1525]"
                          : "border-gray-200 bg-transparent dark:border-[#1e1a2a] hover:border-gray-300 dark:hover:border-[#3a3450]"
                      }`}
                      onClick={() => {
                        handleArtworkModeChange("ERC1155");
                      }}
                    >
                      <div className="flex-shrink-0">
                        <Image
                          unoptimized
                          src="https://placehold.co/60x60"
                          alt="ERC1155 character"
                          width={60}
                          height={60}
                          className="rounded-md"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          ERC-1155 Collection
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          Everyone mints the same artwork
                        </p>
                      </div>
                      {field.value === "ERC1155" && (
                        <div className="absolute top-3 right-3 bg-green-500 rounded-full p-1">
                          <Check className="h-4 w-4 text-white" />
                        </div>
                      )}
                    </div>

                    {/* ERC721 Option */}
                    <div
                      className={`relative flex items-start gap-4 p-4 rounded-lg border cursor-pointer transition-all ${
                        field.value === "ERC721"
                          ? "border-gray-300 bg-gray-50 dark:border-[#3a3450] dark:bg-[#1a1525]"
                          : "border-gray-200 bg-transparent dark:border-[#1e1a2a] hover:border-gray-300 dark:hover:border-[#3a3450]"
                      }`}
                      onClick={() => {
                        handleArtworkModeChange("ERC721");
                      }}
                    >
                      <div className="flex-shrink-0 grid grid-cols-2 gap-1">
                        <Image
                          unoptimized
                          src="https://placehold.co/28x28"
                          alt="ERC721 character 1"
                          width={28}
                          height={28}
                          className="rounded-sm"
                        />
                        <Image
                          unoptimized
                          src="https://placehold.co/28x28"
                          alt="ERC721 character 2"
                          width={28}
                          height={28}
                          className="rounded-sm"
                        />
                        <Image
                          unoptimized
                          src="https://placehold.co/28x28"
                          alt="ERC721 character 3"
                          width={28}
                          height={28}
                          className="rounded-sm"
                        />
                        <Image
                          unoptimized
                          src="https://placehold.co/28x28"
                          alt="ERC721 character 4"
                          width={28}
                          height={28}
                          className="rounded-sm"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          ERC-721 Collection
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          Everyone mints a unique artwork from metadata
                        </p>
                      </div>
                      {field.value === "ERC721" && (
                        <div className="absolute top-3 right-3 bg-green-500 rounded-full p-1">
                          <Check className="h-4 w-4 text-white" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Panel - Upload or Metadata URL */}
                  <div className="flex flex-col">
                    {field.value === "ERC721" ? (
                      <div className="border border-dashed border-gray-300 dark:border-[#3a3450] rounded-lg p-6 flex flex-col items-center justify-center h-full bg-gray-50 dark:bg-transparent">
                        <Link className="h-10 w-10 mb-4 text-gray-400" />
                        <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                          Metadata URL
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-4">
                          Check our{" "}
                          <span className="text-blue-600 dark:text-blue-400 underline cursor-pointer">
                            step-by-step guide
                          </span>{" "}
                          on how to generate and upload your collection assets
                          and metadata.
                        </p>
                        <FormField
                          name="metadataBaseUrl"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  placeholder="https://ipfs.io/ipfs/<CID>"
                                  className="bg-white dark:bg-[#1a1525] border-gray-200 dark:border-[#3a3450] text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage className="text-red-500" />
                            </FormItem>
                          )}
                        />
                      </div>
                    ) : (
                      <div className="border border-dashed border-gray-300 dark:border-[#3a3450] rounded-lg p-6 flex flex-col items-center justify-center h-full bg-gray-50 dark:bg-transparent">
                        <FormField
                          name="sameArtworkImage"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <input
                                  type="file"
                                  id="nft-artwork"
                                  className="hidden"
                                  accept="image/jpeg,image/png"
                                  name={field.name}
                                  ref={field.ref}
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    field.onChange(file ?? null);
                                  }}
                                />
                              </FormControl>
                              <FormMessage className="text-red-500" />
                            </FormItem>
                          )}
                        />

                        <FormField
                          name="sameArtworkImage"
                          render={({ field }) => (
                            <>
                              {field.value ? (
                                <div className="w-full flex flex-col items-center">
                                  <div className="relative w-40 h-40 mb-2">
                                    <Image
                                      src={
                                        field.value instanceof File
                                          ? URL.createObjectURL(field.value)
                                          : "/placeholder.svg"
                                      }
                                      alt="Artwork preview"
                                      fill
                                      style={{ objectFit: "contain" }}
                                      className="rounded-md"
                                    />
                                    <button
                                      type="button"
                                      className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1"
                                      onClick={() => {
                                        field.onChange(null);
                                        const input = document.getElementById(
                                          "nft-artwork"
                                        ) as HTMLInputElement;
                                        if (input) input.value = "";
                                      }}
                                    >
                                      <X className="h-4 w-4 text-white" />
                                    </button>
                                  </div>
                                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                                    {field.value?.name}
                                  </p>
                                  <p className="text-xs text-gray-500 dark:text-gray-500">
                                    {field.value &&
                                      (field.value.size / 1024 / 1024).toFixed(
                                        2
                                      )}{" "}
                                    MB
                                  </p>
                                </div>
                              ) : (
                                <>
                                  <Upload className="h-10 w-10 mb-4 text-gray-400" />
                                  <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                                    Drop your artwork here to upload
                                  </h3>
                                  <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-4">
                                    File types allowed: jpg, png. Max file size:
                                    10MB
                                  </p>
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    className="bg-white dark:bg-[#1a1525] border-gray-200 dark:border-[#3a3450] text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-[#2a2535]"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      document
                                        .getElementById("nft-artwork")
                                        ?.click();
                                    }}
                                  >
                                    Choose Image...
                                  </Button>
                                </>
                              )}
                            </>
                          )}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      )}
    </div>
  );
}
