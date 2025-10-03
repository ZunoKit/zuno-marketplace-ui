import Link from "next/link";
import { Button } from "@/shared/components/ui/button";

export const metadata = {
  title: "404 - Page not found",
  description: "The page you're looking for doesn't exist or has been moved.",
};

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen p-4 md:p-8">
      <div className="w-full max-w-md space-y-6 text-center">
        <div className="space-y-3">
          <h1 className="text-4xl font-bold tracking-tighter text-foreground sm:text-5xl animate-bounce">
            404
          </h1>
          <p className="text-muted-foreground">
            The page youre looking for doesnt exist or has been moved.
          </p>
        </div>
        <Button asChild>
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </div>
  );
}
