import {
  ProcessDialog,
  ProcessStep,
  ProcessStatus,
} from "@/shared/components/process-dialog/ProcessDialog";

export function CollectionProcess({
  isOpen,
  onOpenChange,
  step1Status,
  step2Status,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  step1Status: ProcessStatus;
  step2Status: ProcessStatus;
}) {
  const steps: ProcessStep[] = [
    {
      id: "deploy-contract",
      title: "Step 1 - Deploy Contract",
      description: "Deploy the smart contract for your new collection.",
      details: "Awaiting transaction signature",
      status: step1Status,
    },
    {
      id: "configure-collection",
      title: "Step 2 - Configure Collection",
      status: step2Status,
    },
  ];

  return (
    <ProcessDialog
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      title="Publish Collection"
      steps={steps}
    />
  );
}
