# Contributing to Zuno Marketplace

Thank you for your interest in contributing! This guide will help you get started.

## Code of Conduct

Be respectful, inclusive, and professional in all interactions.

## Getting Started

1. **Fork the repository**
2. **Clone your fork**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/zuno-marketplace-ui.git
   ```
3. **Install dependencies**:
   ```bash
   pnpm install
   ```
4. **Create a branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Workflow

### 1. Make Your Changes

- Follow the existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation if needed

### 2. Test Your Changes

```bash
# Run unit tests
pnpm test:run

# Run E2E tests
pnpm test:e2e

# Check types
pnpm check-types

# Lint code
pnpm lint
```

### 3. Commit Your Changes

We use [Conventional Commits](https://www.conventionalcommits.org/):

```bash
git commit -m "feat: add new feature"
git commit -m "fix: resolve bug"
git commit -m "docs: update README"
```

Types:

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting, missing semicolons, etc.
- `refactor`: Code restructuring
- `test`: Adding tests
- `chore`: Maintenance tasks

### 4. Push and Create PR

```bash
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub.

## Code Style

### TypeScript

- Use explicit types when necessary
- Prefer interfaces over types for object shapes
- Use enums for fixed sets of values

### React

- Use functional components with hooks
- Keep components small and focused
- Use proper prop types

### File Structure

- Place components in appropriate module folders
- Shared components go in `src/shared/components`
- Create tests alongside your code

## Testing

### Unit Tests

Place unit tests in `src/__tests__/` or alongside components:

```typescript
// src/shared/components/Button.test.tsx
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('should render', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
});
```

### E2E Tests

Place E2E tests in `e2e/`:

```typescript
// e2e/marketplace.spec.ts
import { test, expect } from "@playwright/test";

test("should display NFTs", async ({ page }) => {
  await page.goto("/marketplace");
  await expect(page.locator(".nft-card")).toHaveCount(20);
});
```

## Pull Request Guidelines

### PR Title

Use conventional commit format:

- `feat: add auction bidding feature`
- `fix: resolve wallet connection issue`

### PR Description

Include:

- What changed
- Why it changed
- How to test
- Screenshots (if UI changes)

### Review Process

- All PRs require at least one approval
- All tests must pass
- Code must be formatted correctly
- No merge conflicts

## Project Architecture

### Module Structure

```
src/modules/[feature]/
├── components/      # Feature components
├── hooks/          # Feature hooks
├── types/          # Feature types
└── index.ts        # Public exports
```

### Naming Conventions

- **Components**: PascalCase (`Button.tsx`)
- **Hooks**: camelCase with `use` prefix (`useWallet.ts`)
- **Utils**: camelCase (`formatDate.ts`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_FILE_SIZE`)
- **Types**: PascalCase (`UserProfile`)

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)

## Questions?

- Open an issue for bugs or feature requests
- Join our [Discord](https://discord.gg/zuno) for discussions
- Check existing issues before creating new ones

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
