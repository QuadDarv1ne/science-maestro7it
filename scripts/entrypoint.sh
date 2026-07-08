#!/bin/sh
set -e

echo "Starting application..."
exec bun server.js
