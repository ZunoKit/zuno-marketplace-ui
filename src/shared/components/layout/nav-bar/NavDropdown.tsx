"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/shared/utils/tailwind-utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/shared/components/ui/navigation-menu";
import { Badge } from "@/shared/components/ui/badge";
import type { DropdownItem } from "@/shared/utils/menu";
import {
  Grid3x3,
  TrendingUp,
  Sparkles,
  Gavel,
  Layers,
  Trophy,
  BadgeCheck,
  Rocket,
  BarChart3,
  Activity,
  ChartLine,
  FolderPlus,
  Image,
  Download,
  Settings,
  LucideIcon,
} from "lucide-react";

// Icon mapping
const iconMap: Record<string, LucideIcon> = {
  Grid3x3,
  TrendingUp,
  Sparkles,
  Gavel,
  Layers,
  Trophy,
  BadgeCheck,
  Rocket,
  BarChart3,
  Activity,
  ChartLine,
  FolderPlus,
  Image,
  Download,
  Settings,
};

interface NavDropdownProps {
  href: string;
  children: React.ReactNode;
  active?: boolean;
  hasDropdown?: boolean;
  dropdownItems?: DropdownItem[];
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & {
    item: DropdownItem;
  }
>(({ className, item, ...props }, ref) => {
  const Icon = item.icon ? iconMap[item.icon] : null;

  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground group",
            className
          )}
          {...props}
        >
          <div className="flex items-start gap-3">
            {Icon && (
              <Icon className="h-4 w-4 mt-0.5 text-muted-foreground group-hover:text-accent-foreground transition-colors" />
            )}
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium leading-none">
                  {item.label}
                </div>
                {item.badge && (
                  <Badge
                    variant={
                      (item.badgeVariant as
                        | "default"
                        | "secondary"
                        | "destructive"
                        | "outline") || "default"
                    }
                    className="ml-2 text-xs py-0 px-1.5 h-5"
                  >
                    {item.badge}
                  </Badge>
                )}
              </div>
              {item.description && (
                <p className="line-clamp-2 text-xs leading-snug text-muted-foreground mt-1">
                  {item.description}
                </p>
              )}
            </div>
          </div>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default function NavDropdown({
  href,
  children,
  active = false,
  hasDropdown = false,
  dropdownItems = [],
}: NavDropdownProps) {
  if (!hasDropdown) {
    return (
      <Link
        href={href}
        className={cn(
          navigationMenuTriggerStyle(),
          "bg-transparent hover:bg-accent/50 dark:hover:bg-accent/30",
          active && "bg-accent/70 text-accent-foreground dark:bg-accent/40"
        )}
      >
        {children}
      </Link>
    );
  }

  return (
    <NavigationMenu viewport={false}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger
            className={cn(
              "bg-transparent hover:bg-accent/50 dark:hover:bg-accent/30",
              active && "bg-accent/70 text-accent-foreground dark:bg-accent/40"
            )}
          >
            {children}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul
              className={cn(
                "grid gap-1 p-3",
                dropdownItems.length <= 4
                  ? "w-[400px] grid-cols-1"
                  : "w-[600px] md:grid-cols-2"
              )}
            >
              {dropdownItems.map((item) => (
                <ListItem key={item.href} item={item} href={item.href} />
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
