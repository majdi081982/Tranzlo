import { NodeSSH } from 'node-ssh';

const ssh = new NodeSSH();

async function installAppwriteManual() {
  await ssh.connect({
    host: '187.124.35.158',
    username: 'root',
    password: 'Cdromlg@8442',
    readyTimeout: 20000
  });

  console.log('Connected! Setting up Appwrite manually...');

  const commands = `
mkdir -p /root/appwrite && cd /root/appwrite
curl -sL https://raw.githubusercontent.com/appwrite/appwrite/main/docker-compose.yml > docker-compose.yml
curl -sL https://raw.githubusercontent.com/appwrite/appwrite/main/.env > .env

# Replace default ports and hostnames in .env
sed -i 's/_APP_ENV_HTTP_PORT=80/_APP_ENV_HTTP_PORT=8080/g' .env
sed -i 's/_APP_ENV_HTTPS_PORT=443/_APP_ENV_HTTPS_PORT=8443/g' .env
sed -i 's/_APP_DOMAIN=localhost/_APP_DOMAIN=appwrite.tranzlo.tech/g' .env
sed -i 's/_APP_DOMAIN_TARGET=localhost/_APP_DOMAIN_TARGET=appwrite.tranzlo.tech/g' .env

# Generate random secure passwords for DBs and Redis if empty
# The default Appwrite .env usually has generic ones or we can leave default as it runs locally

# Start Appwrite
docker compose pull
docker compose up -d

# Setup Nginx proxy
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

ln -sf /etc/nginx/sites-available/appwrite.tranzlo.tech /etc/nginx/sites-enabled/
systemctl reload nginx
`;

  console.log('Running script on server...');
  await ssh.execCommand(commands.replace(/\r\n/g, '\n'), {
    cwd: '/root',
    onStdout(chunk) {
      process.stdout.write(chunk.toString('utf8'));
    },
    onStderr(chunk) {
      process.stderr.write(chunk.toString('utf8'));
    }
  });

  console.log('Appwrite installation and proxy setup complete.');
  ssh.dispose();
}

installAppwriteManual().catch(console.error);
