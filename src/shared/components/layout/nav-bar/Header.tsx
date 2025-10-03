"use client";
import MobileMenu from "@/shared/components/layout/nav-bar/MobileMenu";
import { ModeToggle } from "@/shared/components/layout/dark-mode/ModeToggle";
import NavLink from "@/shared/components/layout/nav-bar/NavBar";
import SearchBar from "@/shared/components/layout/nav-bar/SearchBar";
import { useIsMobile } from "@/shared/hooks/use-mobile";
import { getNavItems } from "@/shared/utils/menu";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [activeTab] = useState("collections");
  const isMobile = useIsMobile();
  // Get authentication status from Redux
  //   const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  // Get the appropriate nav items based on authentication status
  const navItems = getNavItems(true);
  return (
    <header className="bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-gray-200 py-3 dark:bg-[#1A1F2C]/80 dark:supports-[backdrop-filter]:bg-[#1A1F2C]/60 dark:border-white/5 transition-colors">
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
              <NavLink
                key={item.id}
                href={item.href}
                active={activeTab === item.id}
                hasDropdown={item.hasDropdown}
                dropdownItems={item.dropdownItems}
              >
                {item.label}
              </NavLink>
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
