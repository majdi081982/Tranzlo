# Go Live Now (Tranzlo)

Use this checklist to put `tranzlo.net` live on Ubuntu 24.

## 1. DNS must already resolve

- `tranzlo.net` -> VPS public IP
- `www.tranzlo.net` -> VPS public IP
- `appwrite.tranzlo.net` -> VPS public IP
- `n8n.tranzlo.net` -> VPS public IP

## 2. Prepare production env on VPS

```bash
cd /opt/tranzlo
cp .env.production.example .env
nano .env
```

Set:
- `APP_BASE_URL=https://tranzlo.net`
- `NEXT_PUBLIC_SITE_URL=https://tranzlo.net`
- `APPWRITE_API_KEY` to a server key
- real webhook/payment secrets

## 3. Install TLS cert files expected by Nginx

Expected paths:
- `/opt/tranzlo/infra/nginx/certs/fullchain.pem`
- `/opt/tranzlo/infra/nginx/certs/privkey.pem`

If using Let's Encrypt with host certbot:

```bash
sudo certbot certonly --standalone -d tranzlo.net -d www.tranzlo.net -d appwrite.tranzlo.net -d n8n.tranzlo.net
sudo mkdir -p /opt/tranzlo/infra/nginx/certs
sudo cp /etc/letsencrypt/live/tranzlo.net/fullchain.pem /opt/tranzlo/infra/nginx/certs/fullchain.pem
sudo cp /etc/letsencrypt/live/tranzlo.net/privkey.pem /opt/tranzlo/infra/nginx/certs/privkey.pem
sudo chown -R $USER:$USER /opt/tranzlo/infra/nginx/certs
```

## 4. Launch

```bash
cd /opt/tranzlo
bash scripts/launch-live.sh
```

## 5. Verify publicly

- `https://tranzlo.net/api/health`
- `https://www.tranzlo.net`
- `https://appwrite.tranzlo.net/v1/health`
- `https://n8n.tranzlo.net`

## 6. Security after launch

- Rotate any API key that was ever shared in chat or committed accidentally.
- Keep `APPWRITE_API_KEY` only in server env files, never in client code or `NEXT_PUBLIC_*`.
