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
    id: "Mint",
    label: "Mint",
    href: "/mint/create-or-manage",
    hasDropdown: false,
    dropdownItems: [],
    requiresAuth: true,
  },

  {
    id: "Create",
    label: "Create",
    href: "/mint/create",
    hasDropdown: true,
    dropdownItems: [
      {
        label: "Create NFT",
        href: "/mint/create/nft",
      },
      {
        label: "Create NFT",
        href: "/mint/create",
      },
    ],
    requiresAuth: true,
  },

  {
    id: "Launchpad",
    label: "Launchpad",
    href: "/launch-pad/xxxxxxx",
    hasDropdown: false,
    dropdownItems: [],
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
