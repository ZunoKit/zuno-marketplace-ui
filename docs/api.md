# API Documentation

## Overview

Zuno Marketplace uses a service layer pattern to interact with backend APIs and blockchain.

## API Client

### Base Configuration

```typescript
// src/shared/api/client.ts
import { apiClient } from "@/shared/api/client";

// Make requests
const data = await apiClient.get("/endpoint");
const result = await apiClient.post("/endpoint", { data });
```

### Configuration

Set API URL in environment variables:

```bash
NEXT_PUBLIC_API_URL=https://api.example.com
```

## Services

### NFT Service

```typescript
import { nftService } from "@/shared/services";

// List NFTs
const { data, total } = await nftService.list({
  page: 1,
  limit: 20,
  sort: "price_desc",
});

// Get NFT by ID
const nft = await nftService.getById("nft-id");

// Get NFTs by collection
const collectionNfts = await nftService.getByCollection("collection-id", {
  page: 1,
  limit: 20,
});

// Get NFTs by owner
const ownedNfts = await nftService.getByOwner("0xAddress", {
  page: 1,
  limit: 20,
});
```

### Collection Service

```typescript
import { collectionService } from "@/shared/services";

// List collections
const { data, total } = await collectionService.list({
  page: 1,
  limit: 20,
  sort: "volume",
});

// Get collection by ID
const collection = await collectionService.getById("collection-id");

// Get trending collections
const trending = await collectionService.getTrending(10);

// Get featured collections
const featured = await collectionService.getFeatured(10);
```

### Blockchain Service

```typescript
import { blockchainService } from "@/shared/services";

// Connect wallet
const address = await blockchainService.connectWallet();

// Disconnect wallet
await blockchainService.disconnectWallet();

// Get current account
const account = await blockchainService.getCurrentAccount();

// Switch network
await blockchainService.switchNetwork(1); // Ethereum

// Sign message
const signature = await blockchainService.signMessage("Hello World");

// Mint NFT
const txHash = await blockchainService.mintNFT("0xContractAddress", metadata);

// Transfer NFT
const txHash = await blockchainService.transferNFT(
  "0xContractAddress",
  "tokenId",
  "0xRecipient"
);
```

## Data Types

### NFT

```typescript
interface NFT {
  id: string;
  tokenId: string;
  name: string;
  description: string;
  image: string;
  collectionId: string;
  owner: string;
  creator: string;
  price?: string;
  attributes?: Array<{
    trait_type: string;
    value: string | number;
  }>;
}
```

### Collection

```typescript
interface Collection {
  id: string;
  name: string;
  description: string;
  image: string;
  banner?: string;
  creator: string;
  totalSupply: number;
  floorPrice?: string;
  volumeTraded?: string;
  chain: string;
}
```

### Chain Configuration

```typescript
interface Chain {
  id: number;
  name: string;
  network: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  rpcUrls: {
    default: { http: string[] };
    public: { http: string[] };
  };
  blockExplorers: {
    default: { name: string; url: string };
  };
  testnet?: boolean;
}
```

## Error Handling

### API Errors

```typescript
try {
  const data = await nftService.list();
} catch (error) {
  console.error("API Error:", error);
  // Handle error
}
```

### Blockchain Errors

```typescript
try {
  await blockchainService.connectWallet();
} catch (error) {
  if (error.code === 4001) {
    // User rejected request
  } else if (error.code === -32002) {
    // Request pending
  }
}
```

## Rate Limiting

API requests may be rate-limited. Handle accordingly:

```typescript
const RATE_LIMIT = 100; // requests per minute
const RATE_WINDOW = 60000; // 1 minute in ms

// Implement rate limiting logic
```

## Caching

### Client-Side Caching

```typescript
// Use React Query or SWR
import { useQuery } from "@tanstack/react-query";

function useNFTs() {
  return useQuery({
    queryKey: ["nfts"],
    queryFn: () => nftService.list(),
    staleTime: 60000, // 1 minute
  });
}
```

### Server-Side Caching

```typescript
// Next.js Server Components
export default async function NFTList() {
  const nfts = await nftService.list();

  return <NFTGrid nfts={nfts} />;
}
```

## Authentication

### Wallet Authentication

```typescript
// 1. Connect wallet
const address = await blockchainService.connectWallet();

// 2. Request signature
const message = `Sign this message to authenticate: ${Date.now()}`;
const signature = await blockchainService.signMessage(message);

// 3. Verify signature on backend
const token = await apiClient.post("/auth/verify", {
  address,
  message,
  signature,
});

// 4. Use token for authenticated requests
apiClient.setAuthToken(token);
```

## WebSocket (Future)

For real-time updates:

```typescript
// Connect to WebSocket
const ws = new WebSocket("wss://api.example.com/ws");

// Listen for events
ws.addEventListener("message", (event) => {
  const data = JSON.parse(event.data);

  switch (data.type) {
    case "new_listing":
      // Handle new listing
      break;
    case "sale":
      // Handle sale
      break;
  }
});
```

## Best Practices

1. **Use services for all API calls** - Don't use fetch directly
2. **Handle errors gracefully** - Show user-friendly messages
3. **Implement loading states** - Show spinners/skeletons
4. **Cache responses** - Reduce unnecessary requests
5. **Type all responses** - Use TypeScript interfaces
6. **Validate data** - Use Zod or similar
7. **Retry failed requests** - Implement retry logic
8. **Log errors** - Send to monitoring service

## Examples

### Fetching NFTs in a Component

```typescript
'use client';

import { useState, useEffect } from 'react';
import { nftService, type NFT } from '@/shared/services';

export function NFTList() {
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    nftService.list({ limit: 20 })
      .then(({ data }) => setNfts(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Skeleton />;

  return (
    <div className="grid grid-cols-4 gap-4">
      {nfts.map(nft => (
        <NFTCard key={nft.id} nft={nft} />
      ))}
    </div>
  );
}
```

### Server Component (Recommended)

```typescript
import { nftService } from '@/shared/services';

export default async function NFTPage() {
  const { data: nfts } = await nftService.list({ limit: 20 });

  return (
    <div className="grid grid-cols-4 gap-4">
      {nfts.map(nft => (
        <NFTCard key={nft.id} nft={nft} />
      ))}
    </div>
  );
}
```

## API Endpoints (Backend Reference)

### NFTs

- `GET /nfts` - List NFTs
- `GET /nfts/:id` - Get NFT by ID
- `GET /collections/:id/nfts` - Get NFTs by collection
- `GET /owners/:address/nfts` - Get NFTs by owner

### Collections

- `GET /collections` - List collections
- `GET /collections/:id` - Get collection by ID
- `GET /collections/trending` - Get trending collections
- `GET /collections/featured` - Get featured collections

### User

- `GET /users/:address` - Get user profile
- `GET /users/:address/activity` - Get user activity
- `PUT /users/:address` - Update user profile

### Auth

- `POST /auth/verify` - Verify wallet signature
- `POST /auth/refresh` - Refresh auth token
- `POST /auth/logout` - Logout

## Testing APIs

### Unit Tests

```typescript
import { describe, it, expect, vi } from "vitest";
import { nftService } from "@/shared/services";

describe("NFT Service", () => {
  it("should fetch NFTs", async () => {
    const result = await nftService.list();
    expect(result.data).toBeInstanceOf(Array);
  });
});
```

### Mock API Responses

```typescript
vi.mock("@/shared/api/client", () => ({
  apiClient: {
    get: vi.fn().mockResolvedValue({
      data: [{ id: "1", name: "Test NFT" }],
      total: 1,
    }),
  },
}));
```
