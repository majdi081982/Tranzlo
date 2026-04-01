#!/usr/bin/env bash
set -euo pipefail

REPO_DIR=${REPO_DIR:-/opt/tranzlo}
cd "$REPO_DIR"

if [[ ! -f .env ]]; then
  echo "Missing .env in $REPO_DIR"
  exit 1
fi

source .env

required_vars=(
  APP_DOMAIN
  APP_BASE_URL
  NEXT_PUBLIC_SITE_URL
  NEXT_PUBLIC_APPWRITE_ENDPOINT
  NEXT_PUBLIC_APPWRITE_PROJECT_ID
  APPWRITE_API_KEY
)

for v in "${required_vars[@]}"; do
  if [[ -z "${!v:-}" ]]; then
    echo "Missing required env var: $v"
    exit 1
  fi
done

if [[ "$APP_BASE_URL" == *"localhost"* ]] || [[ "$NEXT_PUBLIC_SITE_URL" == *"localhost"* ]]; then
  echo "Production URL still points to localhost. Fix APP_BASE_URL and NEXT_PUBLIC_SITE_URL."
  exit 1
fi

if [[ ! -f infra/nginx/certs/fullchain.pem ]] || [[ ! -f infra/nginx/certs/privkey.pem ]]; then
  echo "TLS cert files missing at infra/nginx/certs/fullchain.pem and privkey.pem"
  echo "Provision certs before launch (Let's Encrypt or your provider)."
  exit 1
fi

echo "Preflight checks passed."
