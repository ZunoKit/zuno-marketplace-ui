"use client";

import { useState } from "react";
import { Label } from "@/shared/components/ui/label";
import { Input } from "@/shared/components/ui/input";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { Button } from "@/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { HelpCircle, MoreVertical, Plus } from "lucide-react";
import { AllowlistStage } from "@/modules/mint/create-form/AllowlistStage";
import { PublicStage } from "@/modules/mint/create-form/PublicStage";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/shared/components/ui/form";
import { DateTimePicker24h } from "@/shared/components/date-time/DateTimePicker24h";
import { useFormContext } from "react-hook-form";

export function MintDetails() {
  const { formState, setValue, getValues, watch } = useFormContext();
  const [allowlistDialogOpen, setAllowlistDialogOpen] = useState(false);
  const [publicDialogOpen, setPublicDialogOpen] = useState(false);

  // Watch stages to trigger re-render when stages change
  const stages = watch("stages");

  return (
    <div className="space-y-6 bg-white dark:bg-[#0e0a1a] p-6 rounded-lg border border-gray-200 dark:border-[#3a3450]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="flex items-center gap-1">
            <Label className="text-gray-900 dark:text-white">Mint Price</Label>
          </div>
          {formState.isSubmitting ? (
            <Skeleton className="h-10 w-full mt-1" />
          ) : (
            <FormField
              name="mintPrice"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex mt-2">
                      <Input
                        placeholder="0.00"
                        className="bg-gray-50 dark:bg-[#1a1525] border-gray-200 dark:border-[#3a3450] text-gray-900 dark:text-white rounded-r-none focus-visible:ring-0 focus-visible:ring-offset-0"
                        {...field}
                      />
                      <div className="bg-gray-100 dark:bg-[#2a2535] border border-gray-200 dark:border-[#3a3450] rounded-r-md px-4 flex items-center text-gray-900 dark:text-white">
                        ETH
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
          )}
        </div>
        <div>
          <div className="flex items-center gap-1">
            <Label className="text-gray-900 dark:text-white">
              Royalty Percent
            </Label>
            <HelpCircle className="h-4 w-4 text-gray-500 dark:text-gray-500" />
          </div>
          {formState.isSubmitting ? (
            <Skeleton className="h-10 w-full mt-1" />
          ) : (
            <FormField
              name="royaltyPercent"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex mt-2">
                      <Input
                        placeholder="0"
                        type="number"
                        min="0"
                        max="100"
                        className="bg-gray-50 dark:bg-[#1a1525] border-gray-200 dark:border-[#3a3450] text-gray-900 dark:text-white rounded-r-none focus-visible:ring-0 focus-visible:ring-offset-0"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value) || 0)
                        }
                      />
                      <div className="bg-gray-100 dark:bg-[#2a2535] border border-gray-200 dark:border-[#3a3450] rounded-r-md px-4 flex items-center text-gray-900 dark:text-white">
                        %
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="flex items-center gap-1">
            <Label className="text-gray-900 dark:text-white">Max Supply</Label>
            <HelpCircle className="h-4 w-4 text-gray-500 dark:text-gray-500" />
          </div>
          {formState.isSubmitting ? (
            <Skeleton className="h-10 w-full mt-1" />
          ) : (
            <FormField
              name="maxSupply"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="1000"
                      type="number"
                      min="1"
                      className="bg-gray-50 dark:bg-[#1a1525] border-gray-200 dark:border-[#3a3450] text-gray-900 dark:text-white mt-2 focus-visible:ring-0 focus-visible:ring-offset-0"
                      {...field}
                      value={field.value || ""}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value ? parseInt(e.target.value) : null
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
          )}
        </div>
        <div>
          <div className="flex items-center gap-1">
            <Label className="text-gray-900 dark:text-white">
              Mint Limit per Wallet
            </Label>
            <HelpCircle className="h-4 w-4 text-gray-500 dark:text-gray-500" />
          </div>
          {formState.isSubmitting ? (
            <Skeleton className="h-10 w-full mt-1" />
          ) : (
            <FormField
              name="mintLimitPerWallet"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="10"
                      type="number"
                      min="1"
                      className="bg-gray-50 dark:bg-[#1a1525] border-gray-200 dark:border-[#3a3450] text-gray-900 dark:text-white mt-2 focus-visible:ring-0 focus-visible:ring-offset-0"
                      {...field}
                      value={field.value || ""}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value ? parseInt(e.target.value) : null
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
          )}
        </div>
      </div>
      <div>
        <Label className="text-gray-900 dark:text-white">
          Mint Start Date & Time
        </Label>
        {formState.isSubmitting ? (
          <Skeleton className="h-10 w-full mt-1" />
        ) : (
          <FormField
            name="mintStartAt"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <DateTimePicker24h
                    value={field.value ? new Date(field.value) : undefined}
                    onChange={(newDate) =>
                      field.onChange(newDate.toISOString())
                    }
                    className="mt-2 [&>div>button]:bg-gray-50 [&>div>button]:dark:bg-[#1a1525] [&>div>button]:border-gray-200 dark:border-[#3a3450] [&>div>button]:text-gray-900 [&>div>button]:dark:text-white [&>div>button]:focus-visible:ring-0 [&>div>button]:focus-visible:ring-offset-0 [&>div>div>div]:bg-white [&>div>div>div]:dark:bg-[#1a1525] [&>div>div>div]:border-gray-200 dark:border-[#3a3450] [&>div>div>div]:text-gray-900 [&>div>div>div]:dark:text-white"
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
        )}
      </div>
      <div>
        <Label className="text-gray-900 dark:text-white">Mint Stages</Label>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Configure your mint stages. Public stage is required.
        </p>
        {/* Show general stages validation errors */}
        {formState.errors.stages && (
          <p className="text-red-500 text-sm mt-1">
            {JSON.stringify(formState.errors.stages.message, null, 2)}
          </p>
        )}
        {formState.isSubmitting ? (
          <Skeleton className="h-40 w-full mt-1" />
        ) : (
          <div className="space-y-3 mt-2">
            {/* Show current stages from form */}
            {stages?.[0]?.presale && (
              <div
                className="border border-gray-200 dark:border-[#3a3450] rounded-md p-4 bg-gray-50 dark:bg-[#1a1525] relative cursor-pointer"
                onClick={() => setAllowlistDialogOpen(true)}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      Allowlist Stage
                    </h3>
                    <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs px-2 py-0.5 rounded">
                      {stages?.[0]?.presale?.price ||
                        getValues("mintPrice") ||
                        "0"}{" "}
                      ETH
                    </span>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-gray-400"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="bg-white dark:bg-[#1a1525] border-gray-200 dark:border-[#3a3450]"
                    >
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation();
                          setAllowlistDialogOpen(true);
                        }}
                        className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-[#2a2535] cursor-pointer"
                      >
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation();
                          // Remove presale stage
                          const currentStages = getValues("stages");
                          if (currentStages?.[0]) {
                            const { presale, ...rest } = currentStages[0];
                            setValue("stages", [rest]);
                          }
                        }}
                        className="text-red-500 hover:bg-gray-100 dark:hover:bg-[#2a2535] cursor-pointer"
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  <span>
                    {stages?.[0]?.presale?.allowlistAddresses?.length || 0}{" "}
                    addresses
                  </span>
                  {stages?.[0]?.presale?.duration && (
                    <span className="ml-4">
                      Duration: {stages?.[0]?.presale?.duration?.days || 0}d{" "}
                      {stages?.[0]?.presale?.duration?.hours || 0}h
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Public Stage - Always present */}
            <div
              className="border border-gray-200 dark:border-[#3a3450] rounded-md p-4 bg-gray-50 dark:bg-[#1a1525] relative cursor-pointer"
              onClick={() => setPublicDialogOpen(true)}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    Public Stage
                  </h3>
                  <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs px-2 py-0.5 rounded">
                    {stages?.[0]?.public?.price ||
                      getValues("mintPrice") ||
                      "0"}{" "}
                    ETH
                  </span>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-gray-400"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="bg-white dark:bg-[#1a1525] border-gray-200 dark:border-[#3a3450]"
                  >
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.stopPropagation();
                        setPublicDialogOpen(true);
                      }}
                      className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-[#2a2535] cursor-pointer"
                    >
                      Edit
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                <span>Open to everyone</span>
                {stages?.[0]?.public?.duration && (
                  <span className="ml-4">
                    Duration: {stages?.[0]?.public?.duration?.days || 0}d{" "}
                    {stages?.[0]?.public?.duration?.hours || 0}h
                  </span>
                )}
              </div>
            </div>

            {/* Add Allowlist Stage button - only show if no presale exists */}
            {!stages?.[0]?.presale && (
              <div className="border border-gray-200 dark:border-[#1a1525] rounded-md p-3 bg-gray-50 dark:bg-[#0e0a1a] flex justify-center">
                <Button
                  type="button"
                  variant="ghost"
                  className="cursor-pointer w-full text-gray-500 dark:text-gray-400 flex items-center justify-center gap-2 hover:bg-transparent hover:text-gray-600 dark:hover:text-gray-400"
                  onClick={() => {
                    // Add presale stage to the existing stages
                    if (stages?.[0]) {
                      setValue("stages", [
                        {
                          ...stages[0],
                          presale: {
                            price: undefined,
                            duration: { days: 1, hours: 0 },
                            allowlistAddresses: [],
                          },
                        },
                      ]);
                    }
                  }}
                  style={{ backgroundColor: "transparent" }}
                >
                  <Plus className="h-4 w-4" /> Add Allowlist Stage
                </Button>
              </div>
            )}
          </div>
        )}
      </div>

      <AllowlistStage
        isOpen={allowlistDialogOpen}
        onOpenChange={setAllowlistDialogOpen}
      />
      <PublicStage
        isOpen={publicDialogOpen}
        onOpenChange={setPublicDialogOpen}
      />
    </div>
  );
}
