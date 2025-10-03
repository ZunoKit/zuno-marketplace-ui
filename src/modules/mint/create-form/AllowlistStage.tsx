"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { Label } from "@/shared/components/ui/label";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import { Button } from "@/shared/components/ui/button";
import { useFormContext } from "react-hook-form";
import React, { useEffect, useState } from "react";

const MAX_WALLET_LENGTH = 42; // EVM address length

interface AllowlistStageProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AllowlistStage({ isOpen, onOpenChange }: AllowlistStageProps) {
  const { setValue, watch } = useFormContext();
  const stages = watch("stages");
  const mintStartAt = watch("mintStartAt");
  const [allowlistText, setAllowlistText] = useState("");

  useEffect(() => {
    setAllowlistText((presaleData.allowlistAddresses || []).join("\n"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);
  // Get current presale data (avoid empty-string price)
  const presaleData = stages?.[0]?.presale || {
    price: undefined,
    duration: { days: 1, hours: 0 },
    allowlistAddresses: [],
  };

  // Set default mintStartAt if not set
  React.useEffect(() => {
    if (!mintStartAt) {
      const defaultDate = new Date(Date.now() + 5 * 60 * 1000);
      setValue("mintStartAt", defaultDate.toISOString());
    }
  }, [mintStartAt, setValue]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTitle className="bg-white dark:bg-[#0e0a1a] border-gray-200 dark:border-[#3a3450] text-gray-900 dark:text-white hidden">
        Allowlist Stage
      </DialogTitle>
      <DialogContent
        className="bg-white dark:bg-[#0e0a1a] border-gray-200 dark:border-[#3a3450] text-gray-900 dark:text-white max-w-md p-0"
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <div className="p-6 pb-0 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Allowlist Stage
          </h2>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <Label className="text-gray-900 dark:text-white">Mint Price</Label>
            <div className="flex mt-2">
              <Input
                placeholder="0.00"
                value={presaleData.price || ""}
                onChange={(e) => {
                  const newStages = [...(stages || [])];
                  if (newStages[0]) {
                    newStages[0] = {
                      ...newStages[0],
                      presale: {
                        ...presaleData,
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
                  value={presaleData.duration?.days || ""}
                  onChange={(e) => {
                    const days = parseInt(e.target.value) || 0;
                    const newStages = [...(stages || [])];
                    if (newStages[0]) {
                      newStages[0] = {
                        ...newStages[0],
                        presale: {
                          ...presaleData,
                          // Keep price sanitized
                          price: presaleData.price || undefined,
                          duration: {
                            ...presaleData.duration,
                            days,
                          },
                        },
                      };
                      setValue("stages", newStages);

                      // Force re-render to update public start date display
                      setTimeout(() => {
                        setValue("stages", [...newStages]);
                      }, 0);
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
                  value={presaleData.duration?.hours || ""}
                  onChange={(e) => {
                    const hours = parseInt(e.target.value) || 0;
                    const newStages = [...(stages || [])];
                    if (newStages[0]) {
                      newStages[0] = {
                        ...newStages[0],
                        presale: {
                          ...presaleData,
                          // Keep price sanitized
                          price: presaleData.price || undefined,
                          duration: {
                            ...presaleData.duration,
                            hours,
                          },
                        },
                      };
                      setValue("stages", newStages);

                      // Force re-render to update public start date display
                      setTimeout(() => {
                        setValue("stages", [...newStages]);
                      }, 0);
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

          <div>
            <Label className="text-gray-900 dark:text-white">
              Wallets (one per line)
            </Label>
            <Textarea
              value={allowlistText}
              onChange={(e) => {
                const text = e.target.value;
                setAllowlistText(text);
                const newWallets = text
                  .split(/\r?\n/)
                  .map((w) => w.trim())
                  .filter(Boolean)
                  .map((w) =>
                    w.length > MAX_WALLET_LENGTH
                      ? w.slice(0, MAX_WALLET_LENGTH)
                      : w
                  );

                const newStages = [...(stages || [])];
                if (newStages[0]) {
                  newStages[0] = {
                    ...newStages[0],
                    presale: {
                      ...presaleData,
                      price: presaleData.price || undefined,
                      allowlistAddresses: newWallets,
                    },
                  };
                  setValue("stages", newStages);
                }
              }}
              placeholder="0x123...\n0x456..."
              className="bg-gray-50 dark:bg-[#1a1525] border-gray-200 dark:border-[#3a3450] text-gray-900 dark:text-white mt-2 min-h-[100px] max-h-[300px] overflow-y-auto focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>

          <DialogFooter className="px-0 pt-2">
            <Button
              type="button"
              onClick={() => {
                // TODO: Save allowlist stage data to form
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
