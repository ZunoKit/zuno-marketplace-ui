# Architecture Documentation

## Overview

Zuno Marketplace follows a modular, scalable architecture designed for maintainability and growth.

## Core Principles

1. **Separation of Concerns** - Clear boundaries between features
2. **Reusability** - Shared components and utilities
3. **Type Safety** - Comprehensive TypeScript usage
4. **Testability** - Easy to test components and logic
5. **Performance** - Optimized for speed and efficiency

## Directory Structure

### App Router (`src/app/`)

Next.js 15 App Router with route grouping:

```
src/app/
├── (analytics)/        # Analytics routes
├── (creator)/          # Creator routes
├── (discover)/         # Discovery routes
├── (marketplace)/      # Marketplace routes
├── (static)/           # Static pages
├── (user)/             # User routes
├── layout.tsx          # Root layout
└── page.tsx            # Homepage
```

**Route Groups Benefits**:

- Organize routes logically without affecting URLs
- Share layouts between related routes
- Better code organization

### Modules (`src/modules/`)

Feature-based modules:

```
src/modules/[feature]/
├── components/         # Feature-specific components
├── hooks/             # Feature-specific hooks
├── types/             # Feature-specific types
├── utils/             # Feature-specific utilities
└── index.ts           # Public API
```

**Modules**:

- `activity` - Activity feed and history
- `auctions` - Auction functionality
- `auth` - Authentication
- `chain` - Blockchain network management
- `collections` - NFT collections
- `explore` - Discovery and search
- `launchpad` - Project launches
- `marketplace` - Core marketplace
- `mint` - NFT creation and minting
- `nft-detail` - NFT detail views
- `product-discovery` - Homepage features
- `profile` - User profiles
- `stats` - Analytics and statistics
- `wallets` - Wallet management

### Shared (`src/shared/`)

Shared infrastructure:

```
src/shared/
├── api/               # API client
│   └── client.ts      # HTTP client
├── components/        # Shared components
│   ├── ui/           # shadcn/ui components
│   ├── layout/       # Layout components
│   ├── carousel/     # Carousel components
│   ├── date-time/    # Date pickers
│   └── seo/          # SEO components
├── config/           # Configuration
│   └── site.ts       # Site config
├── constants/        # Constants
│   ├── chains.ts     # Blockchain chains
│   ├── routes.ts     # Route definitions
│   └── contracts.ts  # Smart contracts
├── hooks/            # Custom hooks
├── lib/              # Utilities
├── services/         # Service layer
│   ├── nft.service.ts
│   ├── collection.service.ts
│   └── blockchain.service.ts
├── types/            # Global types
└── utils/            # Utility functions
```

## Data Flow

### 1. Component Layer

React components handle UI rendering:

```typescript
// Component
function NFTList() {
  const { data, isLoading } = useNFTs();

  if (isLoading) return <Skeleton />;

  return <Grid>{data.map(nft => <NFTCard {...nft} />)}</Grid>;
}
```

### 2. Hook Layer

Custom hooks manage state and side effects:

```typescript
// Hook
function useNFTs(params?: NFTListParams) {
  const [data, setData] = useState<NFT[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    nftService
      .list(params)
      .then(setData)
      .finally(() => setIsLoading(false));
  }, [params]);

  return { data, isLoading };
}
```

### 3. Service Layer

Services handle business logic and API calls:

```typescript
// Service
export const nftService = {
  async list(params?: NFTListParams) {
    return apiClient.get("/nfts", { params });
  },

  async getById(id: string) {
    return apiClient.get(`/nfts/${id}`);
  },
};
```

### 4. API Layer

API client handles HTTP requests:

```typescript
// API Client
class ApiClient {
  async get<T>(endpoint: string, config?: RequestConfig): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    return response.json();
  }
}
```

## State Management

### Local State

- Use `useState` for component-local state
- Use `useReducer` for complex state logic

### Server State

- Use React Server Components for data fetching
- Use `use` hook for async data
- Cache data with Next.js built-in caching

### Global State (Future)

- Consider Zustand or Jotai for global state
- Use Context API for theme and auth state

## Styling Strategy

### Tailwind CSS

- Utility-first CSS framework
- Custom design system via `tailwind.config`
- Responsive design with mobile-first approach

### Component Variants

Using `class-variance-authority`:

```typescript
const buttonVariants = cva("inline-flex items-center justify-center", {
  variants: {
    variant: {
      default: "bg-primary text-white",
      outline: "border border-primary",
    },
    size: {
      default: "h-10 px-4",
      sm: "h-8 px-3",
      lg: "h-12 px-6",
    },
  },
});
```

## Performance Optimization

### Code Splitting

- Automatic code splitting with Next.js
- Dynamic imports for large components:

```typescript
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <Skeleton />,
});
```

### Image Optimization

- Use Next.js `<Image>` component
- Automatic WebP conversion
- Lazy loading by default

### Caching

- Next.js built-in caching
- React Server Components caching
- API response caching

## Security

### Input Validation

- Use Zod for runtime validation
- Validate all user inputs
- Sanitize data before display

### Authentication

- Wallet-based authentication
- Message signing for verification
- Secure session management

## Testing Strategy

### Unit Tests (Vitest)

- Test individual components
- Test utility functions
- Test hooks

### Integration Tests

- Test feature workflows
- Test API interactions
- Test state management

### E2E Tests (Playwright)

- Test user journeys
- Test critical paths
- Test across browsers

## Deployment

### Build Process

```bash
pnpm build
```

Generates optimized production build in `.next/`

### Environment Variables

- Use `.env.local` for local development
- Use platform environment variables for production
- Never commit secrets to git

### Hosting

- Deploy to Vercel (recommended)
- Or any Node.js hosting platform
- Requires Node.js 18+

## Best Practices

1. **Keep components small** - Single responsibility
2. **Use TypeScript** - Leverage type safety
3. **Write tests** - Test critical functionality
4. **Document code** - Add JSDoc comments
5. **Follow conventions** - Consistent naming and structure
6. **Optimize performance** - Use profiling tools
7. **Handle errors** - Graceful error handling
8. **Accessibility** - WCAG compliance

## Future Enhancements

- [ ] Add React Query for server state
- [ ] Implement WebSocket for real-time updates
- [ ] Add internationalization (i18n)
- [ ] Implement PWA features
- [ ] Add error monitoring (Sentry)
- [ ] Add analytics (Mixpanel/Amplitude)
