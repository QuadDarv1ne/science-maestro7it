#!/bin/sh
set -e

if [ -f "prisma/schema.prisma" ] && [ -n "$DATABASE_URL" ]; then
  echo "Running Prisma schema push..."
  bunx prisma db push --skip-generate --accept-data-loss 2>&1 || true
fi

echo "Starting application..."
exec bun server.js
