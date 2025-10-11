"use client";

import Header from "@/shared/components/layout/nav-bar/Header";
import { ThemeProvider } from "@/shared/components/theme-provider";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";

export default function Wrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  // Check if current route has ChainTab
  // ChainTab only exists in (discover) routes (homepage)
  const hasChainTab = pathname === "/" || pathname?.startsWith("/discover");

  // Marketplace and other specific routes don't have ChainTab
  const isMarketplace = pathname?.startsWith("/marketplace");
  const isMint = pathname?.startsWith("/mint");

  // Determine padding class based on route
  const mainPaddingClass =
    isMarketplace || isMint
      ? "pt-16 md:pt-20" // Smaller padding when no ChainTab
      : hasChainTab
        ? "pt-35 md:pt-30" // Full padding for routes with ChainTab
        : "pt-20 md:pt-24"; // Default padding for other routes

  const horizontalPaddingClass = isMarketplace
    ? "px-0 sm:px-4 md:px-6 lg:px-8" // No padding on mobile, normal padding on larger screens for marketplace
    : "px-4 md:px-6 lg:px-8"; // Normal padding for other pages

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
      <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900 dark:bg-[#121620] dark:text-white transition-colors">
        {/* Fixed header */}
        <div className="fixed top-0 left-0 right-0 z-50">
          <Header />
        </div>

        {/* Main content with padding to account for fixed header and footer */}
        <main
          className={`max-w-screen w-full mx-auto pb-24 flex-grow ${mainPaddingClass} ${horizontalPaddingClass}`}
        >
          {children}
        </main>

        {/* Fixed footer */}
        <footer className="fixed bottom-0 left-0 right-0 border-t border-gray-200 dark:border-white/5 py-4 bg-white/95 dark:bg-[#121620]/95 backdrop-blur-sm z-40 transition-colors">
          <div className="mx-auto px-4 w-full md:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between text-gray-500 dark:text-white/40 text-sm">
              <div>© 2024 Zuno Marketplace</div>
              <div className="flex gap-4 mt-2 md:mt-0">
                <a
                  href="/terms"
                  className="hover:text-gray-700 dark:hover:text-white/60 transition-colors"
                >
                  Terms
                </a>
                <a
                  href="/privacy"
                  className="hover:text-gray-700 dark:hover:text-white/60 transition-colors"
                >
                  Privacy
                </a>
                <a
                  href="/help"
                  className="hover:text-gray-700 dark:hover:text-white/60 transition-colors"
                >
                  Help
                </a>
                <a
                  href="/about"
                  className="hover:text-gray-700 dark:hover:text-white/60 transition-colors"
                >
                  About
                </a>
                <a
                  href="/contact"
                  className="hover:text-gray-700 dark:hover:text-white/60 transition-colors"
                >
                  Contact
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
}
