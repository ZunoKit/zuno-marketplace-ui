"use client";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { redirect } from "next/navigation";

export default function NewCollection() {
  return (
    <Card className="bg-white dark:bg-[#111119] border-gray-200 dark:border-zinc-800 text-gray-900 dark:text-white">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-medium">New Collection</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          Create a Single Edition (ERC-1155) or a Unique Edition (ERC-721)
          collection
        </p>

        <Button
          className="w-full bg-pink-600 hover:bg-pink-700 dark:bg-pink-500 dark:hover:bg-pink-600 text-white cursor-pointer transition-colors"
          onClick={() => {
            redirect("/mint/create");
          }}
        >
          Create New Collection
        </Button>
      </CardContent>
    </Card>
  );
}
