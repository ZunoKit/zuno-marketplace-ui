"use client";

import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { ChevronDown, Sprout } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";

import Link from "next/link";
import Image from "next/image";
import { ScrollArea } from "@/shared/components/ui/scroll-area";
import { useState } from "react";
import { useEffect } from "react";
import { Collection } from "@/shared/types";
import { makeMockCollections } from "@/shared/utils/mock/mockCollection";

export default function ExistingCollections() {
  const [collections, setCollections] = useState<Collection[]>([]);

  useEffect(() => {
    setCollections(makeMockCollections(10));
  }, []);

  return (
    <Card className="bg-white dark:bg-[#111119] border-gray-200 dark:border-zinc-800 text-gray-900 dark:text-white">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-medium">
          Existing Collections
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            View your deployed collections on {"unknown chain"}
          </p>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild className="w-full">
            <Button
              variant="outline"
              className="w-full justify-between bg-gray-50 dark:bg-[#1e1e2d] border-gray-200 dark:border-zinc-700 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-zinc-700 hover:text-gray-900 dark:hover:text-white"
            >
              View Collection
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[var(--radix-dropdown-menu-trigger-width)] max-w-full bg-white dark:bg-[#1e1e2d] border-gray-200 dark:border-zinc-700 text-gray-900 dark:text-white"
            align="start"
            sideOffset={5}
          >
            <ScrollArea className="h-30">
              {collections.length > 0 ? (
                collections.map((collection) => (
                  <DropdownMenuItem
                    key={collection.id}
                    className="hover:bg-gray-100 dark:hover:bg-zinc-700 py-3 px-4 cursor-pointer"
                  >
                    <Link
                      href={`/mint/${collection.slug}`}
                      className="flex items-center gap-2 w-full"
                    >
                      <Image
                        src={
                          collection.imageUrl
                            ? `${collection.imageUrl}`
                            : "/placeholder.svg"
                        }
                        alt={collection.name}
                        width={24}
                        height={24}
                        className="w-6 h-6 rounded-xs"
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder.svg"; // Fallback image
                        }}
                      />
                      <span className="font-medium">{collection.name}</span>
                    </Link>
                  </DropdownMenuItem>
                ))
              ) : (
                <div className="flex flex-col items-center py-6">
                  <Sprout className="h-8 w-8 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    No collections found for this wallet
                  </p>
                </div>
              )}
            </ScrollArea>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardContent>
    </Card>
  );
}
