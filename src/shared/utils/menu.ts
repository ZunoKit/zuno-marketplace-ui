export type DropdownItem = {
  label: string;
  href: string;
  description?: string;
  icon?: string; // Icon name from lucide-react
  badge?: string;
  badgeVariant?:
    | "default"
    | "secondary"
    | "success"
    | "warning"
    | "destructive";
};

export type NavItem = {
  id: string;
  label: string;
  href: string;
  hasDropdown: boolean;
  dropdownItems?: DropdownItem[];
  requiresAuth?: boolean; // Add this property to indicate if the item requires authentication
};

// Items that are always visible regardless of authentication status
export const publicNavItems: NavItem[] = [
  {
    id: "marketplace",
    label: "Marketplace",
    href: "/marketplace",
    hasDropdown: true,
    dropdownItems: [
      {
        label: "All NFTs",
        href: "/marketplace",
        description: "Browse all available NFTs",
        icon: "Grid3x3",
      },
      {
        label: "Trending",
        href: "/marketplace?sort=trending",
        description: "Hot NFTs right now",
        icon: "TrendingUp",
        badge: "🔥 Hot",
        badgeVariant: "destructive",
      },
      {
        label: "New Listings",
        href: "/marketplace?sort=new",
        description: "Recently listed NFTs",
        icon: "Sparkles",
        badge: "New",
        badgeVariant: "success",
      },
      {
        label: "Live Auctions",
        href: "/auctions",
        description: "Bid on exclusive NFTs",
        icon: "Gavel",
      },
    ],
    requiresAuth: false,
  },
  {
    id: "collections",
    label: "Collections",
    href: "/collections",
    hasDropdown: true,
    dropdownItems: [
      {
        label: "Explore Collections",
        href: "/collections",
        description: "Discover curated collections",
        icon: "Layers",
      },
      {
        label: "Top Collections",
        href: "/collections?sort=volume",
        description: "Highest trading volume",
        icon: "Trophy",
        badge: "Top 100",
        badgeVariant: "warning",
      },
      {
        label: "Verified Collections",
        href: "/collections?filter=verified",
        description: "Official verified projects",
        icon: "BadgeCheck",
      },
      {
        label: "Upcoming Drops",
        href: "/launch-pad",
        description: "Don't miss new launches",
        icon: "Rocket",
        badge: "5 New",
        badgeVariant: "secondary",
      },
    ],
    requiresAuth: false,
  },
  {
    id: "stats",
    label: "Stats",
    href: "/stats",
    hasDropdown: true,
    dropdownItems: [
      {
        label: "Rankings",
        href: "/stats",
        description: "Top performers by volume",
        icon: "BarChart3",
      },
      {
        label: "Activity",
        href: "/stats/activity",
        description: "Real-time market activity",
        icon: "Activity",
      },
      {
        label: "Analytics",
        href: "/stats/analytics",
        description: "Deep market insights",
        icon: "ChartLine",
        badge: "Pro",
        badgeVariant: "default",
      },
    ],
    requiresAuth: false,
  },
  {
    id: "launchpad",
    label: "Launchpad",
    href: "/launch-pad",
    hasDropdown: false,
    dropdownItems: [],
    requiresAuth: false,
  },
  {
    id: "create",
    label: "Create",
    href: "/create",
    hasDropdown: true,
    dropdownItems: [
      {
        label: "Create Collection",
        href: "/mint/create",
        description: "Launch your NFT collection",
        icon: "FolderPlus",
        badge: "Gas Free",
        badgeVariant: "success",
      },
      {
        label: "Single NFT",
        href: "/mint/create#nft",
        description: "Mint individual NFTs",
        icon: "Image",
      },
      {
        label: "Import Collection",
        href: "/mint/import",
        description: "Import from other chains",
        icon: "Download",
        badge: "Beta",
        badgeVariant: "secondary",
      },
      {
        label: "Manage Collections",
        href: "/mint/create-or-manage",
        description: "Edit your existing collections",
        icon: "Settings",
      },
    ],
    requiresAuth: true,
  },
];

// Items that are only visible when authenticated
export const authNavItems: NavItem[] = [];

// Helper function to get the appropriate nav items based on authentication status
export const getNavItems = (isAuthenticated: boolean): NavItem[] => {
  if (isAuthenticated) {
    return [...publicNavItems, ...authNavItems];
  }
  return publicNavItems;
};
