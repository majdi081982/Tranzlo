# Deployment Guide for Ubuntu 24 VPS

## Provisioning

1. Create an Ubuntu 24.04 VPS.
2. Create a non-root sudo user.
3. Install Docker Engine and Docker Compose plugin.
4. Clone the repository into `/opt/tranzlo`.
5. Copy environment files and fill in production secrets.

## DNS

Point these records to the VPS public IP before requesting TLS certificates:

- `tranzlo.net`
- `www.tranzlo.net`
- `appwrite.tranzlo.net`
- `n8n.tranzlo.net`

## Environment

- Root environment variables live in `/opt/tranzlo/.env`.
- Web-specific variables live in `/opt/tranzlo/apps/web/.env.production`.
- Make sure `N8N_PUBLIC_WEBHOOK_BASE` uses `https://n8n.tranzlo.net/webhook`.

## Build and Start

```bash
docker compose pull
docker compose build --no-cache frontend
docker compose up -d
```

## TLS

- Terminate TLS at Nginx.
- Use Let’s Encrypt via Certbot or an external certificate manager.
- Mount certificates into the Nginx container or use host-based renewal plus mounted volume.

## Appwrite Notes

- For production, replace the simplified service definition in [`docker-compose.yml`](/C:/Users/molo/Documents/Tranzlo/docker-compose.yml) with the full official Appwrite stack when you move beyond MVP bootstrap.
- Keep Appwrite behind Nginx and only expose internal ports on the Docker network.

## n8n Notes

- Set `N8N_HOST`, `N8N_PROTOCOL`, and `WEBHOOK_URL` to the public `n8n.tranzlo.net` address.
- Route both `/` and webhook paths through Nginx.

## Zero-Downtime Deployment Suggestion

- Build the new frontend image in GitHub Actions.
- Push to a container registry.
- Pull on the VPS and restart only the frontend container.
- Run smoke checks against homepage, pricing, login, jobs, and `/api/health`.
