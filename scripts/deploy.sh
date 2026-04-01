#!/usr/bin/env bash
set -euo pipefail

REPO_DIR=${REPO_DIR:-/opt/tranzlo}

cd "$REPO_DIR"
bash scripts/launch-live.sh
