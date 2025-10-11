# Testing Guide

## Overview

Zuno Marketplace uses a comprehensive testing strategy:

- **Unit Tests** - Vitest for component and utility testing
- **Integration Tests** - Testing feature workflows
- **E2E Tests** - Playwright for end-to-end user journeys

## Unit Testing with Vitest

### Setup

Vitest is configured in `vitest.config.ts` and uses `jsdom` environment for React testing.

### Running Tests

```bash
# Watch mode (recommended for development)
pnpm test

# Run all tests once
pnpm test:run

# Open Vitest UI
pnpm test:ui

# Generate coverage report
pnpm test:coverage
```

### Writing Unit Tests

#### Component Tests

```typescript
// src/shared/components/Button.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('should render with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('should handle click events', async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click me</Button>);

    await userEvent.click(screen.getByText('Click me'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should be disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

#### Hook Tests

```typescript
// src/shared/hooks/useCounter.test.ts
import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useCounter } from "./useCounter";

describe("useCounter", () => {
  it("should initialize with default value", () => {
    const { result } = renderHook(() => useCounter());
    expect(result.current.count).toBe(0);
  });

  it("should increment counter", () => {
    const { result } = renderHook(() => useCounter());

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });

  it("should decrement counter", () => {
    const { result } = renderHook(() => useCounter(5));

    act(() => {
      result.current.decrement();
    });

    expect(result.current.count).toBe(4);
  });
});
```

#### Utility Tests

```typescript
// src/shared/utils/formatPrice.test.ts
import { describe, it, expect } from "vitest";
import { formatPrice } from "./formatPrice";

describe("formatPrice", () => {
  it("should format price with 2 decimals", () => {
    expect(formatPrice(1.5)).toBe("1.50");
  });

  it("should handle large numbers", () => {
    expect(formatPrice(1000000)).toBe("1,000,000.00");
  });

  it("should handle zero", () => {
    expect(formatPrice(0)).toBe("0.00");
  });
});
```

### Testing with Mocks

#### Mock API Calls

```typescript
import { vi } from 'vitest';
import { nftService } from '@/shared/services';

vi.mock('@/shared/api/client', () => ({
  apiClient: {
    get: vi.fn().mockResolvedValue({
      data: [{ id: '1', name: 'Test NFT' }],
      total: 1
    })
  }
}));

describe('NFT List', () => {
  it('should fetch and display NFTs', async () => {
    render(<NFTList />);

    await waitFor(() => {
      expect(screen.getByText('Test NFT')).toBeInTheDocument();
    });
  });
});
```

#### Mock Blockchain

```typescript
vi.mock("@/shared/services/blockchain.service", () => ({
  blockchainService: {
    connectWallet: vi.fn().mockResolvedValue("0x123..."),
    getCurrentAccount: vi.fn().mockResolvedValue("0x123..."),
  },
}));
```

### Test Coverage

```bash
# Generate coverage report
pnpm test:coverage
```

Coverage reports are generated in `coverage/` directory.

**Target Coverage**:

- Statements: 80%+
- Branches: 75%+
- Functions: 80%+
- Lines: 80%+

## E2E Testing with Playwright

### Setup

Playwright is configured in `playwright.config.ts` with multiple browser targets.

### Running E2E Tests

```bash
# Run E2E tests
pnpm test:e2e

# Open Playwright UI
pnpm test:e2e:ui

# Run in headed mode (see browser)
pnpm test:e2e:headed

# Run specific test file
pnpm test:e2e src/tests/e2e/homepage.spec.ts

# Run tests in specific browser
pnpm test:e2e --project=chromium
pnpm test:e2e --project=firefox
pnpm test:e2e --project=webkit
```

### Writing E2E Tests

#### Basic Test

```typescript
// src/tests/e2e/marketplace.spec.ts
import { test, expect } from "@playwright/test";

test.describe("Marketplace", () => {
  test("should display NFT listings", async ({ page }) => {
    await page.goto("/marketplace");

    // Wait for NFTs to load
    await page.waitForSelector(".nft-card");

    // Check that NFTs are displayed
    const nftCards = page.locator(".nft-card");
    await expect(nftCards).toHaveCount(20);
  });

  test("should filter NFTs by price", async ({ page }) => {
    await page.goto("/marketplace");

    // Open filter
    await page.click('[data-testid="filter-button"]');

    // Set price range
    await page.fill('[data-testid="min-price"]', "1");
    await page.fill('[data-testid="max-price"]', "10");

    // Apply filter
    await page.click('[data-testid="apply-filter"]');

    // Verify results
    await expect(page.locator(".nft-card")).toHaveCount(5);
  });
});
```

#### User Journey Test

```typescript
// src/tests/e2e/user-flow.spec.ts
import { test, expect } from "@playwright/test";

