# Route Mapping Summary

## Available Routes in App Directory

### Main Routes

- `/` (homepage - via (discover)/page.tsx)
- `/discover`
- `/discover/[slug]`
- `/marketplace`
- `/marketplace/[slug]`
- `/collections`
- `/collections/[slug]`
- `/auctions`
- `/auctions/[slug]`
- `/stats`
- `/launch-pad`
- `/launch-pad/[slug]`
- `/wallets`
- `/create` (Create hub - choose between NFT or Collection)
- `/create/collection` (Create new collection form)

### Minting Routes

- `/mint/create` (Create/mint NFT in collection)
- `/mint/create-or-manage` (Manage existing collections)

### Profile Routes

- `/profile`
- `/profile/me`
- `/profile/settings`
- `/profile/[username]`
- `/profile/[username]/nfts`
- `/profile/[username]/collections`
- `/profile/[username]/activity`
- `/profile/[username]/favorites`
- `/profile/address/[address]`

### NFT Detail Routes

- `/nft/[slug]`

## Navigation Menu Configuration (Updated)

### Main Navigation Items

1. **Marketplace** → `/marketplace` ✅
2. **Collections** → `/collections` ✅
3. **Stats** → `/stats` ✅
4. **Launchpad** → `/launch-pad` ✅
5. **Create** (Dropdown):
   - Create Collection → `/mint/create` ✅
   - Manage Collections → `/mint/create-or-manage` ✅

## Fixed Issues

1. ❌ Removed "Create NFT" → `/mint/create/nft` (route doesn't exist)
2. ✅ Fixed CreateHub component: Changed `/mint` → `/mint/create`
3. ✅ All navigation links now point to existing routes

## Create Flow

- `/create` - Hub page with two options:
  - Create NFT → `/mint/create` (mint to existing collection)
  - Create Collection → `/create/collection` (create new collection)
