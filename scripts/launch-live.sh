#!/usr/bin/env bash
set -euo pipefail

REPO_DIR=${REPO_DIR:-/opt/tranzlo}
cd "$REPO_DIR"

bash scripts/preflight-live.sh
docker compose pull
docker compose build frontend
docker compose up -d
docker compose ps

echo "Smoke test endpoints:"
echo "  https://tranzlo.net/api/health"
echo "  https://appwrite.tranzlo.net/v1/health"
echo "  https://n8n.tranzlo.net/healthz"
