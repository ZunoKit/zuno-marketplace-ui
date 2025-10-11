"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Globe } from "lucide-react";
import { cn } from "@/shared/utils/tailwind-utils";
import Image from "next/image";
import { mockChains } from "@/shared/utils/mock/mockChain";
import { useScroll } from "@/shared/hooks/use-scroll";

export default function ChainMenu() {
  const pathname = usePathname();
  const [selectedChain, setSelectedChain] = useState<string>("all");
  const isScrolled = useScroll(10);

  // Đồng bộ giá trị selectedChain với route hiện tại khi component mount
  useEffect(() => {
    // Kiểm tra xem có phải đang ở route /discover/[slug] không
    const pathSegments = pathname.split("/");
    if (pathSegments.length >= 3 && pathSegments[1] === "discover") {
      const slugFromPath = pathSegments[2];
      // Kiểm tra xem slug có hợp lệ không
      const supportedChains = mockChains();
      const isValidChain = supportedChains.some(chain => chain.slug === slugFromPath);

      if (isValidChain) {
        setSelectedChain(slugFromPath);
      } else {
        setSelectedChain("all");
      }
    } else {
      // Nếu không phải route discover thì set về "all"
      setSelectedChain("all");
    }
  }, [pathname]);

  return (
    <div
      className={cn(
        "fixed left-0 right-0 top-[50px] md:top-[65px] xl:top-[60px] z-40 border-b transition-all duration-300",
        isScrolled
          ? "bg-white/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/70 dark:bg-[#121620]/80 dark:supports-[backdrop-filter]:bg-[#121620]/70 border-gray-200/70 dark:border-white/5"
          : "bg-white dark:bg-[#121620] border-gray-200 dark:border-white/5"
      )}
    >
      <div className="w-full mx-auto py-3 px-4 md:px-6 lg:px-8">
        <div className="flex space-x-1 overflow-x-auto">
          <Link
            href="/"
            className={cn(
              "flex items-center h-10 px-3 rounded-lg cursor-pointer transition-all duration-200",
              selectedChain === "all"
                ? "bg-primary text-primary-foreground"
                : isScrolled
                  ? "bg-gray-50/70 text-gray-600 hover:bg-gray-100/70 dark:bg-[#1A1F2C]/70 dark:text-white/70 dark:hover:bg-[#232836]/70"
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100 dark:bg-[#1A1F2C] dark:text-white/70 dark:hover:bg-[#232836]"
            )}
          >
            <Globe size={18} />
            <span
              className={cn(
                "ml-2 text-sm font-medium transition-opacity duration-150",
                selectedChain === "all" ? "opacity-100" : "opacity-0 w-0 overflow-hidden"
              )}
            >
              All Chains
            </span>
          </Link>

          {mockChains().map(chain => (
            <Link
              key={chain.id}
              href={`/discover/${chain.slug}`}
              className={cn(
                "flex items-center h-10 px-3 rounded-lg cursor-pointer transition-all duration-200",
                String(selectedChain) === String(chain.slug)
                  ? "bg-primary text-primary-foreground"
                  : isScrolled
                    ? "bg-gray-50/70 text-gray-600 hover:bg-gray-100/70 dark:bg-[#1A1F2C]/70 dark:text-white/70 dark:hover:bg-[#232836]/70"
                    : "bg-gray-50 text-gray-600 hover:bg-gray-100 dark:bg-[#1A1F2C] dark:text-white/70 dark:hover:bg-[#232836]"
              )}
            >
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor:
                    String(chain.slug) === String(selectedChain)
                      ? "rgba(255, 255, 255, 0.2)"
                      : "transparent",
                }}
              >
                <Image src={chain.icon} alt={`${chain.name} icon`} width={24} height={24} />
              </div>
              <span
                className={cn(
                  "ml-2 text-sm font-medium transition-opacity duration-150",
                  String(chain.slug) === String(selectedChain)
                    ? "opacity-100"
                    : "opacity-0 w-0 overflow-hidden"
                )}
              >
                {chain.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