test.describe("User Journey", () => {
  test("should complete NFT purchase flow", async ({ page }) => {
    // 1. Navigate to marketplace
    await page.goto("/marketplace");

    // 2. Click on an NFT
    await page.click(".nft-card:first-child");

    // 3. Verify NFT detail page
    await expect(page.locator("h1")).toBeVisible();

    // 4. Click buy button
    await page.click('[data-testid="buy-button"]');

    // 5. Connect wallet (mock)
    await page.click('[data-testid="connect-wallet"]');

    // 6. Confirm purchase
    await page.click('[data-testid="confirm-purchase"]');

    // 7. Verify success message
    await expect(page.locator(".success-message")).toBeVisible();
  });
});
```

#### Mobile Testing

```typescript
test.describe("Mobile Experience", () => {
  test.use({
    viewport: { width: 375, height: 667 }, // iPhone SE
  });

  test("should display mobile navigation", async ({ page }) => {
    await page.goto("/");

    // Verify mobile menu
    await expect(page.locator('[data-testid="mobile-menu-button"]')).toBeVisible();

    // Open menu
    await page.click('[data-testid="mobile-menu-button"]');

    // Verify menu items
    await expect(page.locator("nav")).toBeVisible();
  });
});
```

### Playwright Best Practices

1. **Use data-testid attributes** for stable selectors
2. **Wait for elements** before interacting
3. **Use page object pattern** for complex pages
4. **Take screenshots** on failure
5. **Mock external APIs** when needed

#### Page Object Pattern

```typescript
// src/tests/e2e/pages/marketplace.page.ts
export class MarketplacePage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto("/marketplace");
  }

  async filterByPrice(min: number, max: number) {
    await this.page.click('[data-testid="filter-button"]');
    await this.page.fill('[data-testid="min-price"]', min.toString());
    await this.page.fill('[data-testid="max-price"]', max.toString());
    await this.page.click('[data-testid="apply-filter"]');
  }

  async getNFTCount() {
    return await this.page.locator(".nft-card").count();
  }
}

// Use in test
test("should filter NFTs", async ({ page }) => {
  const marketplace = new MarketplacePage(page);
  await marketplace.goto();
  await marketplace.filterByPrice(1, 10);

  const count = await marketplace.getNFTCount();
  expect(count).toBeGreaterThan(0);
});
```

## Integration Testing

Integration tests verify that multiple components work together.

```typescript
// src/__tests__/integration/nft-listing.test.tsx
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { NFTListingPage } from '@/modules/marketplace';

describe('NFT Listing Integration', () => {
  beforeEach(() => {
    // Setup mock API
    vi.mock('@/shared/api/client');
  });

  it('should load and display NFTs with filters', async () => {
    render(<NFTListingPage />);

    // Wait for NFTs to load
    await waitFor(() => {
      expect(screen.getAllByTestId('nft-card')).toHaveLength(20);
    });

    // Apply filter
    const filterButton = screen.getByText('Filter');
    await userEvent.click(filterButton);

    const priceInput = screen.getByLabelText('Max Price');
    await userEvent.type(priceInput, '10');

    const applyButton = screen.getByText('Apply');
    await userEvent.click(applyButton);

    // Verify filtered results
    await waitFor(() => {
      expect(screen.getAllByTestId('nft-card').length).toBeLessThan(20);
    });
  });
});
```

## Test Organization

```
src/
├── __tests__/
│   ├── setup.ts           # Test setup and globals
│   ├── example.test.tsx   # Example tests
│   └── integration/       # Integration tests
│
├── tests/
│   └── e2e/
│       ├── homepage.spec.ts       # Homepage E2E tests
│       ├── marketplace.spec.ts    # Marketplace E2E tests
│       ├── user-flow.spec.ts      # User journey tests
│       └── pages/                 # Page objects
│           ├── marketplace.page.ts
│           └── nft-detail.page.ts
```

## CI/CD Integration

Tests run automatically in CI/CD pipeline:

```yaml
# .github/workflows/ci.yml
- name: Run unit tests
  run: pnpm test:run

- name: Run E2E tests
  run: pnpm test:e2e
```

## Debugging Tests

### Vitest Debugging

```bash
# Run specific test file
pnpm test src/shared/components/Button.test.tsx

# Run tests matching pattern
pnpm test Button

# Update snapshots
pnpm test -- -u
```

### Playwright Debugging

```bash
# Debug mode (opens browser inspector)
pnpm test:e2e --debug

# Generate trace
pnpm test:e2e --trace on

# View trace
npx playwright show-trace trace.zip
```

## Common Testing Patterns

### Testing Async Components

```typescript
test('should handle async data loading', async () => {
  render(<AsyncComponent />);

  // Show loading state
  expect(screen.getByText('Loading...')).toBeInTheDocument();

  // Wait for data
  await waitFor(() => {
    expect(screen.getByText('Data loaded')).toBeInTheDocument();
  });
});
```

### Testing Form Submissions

```typescript
test('should submit form with valid data', async () => {
  const onSubmit = vi.fn();
  render(<Form onSubmit={onSubmit} />);

  await userEvent.type(screen.getByLabelText('Name'), 'John Doe');
  await userEvent.type(screen.getByLabelText('Email'), 'john@example.com');
  await userEvent.click(screen.getByText('Submit'));

  expect(onSubmit).toHaveBeenCalledWith({
    name: 'John Doe',
    email: 'john@example.com'
  });
});
```

### Testing Error States

```typescript
test('should display error message on API failure', async () => {
  vi.mocked(apiClient.get).mockRejectedValue(new Error('API Error'));

  render(<NFTList />);

  await waitFor(() => {
    expect(screen.getByText('Failed to load NFTs')).toBeInTheDocument();
  });
});
```

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [Testing Library](https://testing-library.com/)
- [Playwright Documentation](https://playwright.dev/)
- [React Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
