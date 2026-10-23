# Production image for the G DRIVE website (Next.js standalone output + Payload CMS).
# Build:  docker build -t gdrive-web \
#           --build-arg NEXT_PUBLIC_SITE_URL=https://www.example.com \
#           --build-arg NEXT_PUBLIC_ALLOW_INDEXING=true \
#           --build-arg NEXT_PUBLIC_TURNSTILE_SITE_KEY=... .
# Run:    docker run -p 3000:3000 --env-file .env.production gdrive-web
# See docs/DEPLOYMENT.md for every variable.

FROM node:24-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

FROM base AS deps
COPY package.json package-lock.json .npmrc ./
RUN npm ci --no-audit --no-fund

FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# NEXT_PUBLIC_* values are compiled into the browser bundle, so they must be known at build time.
ARG NEXT_PUBLIC_SITE_URL
ARG NEXT_PUBLIC_ALLOW_INDEXING=false
ARG NEXT_PUBLIC_TURNSTILE_SITE_KEY
ARG NEXT_PUBLIC_LEGAL_APPROVED=false
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL \
    NEXT_PUBLIC_ALLOW_INDEXING=$NEXT_PUBLIC_ALLOW_INDEXING \
    NEXT_PUBLIC_TURNSTILE_SITE_KEY=$NEXT_PUBLIC_TURNSTILE_SITE_KEY \
    NEXT_PUBLIC_LEGAL_APPROVED=$NEXT_PUBLIC_LEGAL_APPROVED
RUN npm run build

FROM base AS runner
ENV NODE_ENV=production \
    PORT=3000 \
    HOSTNAME=0.0.0.0
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Uploaded media lives here when S3 storage is not configured; mount a persistent volume.
RUN mkdir -p /app/media && chown nextjs:nodejs /app/media
VOLUME ["/app/media"]

USER nextjs
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=40s --retries=3 \
  CMD wget -qO- http://127.0.0.1:3000/healthz || exit 1

# Database migrations in src/migrations run automatically when Payload starts.
CMD ["node", "server.js"]
