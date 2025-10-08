import CreateManageContent from "@/modules/mint/collection-manager/CreateManageContent";
import CreateManageHeader from "@/modules/mint/collection-manager/CreateManageHeader";
import React from "react";

export default function CreateManageLayout() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <CreateManageHeader />
      <CreateManageContent />
    </div>
  );
}
