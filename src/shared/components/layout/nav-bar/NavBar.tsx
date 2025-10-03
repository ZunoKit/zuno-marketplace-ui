import Link from "next/link";
import { cn } from "@/shared/utils/tailwind-utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { useRef, useState } from "react";

type NavLinkProps = {
  href: string;
  children: React.ReactNode;
  active?: boolean;
  hasDropdown?: boolean;
  dropdownItems?: { label: string; href: string }[];
};

export default function NavLink({
  href,
  children,
  active = false,
  hasDropdown = false,
  dropdownItems = [],
}: NavLinkProps) {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleOpen = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleClose = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150);
  };

  if (hasDropdown) {
    return (
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <div onPointerEnter={handleOpen} onPointerLeave={handleClose}>
            <Link
              href={href}
              aria-haspopup="menu"
              aria-expanded={isOpen}
              aria-current={active ? "page" : undefined}
              className={cn(
                "px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900  transition-colors flex items-center gap-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500/60",
                "dark:text-white/70 dark:hover:text-white ",
                active &&
                  "bg-gray-100 text-gray-900 dark:bg-white/10 dark:text-white"
              )}
            >
              {children}
            </Link>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          className="bg-white border border-gray-200 text-gray-900 w-48 dropdown-slide-down z-[100] dark:bg-[#1A1F2C] dark:border-white/10 dark:text-white rounded-none"
          onPointerEnter={handleOpen}
          onPointerLeave={handleClose}
        >
          {dropdownItems.map((item) => (
            <DropdownMenuItem key={item.href} className="rounded-none">
              <Link href={item.href} className="w-full py-1">
                {item.label}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900  transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500/60",
        "dark:text-white/70 dark:hover:text-white ",
        active && "bg-gray-100 text-gray-900 dark:bg-white/10 dark:text-white"
      )}
    >
      {children}
    </Link>
  );
}
