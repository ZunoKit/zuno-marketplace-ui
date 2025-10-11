"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/shared/components/ui/button";
import { logger } from "@/shared/lib/logger";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    logger.error("Page Error", error, {
      digest: error.digest,
    });
  }, [error]);

  return (
    <div className="flex items-center justify-center min-h-screen p-4 md:p-8">
      <div className="w-full max-w-md space-y-6 text-center">
        <div className="space-y-3">
          <h1 className="text-4xl font-bold tracking-tighter text-foreground sm:text-5xl">
            Something went wrong
          </h1>
          <p className="text-muted-foreground">
            We encountered an error while processing your request.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button onClick={reset} variant="default">
            Try again
          </Button>
          <Button variant="outline" asChild>
            <Link href="/">Return home</Link>
          </Button>
        </div>
        {error.digest && (
          <p className="text-xs text-muted-foreground pt-4">Error ID: {error.digest}</p>
        )}
      </div>
    </div>
  );
}
