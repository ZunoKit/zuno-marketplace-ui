"use client";
import { FormField, FormItem, FormControl, FormMessage } from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { Textarea } from "@/shared/components/ui/textarea";
import { Button } from "@/shared/components/ui/button";
import { Upload, X } from "lucide-react";
import Image from "next/image";
import { useFormContext } from "react-hook-form";
import { mockChains } from "@/shared/utils/mock/mockChain";

export function CollectionDetails() {
  const { formState, setValue } = useFormContext();

  return (
    <div className="space-y-6 bg-white dark:bg-[#0e0a1a] p-6 rounded-lg border border-gray-200 dark:border-[#3a3450]">
      <div className="space-y-6">
        {/* Chain Selection */}
        <div>
          <Label className="text-gray-900 dark:text-white">Chain</Label>
          {formState.isSubmitting ? (
            <Skeleton className="h-10 w-full mt-1" />
          ) : (
            <FormField
              name="chain"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={value => {
                      field.onChange(value);
                      setValue("chain", value);
                    }}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full bg-gray-50 dark:bg-[#1a1525] border-gray-200 dark:border-[#3a3450] text-gray-900 dark:text-white mt-2 focus-visible:ring-0 focus-visible:ring-offset-0">
                        <SelectValue>
                          {(() => {
                            const selectedChain = mockChains().find(c => c.name === field.value);

                            return selectedChain ? (
                              <div className="flex items-center gap-2">
                                <Image
                                  src={selectedChain.icon}
                                  alt={selectedChain.name}
                                  width={24}
                                  height={24}
                                />
                                {selectedChain.name}
                              </div>
                            ) : (
                              <div className="flex items-center gap-2">
                                <Image
                                  src={"/icons/sepolia.svg"}
                                  alt="Chain"
                                  width={24}
                                  height={24}
                                />
                                {field.value || "Select Chain"}
                              </div>
                            );
                          })()}
                        </SelectValue>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white dark:bg-[#1a1525] border-gray-200 dark:border-[#3a3450] text-gray-900 dark:text-white">
                      {mockChains().map(chain => (
                        <SelectItem
                          key={chain.id}
                          value={chain.name}
                          className="text-gray-900 dark:text-white focus:bg-gray-100 dark:focus:bg-[#2a2535] focus:text-gray-900 dark:focus:text-white"
                        >
                          <div className="flex items-center gap-2">
                            <Image src={chain.icon} alt={chain.name} width={24} height={24} />
                            {chain.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
          )}
        </div>

        {/* Name and Symbol */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label className="text-gray-900 dark:text-white">Name</Label>
            {formState.isSubmitting ? (
              <Skeleton className="h-10 w-full mt-1" />
            ) : (
              <FormField
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="The Pond"
                        className="bg-gray-50 dark:bg-[#1a1525] border-gray-200 dark:border-[#3a3450] text-gray-900 dark:text-white mt-2 focus-visible:ring-0 focus-visible:ring-offset-0"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            )}
          </div>
          <div>
            <Label className="text-gray-900 dark:text-white">Symbol</Label>
            {formState.isSubmitting ? (
              <Skeleton className="h-10 w-full mt-1" />
            ) : (
              <FormField
                name="symbol"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="POND"
                        className="bg-gray-50 dark:bg-[#1a1525] border-gray-200 dark:border-[#3a3450] text-gray-900 dark:text-white mt-2 focus-visible:ring-0 focus-visible:ring-offset-0"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            )}
          </div>
        </div>

        {/* Collection Image */}
        <div>
          <Label className="text-gray-900 dark:text-white">Collection Image</Label>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Image that will be shown as the main image for the collection. Recommended: 800x800px
            jpg
          </p>
          {formState.isSubmitting ? (
            <Skeleton className="h-40 w-full mt-1" />
          ) : (
            <FormField
              name="collectionImage"
              render={({ field: { onChange, value, ...field } }) => (
                <FormItem>
                  <FormControl>
                    <div className="border border-dashed border-gray-300 dark:border-[#3a3450] rounded-md p-6 flex flex-col items-center justify-center bg-gray-50 dark:bg-transparent mt-2">
                      <input
                        type="file"
                        id="collection-image"
                        className="hidden"
                        accept="image/jpeg,image/png"
                        onChange={e => {
                          const file = e.target.files?.[0];
                          onChange(file || null);
                        }}
                        {...field}
                      />

                      {value ? (
                        <div className="w-full flex flex-col items-center">
                          <div className="relative w-32 h-32 mb-2">
                            <Image
                              src={
                                value instanceof File
                                  ? URL.createObjectURL(value)
                                  : "/placeholder.svg"
                              }
                              alt="Collection preview"
                              fill
                              style={{ objectFit: "cover" }}
                              className="rounded-md"
                            />
                            <button
                              type="button"
                              className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1"
                              onClick={e => {
                                e.preventDefault();
                                onChange(null);
                                const input = document.getElementById(
                                  "collection-image"
                                ) as HTMLInputElement;
                                if (input) input.value = "";
                              }}
                            >
                              <X className="h-4 w-4 text-white" />
                            </button>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                            {value?.name}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-500">
                            {value && (value.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      ) : (
                        <>
                          <Upload className="h-6 w-6 mb-2 text-gray-400" />
                          <p className="text-sm text-center text-gray-600 dark:text-gray-400">
                            Drop your artwork here
                            <br />
                            to upload
                          </p>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="mt-4 bg-white dark:bg-[#1a1525] border-gray-200 dark:border-[#3a3450] text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-[#2a2535]"
                            onClick={e => {
                              e.preventDefault();
                              document.getElementById("collection-image")?.click();
                            }}
                          >
                            Choose Image...
                          </Button>
                        </>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
          )}
        </div>

        {/* Description */}
        <div>
          <Label className="text-gray-900 dark:text-white">Description</Label>
          {formState.isSubmitting ? (
            <Skeleton className="h-24 w-full mt-1" />
          ) : (
            <FormField
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="e.g. The Pond is the greatest collection ever made"
                      className="bg-gray-50 dark:bg-[#1a1525] border-gray-200 dark:border-[#3a3450] text-gray-900 dark:text-white min-h-24 mt-2 focus-visible:ring-0 focus-visible:ring-offset-0 resize-y"
                      style={{ whiteSpace: "pre-wrap" }}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
          )}
        </div>
      </div>
    </div>
  );
}
