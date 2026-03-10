import { NodeSSH } from 'node-ssh';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ssh = new NodeSSH();

async function deploy() {
  console.log('Connecting to VPS...');
  await ssh.connect({
    host: '187.124.35.158',
    username: 'root',
    password: 'Cdromlg@8442',
    readyTimeout: 20000
  });
  console.log('Connected!');

  // Transfer frontend
  console.log('Copying frontend files...');
  await ssh.execCommand('mkdir -p /var/www/tranzlo.tech/html');
  
  // node-ssh putDirectory
  await ssh.putDirectory(path.join(__dirname, 'dist'), '/var/www/tranzlo.tech/html', {
    recursive: true,
    concurrency: 10,
    validate: (itemPath) => true,
    tick: (localPath, remotePath, error) => {
      if (error) {
        console.error(`Failed: ${localPath} -> ${remotePath}`, error);
      }
    }
  });
  console.log('Frontend files copied successfully.');

  // Create a setup script on the VPS
  console.log('Running setup commands on VPS...');
  
  const setupScript = `
#!/bin/bash
set -e

# Setup Nginx for frontend, n8n, Appwrite
apt-get update
apt-get install -y nginx certbot python3-certbot-nginx docker-compose-plugin

# Create nginx config for tranzlo.tech frontend
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

# Setup n8n docker-compose
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

cd /opt/n8n
docker compose up -d

# Check if Nginx config needs enabling
ln -sf /etc/nginx/sites-available/tranzlo.tech /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
systemctl reload nginx

# Install Appwrite (non-interactive by pre-filling or we'll give instructions for Appwrite)
echo "Setup script finished."
`;

  await ssh.execCommand(setupScript.replace(/\r\n/g, '\n'), {
    cwd: '/root',
    onStdout(chunk) {
      process.stdout.write(chunk.toString('utf8'));
    },
    onStderr(chunk) {
      process.stderr.write(chunk.toString('utf8'));
    }
  });

  console.log('Deployment steps run on server. Disconnecting...');
  ssh.dispose();
}

deploy().catch(console.error);
