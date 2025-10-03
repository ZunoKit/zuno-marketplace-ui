/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { Label } from "@/shared/components/ui/label";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { useFormContext } from "react-hook-form";
import { useEffect } from "react";

interface PublicStageProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PublicStage({ isOpen, onOpenChange }: PublicStageProps) {
  const { register, formState, setValue, getValues, watch } = useFormContext();
  const stages = watch("stages");
  const mintStartAt = watch("mintStartAt");

  // Watch for changes in allowlist duration to auto-update public start date display
  useEffect(() => {
    // This effect will trigger re-render when stages change
    // The DateTimePicker will automatically show the updated calculated date
  }, [stages, mintStartAt]);

  // Get current public data
  const publicData = stages?.[0]?.public || {
    price: undefined,
    duration: null,
  };

  // Calculate public stage start date based on mint start + presale duration
  const getPublicStartDate = () => {
    if (!mintStartAt) return undefined;

    const mintStart = new Date(mintStartAt);

    // If there's a presale stage, public starts after presale ends
    if (stages?.[0]?.presale?.duration) {
      const presaleDuration = stages[0].presale.duration;
      const publicStart = new Date(mintStart);
      publicStart.setDate(publicStart.getDate() + (presaleDuration.days || 0));
      publicStart.setHours(
        publicStart.getHours() + (presaleDuration.hours || 0)
      );
      return publicStart;
    }

    // If no presale, public starts at mint start time
    return mintStart;
  };

  // Calculate minimum start date for public stage
  const getMinPublicStartDate = () => {
    const now = new Date();
    const calculatedStart = getPublicStartDate();

    if (calculatedStart) {
      return new Date(
        Math.max(calculatedStart.getTime(), now.getTime() + 5 * 60 * 1000)
      );
    }

    return new Date(now.getTime() + 5 * 60 * 1000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTitle className="bg-white dark:bg-[#0e0a1a] border-gray-200 dark:border-[#3a3450] text-gray-900 dark:text-white hidden">
        Public Stage
      </DialogTitle>
      <DialogContent
        className="bg-white dark:bg-[#0e0a1a] border-gray-200 dark:border-[#3a3450] text-gray-900 dark:text-white max-w-md p-0"
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <div className="p-6 pb-0 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Public Stage
          </h2>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <Label className="text-gray-900 dark:text-white">Mint Price</Label>
            <div className="flex mt-2">
              <Input
                placeholder="0.00"
                value={publicData.price || ""}
                onChange={(e) => {
                  const newStages = [...(stages || [])];
                  if (newStages[0]) {
                    newStages[0] = {
                      ...newStages[0],
                      public: {
                        ...publicData,
                        // Never persist empty string for price
                        price: e.target.value || undefined,
                      },
                    };
                    setValue("stages", newStages);
                  }
                }}
                className="bg-gray-50 dark:bg-[#1a1525] border-gray-200 dark:border-[#3a3450] text-gray-900 dark:text-white rounded-r-none focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              <div className="bg-gray-100 dark:bg-[#2a2535] border border-gray-200 dark:border-[#3a3450] rounded-r-md px-4 flex items-center text-gray-900 dark:text-white">
                ETH
              </div>
            </div>
            {/* Show validation errors for price */}
            {formState.errors.stages &&
              Array.isArray(formState.errors.stages) &&
              formState.errors.stages[0]?.public?.price && (
                <p className="text-red-500 text-sm mt-1">
                  {formState.errors.stages[0].public?.price?.message}
                </p>
              )}
          </div>

          <div>
            <Label className="text-gray-900 dark:text-white">
              Stage Duration
            </Label>
            <div className="flex gap-2 mt-2">
              <div className="flex flex-1">
                <Input
                  placeholder="1"
                  type="number"
                  min="0"
                  value={publicData.duration?.days || ""}
                  onChange={(e) => {
                    const days = parseInt(e.target.value) || 0;
                    const newStages = [...(stages || [])];
                    if (newStages[0]) {
                      newStages[0] = {
                        ...newStages[0],
                        public: {
                          ...publicData,
                          // Keep price sanitized
                          price: publicData.price || undefined,
                          duration:
                            days === 0 && !publicData.duration?.hours
                              ? null
                              : {
                                  days,
                                  hours: publicData.duration?.hours || 0,
                                },
                        },
                      };
                      setValue("stages", newStages);
                    }
                  }}
                  className="bg-gray-50 dark:bg-[#1a1525] border-gray-200 dark:border-[#3a3450] text-gray-900 dark:text-white rounded-r-none focus-visible:ring-0 focus-visible:ring-offset-0"
                />
                <div className="bg-gray-100 dark:bg-[#2a2535] border border-gray-200 dark:border-[#3a3450] rounded-r-md px-4 flex items-center text-gray-900 dark:text-white">
                  Days
                </div>
              </div>
              <div className="flex flex-1">
                <Input
                  placeholder="0"
                  type="number"
                  min="0"
                  max="23"
                  value={publicData.duration?.hours || ""}
                  onChange={(e) => {
                    const hours = parseInt(e.target.value) || 0;
                    const newStages = [...(stages || [])];
                    if (newStages[0]) {
                      newStages[0] = {
                        ...newStages[0],
                        public: {
                          ...publicData,
                          // Keep price sanitized
                          price: publicData.price || undefined,
                          duration:
                            !publicData.duration?.days && hours === 0
                              ? null
                              : {
                                  days: publicData.duration?.days || 0,
                                  hours,
                                },
                        },
                      };
                      setValue("stages", newStages);
                    }
                  }}
                  className="bg-gray-50 dark:bg-[#1a1525] border-gray-200 dark:border-[#3a3450] text-gray-900 dark:text-white rounded-r-none focus-visible:ring-0 focus-visible:ring-offset-0"
                />
                <div className="bg-gray-100 dark:bg-[#2a2535] border border-gray-200 dark:border-[#3a3450] rounded-r-md px-4 flex items-center text-gray-900 dark:text-white">
                  Hours
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="px-0 pt-2">
            <Button
              type="button"
              onClick={() => {
                // Data is already saved in real-time via onChange handlers
                onOpenChange(false);
              }}
              className="w-full bg-pink-600 hover:bg-pink-700 text-white"
            >
              Done
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
