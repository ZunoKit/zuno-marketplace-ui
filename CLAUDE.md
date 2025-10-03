# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 frontend NFT marketplace application built with TypeScript, React 19, and Tailwind CSS. The application uses a modular architecture with clearly separated concerns for business logic, UI components, and shared utilities.

## Development Commands

**Note: This project uses PNPM as the package manager.**

- `pnpm dev` - Start development server with Turbopack (recommended)
- `pnpm build` - Build production application
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm lint:fix` - Run ESLint with auto-fix
- `pnpm install` - Install dependencies

## Architecture Overview

### Modular Structure

The project follows a module-based architecture located in `src/modules/`:

- **auth/** - Authentication module (currently minimal implementation)
- **mint/** - NFT minting functionality including:
  - `create-form/` - Collection creation forms and wizards
  - `mint-nft/` - NFT minting interface and components
  - `collection-manager/` - Collection management interface
- **product-discovery/** - Homepage discovery features:
  - `banner/` - Hero banners and promotional content
  - `collection-carousel/` - Featured collections display
- **chain/** - Blockchain network selection and management

### Shared Infrastructure

Located in `src/shared/`:

- **components/ui/** - Shadcn/ui component library with customizations
- **components/layout/** - Navigation, header, and layout components
- **components/carousel/** - Reusable carousel components
- **components/date-time/** - Date/time picker components
- **types/** - Global TypeScript type definitions
- **hooks/** - Shared React hooks

### UI Component System

- Uses Shadcn/ui components (configured in `components.json`)
- Tailwind CSS v4 for styling
- Dark mode support via `next-themes`
- Component variants using `class-variance-authority`

### App Router Structure

- `app/(discover)/` - Main marketplace pages (homepage, discovery)
- `app/mint/` - NFT minting and collection management
- `app/launch-pad/` - Project launch pages

## Key Technologies

- **Next.js 15** with App Router and React 19
- **TypeScript** with strict configuration
- **Tailwind CSS v4** for styling
- **Radix UI** primitives for accessible components
- **Framer Motion** for animations
- **React Hook Form** with Zod validation
- **Embla Carousel** for carousel functionality

## Path Aliases

```typescript
"@/*": ["./src/*"]
```

Shadcn components are aliased in `components.json`:

- `@/shared/components` for components
- `@/shared/components/ui` for UI components
- `@/shared/hooks` for hooks

## Environment Variables

- `NEXT_PUBLIC_APP_URL` - Application base URL (defaults to localhost:3000)

## External Image Domains

Configured in `next.config.ts`:

- `picsum.photos` - Placeholder images
- `assets.coingecko.com` - Cryptocurrency assets
- `placehold.co` - Additional placeholder service
