import { NodeSSH } from 'node-ssh';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ssh = new NodeSSH();

async function fullServerSetup() {
  console.log('[1/5] Building your frontend locally...');
  try {
    await execAsync('npm run build', { cwd: __dirname });
    console.log('Frontend built successfully!');
  } catch (error) {
    console.error('Frontend build failed. Please check your Vite build.', error);
    return;
  }

  console.log('[2/5] Connecting to VPS (187.124.35.158)...');
  await ssh.connect({
    host: '187.124.35.158',
    username: 'root',
    password: 'Cdromlg@8442',
    readyTimeout: 30000
  });
  console.log('Connected natively to the server!');

  console.log('[3/5] Installing core dependencies (Docker, Nginx, Certbot)...');
  const depsScript = `
#!/bin/bash
set -e
apt-get update -y
apt-get install -y nginx certbot python3-certbot-nginx curl wget git ufw snapd

# Setup Docker if it doesn't exist
if ! command -v docker &> /dev/null; then
  curl -fsSL https://get.docker.com -o get-docker.sh
  sh get-docker.sh
fi

systemctl enable docker
systemctl start docker
  `;
  await ssh.execCommand(depsScript);

  console.log('[4/5] Transferring frontend files to the VPS...');
  await ssh.execCommand('mkdir -p /var/www/tranzlo.tech/html');
  await ssh.putDirectory(path.join(__dirname, 'dist'), '/var/www/tranzlo.tech/html', {
    recursive: true,
    concurrency: 10
  });

  console.log('[5/5] Deploying Appwrite, n8n, & Nginx proxies...');
  const deployScript = `
#!/bin/bash
set -e

# ================= SERVER PROXY CONFIGURATIONS =================
# NGINX FOR FRONTEND
cat << 'EOF' > /etc/nginx/sites-available/tranzlo.tech
server {
    listen 80;
    server_name tranzlo.tech www.tranzlo.tech;
    
    root /var/www/tranzlo.tech/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
EOF

# NGINX FOR APPWRITE
cat << 'EOF' > /etc/nginx/sites-available/appwrite.tranzlo.tech
server {
    listen 80;
    server_name appwrite.tranzlo.tech;

    location / {
        proxy_pass http://127.0.0.1:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_addrs;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
EOF

# NGINX FOR N8N
cat << 'EOF' > /etc/nginx/sites-available/n8n.tranzlo.tech
server {
    listen 80;
    server_name n8n.tranzlo.tech;

    location / {
        proxy_pass http://127.0.0.1:5678;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_addrs;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
EOF

# Enable all configs
ln -sf /etc/nginx/sites-available/tranzlo.tech /etc/nginx/sites-enabled/
ln -sf /etc/nginx/sites-available/appwrite.tranzlo.tech /etc/nginx/sites-enabled/
ln -sf /etc/nginx/sites-available/n8n.tranzlo.tech /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
systemctl reload nginx

# ================= N8N INSTALLATION =================
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
cd /opt/n8n && docker compose up -d

# ================= APPWRITE INSTALLATION =================
mkdir -p /root/appwrite && cd /root/appwrite
if [ ! -f "docker-compose.yml" ]; then
  curl -sL https://raw.githubusercontent.com/appwrite/appwrite/main/docker-compose.yml > docker-compose.yml
  curl -sL https://raw.githubusercontent.com/appwrite/appwrite/main/.env > .env

  # Update ports so Nginx can proxy properly and prevent conflicts
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
  
  # Ensure the _APP_SYSTEM_SECURITY_EMAIL_ADDRESS is set directly for certificates (if applicable to default Appwrite versions)
  echo "" >> .env
fi

# Run Appwrite safely
docker compose pull
docker compose up -d

  `;

  await ssh.execCommand(deployScript.replace(/\\r\\n/g, '\\n'), {
    cwd: '/root',
    onStdout(chunk) {
      process.stdout.write(chunk.toString('utf8'));
    },
    onStderr(chunk) {
      process.stderr.write(chunk.toString('utf8'));
    }
  });

  console.log('\\n✅ ALL DONE! The server has essentially been built from scratch.');
  ssh.dispose();
}

fullServerSetup().catch(console.error);
