export type NavItem = {
  id: string;
  label: string;
  href: string;
  hasDropdown: boolean;
  dropdownItems?: { label: string; href: string }[];
  requiresAuth?: boolean; // Add this property to indicate if the item requires authentication
};

// Items that are always visible regardless of authentication status
export const publicNavItems: NavItem[] = [
  {
    id: "marketplace",
    label: "Marketplace",
    href: "/marketplace",
    hasDropdown: false,
    dropdownItems: [],
    requiresAuth: false,
  },
  {
    id: "collections",
    label: "Collections",
    href: "/collections",
    hasDropdown: false,
    dropdownItems: [],
    requiresAuth: false,
  },
  {
    id: "stats",
    label: "Stats",
    href: "/stats",
    hasDropdown: false,
    dropdownItems: [],
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
      },
      {
        label: "Manage Collections",
        href: "/mint/create-or-manage",
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
