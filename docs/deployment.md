# Deployment Guide

## Prerequisites

- Node.js 18.x or higher
- pnpm 8.x or higher
- Git

## Build for Production

```bash
# Install dependencies
pnpm install

# Run type checking
pnpm check-types

# Run linting
pnpm lint

# Run tests
pnpm test:run

# Build application
pnpm build
```

## Environment Variables

### Required Variables

```bash
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

### Optional Variables

```bash
# API Configuration
NEXT_PUBLIC_API_URL=https://api.your-domain.com

# Blockchain RPC URLs
NEXT_PUBLIC_ETHEREUM_RPC=https://eth.llamarpc.com
NEXT_PUBLIC_POLYGON_RPC=https://polygon-rpc.com
NEXT_PUBLIC_BSC_RPC=https://bsc-dataseed.binance.org

# Analytics (if using)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_MIXPANEL_TOKEN=your-token

# Error Monitoring (if using)
SENTRY_DSN=https://xxx@sentry.io/xxx
```

## Deployment Options

### 1. Vercel (Recommended)

#### Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/ZunoKit/zuno-marketplace-ui)

#### Manual Deploy

```bash
# Install Vercel CLI
pnpm add -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

#### Configuration

Create `vercel.json`:

```json
{
  "framework": "nextjs",
  "buildCommand": "pnpm build",
  "devCommand": "pnpm dev",
  "installCommand": "pnpm install",
  "regions": ["iad1"],
  "env": {
    "NEXT_PUBLIC_APP_URL": "@app-url"
  }
}
```

### 2. Docker

#### Build Docker Image

```bash
# Build image
docker build -t zuno-marketplace .

# Run container
docker run -p 3000:3000 zuno-marketplace
```

#### Dockerfile

Create `Dockerfile`:

```dockerfile
FROM node:18-alpine AS base

# Install pnpm
RUN npm install -g pnpm

# Dependencies
FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Builder
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm build

# Runner
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
```

#### Docker Compose

Create `docker-compose.yml`:

```yaml
version: "3.8"

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_APP_URL=http://localhost:3000
    restart: unless-stopped
```

### 3. Self-Hosted (VPS)

#### Setup Server

```bash
# Connect to server
ssh user@your-server.com

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install pnpm
npm install -g pnpm

# Install PM2
npm install -g pm2
```

#### Deploy Application

```bash
# Clone repository
git clone https://github.com/ZunoKit/zuno-marketplace-ui.git
cd zuno-marketplace-ui

# Install dependencies
pnpm install

# Build application
pnpm build

# Start with PM2
pm2 start npm --name "zuno-marketplace" -- start

# Save PM2 config
pm2 save
pm2 startup
```

#### Nginx Configuration

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

#### SSL with Certbot

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d your-domain.com
```

### 4. AWS Amplify

```bash
# Install Amplify CLI
npm install -g @aws-amplify/cli

# Configure Amplify
amplify configure

# Initialize Amplify
amplify init

# Add hosting
amplify add hosting

# Deploy
amplify publish
```

### 5. Netlify

#### netlify.toml

```toml
[build]
  command = "pnpm build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

#### Deploy

```bash
# Install Netlify CLI
pnpm add -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod
```

## CI/CD Pipeline

See workflows in `.github/workflows/`:

- `ci.yml` - Continuous Integration
- `deploy.yml` - Automated Deployment

## Post-Deployment Checklist

- [ ] Verify all pages load correctly
- [ ] Test wallet connection
- [ ] Verify API endpoints work
- [ ] Check responsive design on mobile
- [ ] Test cross-browser compatibility
- [ ] Verify SEO meta tags
- [ ] Check analytics integration
- [ ] Test error monitoring
- [ ] Verify SSL certificate
- [ ] Check performance metrics
- [ ] Test all critical user flows

## Monitoring

### Performance Monitoring

- Use Vercel Analytics
- Use Lighthouse CI
- Monitor Core Web Vitals

### Error Monitoring

- Setup Sentry or similar
- Monitor error rates
- Set up alerts

### Uptime Monitoring

- Use UptimeRobot or similar
- Monitor API endpoints
- Set up notifications

## Rollback Strategy

### Vercel

```bash
# List deployments
vercel ls

# Rollback to previous deployment
vercel rollback [deployment-url]
```

### Docker

```bash
# Keep previous images
docker tag zuno-marketplace:latest zuno-marketplace:backup

# Rollback
docker run -p 3000:3000 zuno-marketplace:backup
```

### PM2

```bash
# Rollback code
git checkout previous-commit

# Rebuild
pnpm install
pnpm build

# Restart
pm2 restart zuno-marketplace
```

## Scaling

### Horizontal Scaling

- Use load balancer (Nginx, AWS ELB)
- Deploy multiple instances
- Use Redis for session storage

### Vertical Scaling

- Increase server resources
- Optimize Node.js memory limits
- Use caching strategies

### CDN

- Use Vercel Edge Network
- Or CloudFlare CDN
- Cache static assets

## Troubleshooting

### Build Fails

```bash
# Clear cache
rm -rf .next node_modules
pnpm install
pnpm build
```

### Performance Issues

```bash
# Analyze bundle size
pnpm add -D @next/bundle-analyzer
```

### Memory Issues

```bash
# Increase Node.js memory
NODE_OPTIONS=--max_old_space_size=4096 pnpm build
```

## Support

- GitHub Issues: [https://github.com/ZunoKit/zuno-marketplace-ui/issues](https://github.com/ZunoKit/zuno-marketplace-ui/issues)
- Discord: [https://discord.gg/zuno](https://discord.gg/zuno)
- Email: support@zuno.xyz
