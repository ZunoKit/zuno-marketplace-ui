import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";

import { CheckCircle2, Loader2 } from "lucide-react";
export type ProcessStatus = "pending" | "processing" | "completed";

// Dynamic step interface
export type ProcessStep = {
  id: string;
  title: string;
  description?: string;
  status: ProcessStatus;
  details?: string;
};

// Updated props interface
export type ProcessDialogProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  steps: ProcessStep[];
};

export function ProcessDialog({
  isOpen,
  onOpenChange,
  title = "Processing",
  steps,
}: ProcessDialogProps) {
  const getStatusIcon = (status: ProcessStatus) => {
    switch (status) {
      case "processing":
        return (
          <div className="h-5 w-5 rounded-full bg-pink-600 flex items-center justify-center">
            <Loader2 className="h-4 w-4 animate-spin text-white" />
          </div>
        );
      case "completed":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case "pending":
      default:
        return (
          <div className="h-5 w-5 rounded-full border-2 border-gray-500 dark:border-gray-500" />
        );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-[425px] bg-white dark:bg-[#0e0a1a] border-gray-200 dark:border-[#3a3450] text-gray-900 dark:text-white [&>button]:hidden"
        onInteractOutside={e => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="text-gray-900 dark:text-white text-xl font-medium">
            {title}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          {steps.map(step => (
            <div key={step.id} className="bg-gray-50 dark:bg-[#1a1527] rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="mt-1">{getStatusIcon(step.status)}</div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 dark:text-white text-base">
                    {step.title}
                  </h4>
                  {step.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {step.description}
                    </p>
                  )}
                  {step.details && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">{step.details}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Backward compatibility - keep the old component name for existing usage
