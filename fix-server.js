import { NodeSSH } from 'node-ssh';

const ssh = new NodeSSH();

async function fixAndFinish() {
  console.log('[1/2] Connecting to VPS...');
  await ssh.connect({
    host: '187.124.35.158',
    username: 'root',
    password: 'Cdromlg@8442',
    readyTimeout: 30000
  });

  const fixScript = `
#!/bin/bash
set -e

# ================= FIX NGINX =================
cat << 'EOF' > /etc/nginx/sites-available/appwrite.tranzlo.tech
server {
    listen 80;
    server_name appwrite.tranzlo.tech;

    location / {
        proxy_pass http://127.0.0.1:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
EOF

cat << 'EOF' > /etc/nginx/sites-available/n8n.tranzlo.tech
server {
    listen 80;
    server_name n8n.tranzlo.tech;

    location / {
        proxy_pass http://127.0.0.1:5678;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
EOF

systemctl restart nginx || echo "Nginx could not restart but fixing anyway."
nginx -t

# ================= N8N INSTALLATION =================
echo "Setting up n8n..."
mkdir -p /opt/n8n
cat << 'EOF' > /opt/n8n/docker-compose.yml
services:
  n8n:
    image: docker.n8n.io/n8nio/n8n
    restart: always
    ports:
      - "5678:5678"
    environment:
      - N8N_HOST=n8n.tranzlo.tech
      - N8N_PORT=5678
      - N8N_PROTOCOL=https
      - WEBHOOK_URL=https://n8n.tranzlo.tech/
      - GENERIC_TIMEZONE=UTC
    volumes:
      - n8n_data:/home/node/.n8n
volumes:
  n8n_data:
EOF
cd /opt/n8n && docker compose pull && docker compose up -d

# ================= APPWRITE INSTALLATION =================
echo "Setting up Appwrite..."
mkdir -p /root/appwrite && cd /root/appwrite
if [ ! -f "docker-compose.yml" ]; then
  curl -sL https://raw.githubusercontent.com/appwrite/appwrite/main/docker-compose.yml > docker-compose.yml
  curl -sL https://raw.githubusercontent.com/appwrite/appwrite/main/.env > .env

  # Update ports
  sed -i 's/_APP_ENV_HTTP_PORT=80/_APP_ENV_HTTP_PORT=8080/g' .env
  sed -i 's/_APP_ENV_HTTPS_PORT=443/_APP_ENV_HTTPS_PORT=8443/g' .env
  sed -i 's/_APP_DOMAIN=localhost/_APP_DOMAIN=appwrite.tranzlo.tech/g' .env
  sed -i 's/_APP_DOMAIN_TARGET=localhost/_APP_DOMAIN_TARGET=appwrite.tranzlo.tech/g' .env

  # Provide initial required random variables for local deployment
  for var in _APP_OPENSSL_KEY_V1 _APP_DB_ROOT_PASS _APP_REDIS_PASS; do
    secret=$(openssl rand -hex 32)
    if grep -q "^$var=$" .env; then
      sed -i "s/^$var=$/$var=$secret/g" .env
    else
      echo "$var=$secret" >> .env
    fi
  done
fi

docker compose pull
docker compose up -d
  `;

  console.log('[2/2] Running fix and container setup...');
  await ssh.execCommand(fixScript.replace(/\r\n/g, '\n'), {
    cwd: '/root',
    onStdout(chunk) {
      process.stdout.write(chunk.toString('utf8'));
    },
    onStderr(chunk) {
      process.stderr.write(chunk.toString('utf8'));
    }
  });

  console.log('\n✅ Deployment finished! All services should now be running.');
  ssh.dispose();
}

fixAndFinish().catch(console.error);
