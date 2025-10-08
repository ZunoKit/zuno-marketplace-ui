"use client";
import MobileMenu from "@/shared/components/layout/nav-bar/MobileMenu";
import { ModeToggle } from "@/shared/components/layout/dark-mode/ModeToggle";
import NavDropdown from "@/shared/components/layout/nav-bar/NavDropdown";
import SearchBar from "@/shared/components/layout/nav-bar/SearchBar";
import { useIsMobile } from "@/shared/hooks/use-mobile";
import { useScroll } from "@/shared/hooks/use-scroll";
import { getNavItems } from "@/shared/utils/menu";
import Link from "next/link";
import { cn } from "@/shared/utils/tailwind-utils";

export default function Header() {
  const isMobile = useIsMobile();
  const isScrolled = useScroll(10);

  // Get authentication status from Redux
  //   const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  // Get the appropriate nav items based on authentication status
  const allNavItems = getNavItems(true);

  // Filter out Stats menu on mobile since it's in footer
  const navItems = isMobile
    ? allNavItems.filter((item) => item.id !== "stats")
    : allNavItems;
  return (
    <header
      className={cn(
        "border-b py-3 transition-all duration-300",
        isScrolled
          ? "bg-white/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/70 dark:bg-[#1A1F2C]/80 dark:supports-[backdrop-filter]:bg-[#1A1F2C]/70 border-gray-200/70 dark:border-white/5"
          : "bg-white dark:bg-[#1A1F2C] border-gray-200 dark:border-white/5"
      )}
    >
      <div className="flex items-center justify-between px-2 sm:px-4 mx-auto">
        <Link href="/" className="flex items-center mr-2 xl:mr-5">
          <span className="text-3xl font-extrabold tracking-tight text-gray-900 mr-2 dark:text-white">
            <span className="text-[#ec4899]">M</span>
            <span className="text-[#9948ec]">E</span>
          </span>
          <div className="hidden md:block text-xl font-semibold tracking-wide text-gray-900 dark:text-white">
            MAGIC EDEN
          </div>
        </Link>

        {!isMobile && (
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <NavDropdown
                key={item.id}
                href={item.href}
                active={false}
                hasDropdown={item.hasDropdown}
                dropdownItems={item.dropdownItems}
              >
                {item.label}
              </NavDropdown>
            ))}
          </nav>
        )}

        <SearchBar isMobile={isMobile} />

        <div className="flex items-center space-x-2 ml-auto pl-2 border-l border-transparent md:border-gray-200 dark:md:border-white/5">
          {/* <WalletSection></WalletSection> */}
          <ModeToggle />
          {/* Mobile Menu */}
          {isMobile && <MobileMenu navItems={navItems} />}
        </div>
      </div>
    </header>
  );
}
