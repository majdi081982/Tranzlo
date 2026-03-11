import { NodeSSH } from 'node-ssh';

const ssh = new NodeSSH();

async function manualInstallAppwrite() {
  await ssh.connect({
    host: '187.124.35.158',
    username: 'root',
    password: 'Cdromlg@8442',
    readyTimeout: 30000
  });

  console.log('Downloading Appwrite production files via official installer URLs...');
  
  const setupCmd = `
mkdir -p /root/appwrite && cd /root/appwrite
# Use -L to follow redirects
curl -L https://appwrite.io/install/compose -o docker-compose.yml
curl -L https://appwrite.io/install/env -o .env

# Verify downloads
if [ ! -s docker-compose.yml ]; then echo "Error: docker-compose.yml is empty"; exit 1; fi
if [ ! -s .env ]; then echo "Error: .env is empty"; exit 1; fi

# Update ports
sed -i 's/_APP_ENV_HTTP_PORT=80/_APP_ENV_HTTP_PORT=8080/g' .env
sed -i 's/_APP_ENV_HTTPS_PORT=443/_APP_ENV_HTTPS_PORT=8443/g' .env
sed -i 's/_APP_DOMAIN=localhost/_APP_DOMAIN=appwrite.tranzlo.tech/g' .env
sed -i 's/_APP_DOMAIN_TARGET=localhost/_APP_DOMAIN_TARGET=appwrite.tranzlo.tech/g' .env

# Generate secure random variables
for var in _APP_OPENSSL_KEY_V1 _APP_DB_ROOT_PASS _APP_REDIS_PASS; do
  secret=$(openssl rand -hex 32)
  if grep -q "^$var=$" .env; then
    sed -i "s/^$var=$/$var=$secret/g" .env
  else
    echo "$var=$secret" >> .env
  fi
done

docker compose pull
docker compose up -d
  `;
  
  const res = await ssh.execCommand(setupCmd);
  console.log(res.stdout);
  console.log(res.stderr);

  ssh.dispose();
}

manualInstallAppwrite().catch(console.error);
