import { NodeSSH } from 'node-ssh';

const ssh = new NodeSSH();

async function cleanAndReinstallAppwrite() {
  await ssh.connect({
    host: '187.124.35.158',
    username: 'root',
    password: 'Cdromlg@8442',
    readyTimeout: 30000
  });

  console.log('Cleaning up existing Appwrite installation...');
  await ssh.execCommand('cd /root/appwrite && docker compose down -v || true');
  await ssh.execCommand('docker stop $(docker ps -q) || true');
  await ssh.execCommand('docker rm $(docker ps -aq) || true');
  await ssh.execCommand('rm -rf /root/appwrite');
  await ssh.execCommand('mkdir -p /root/appwrite');

  console.log('Downloading stable production Appwrite config...');
  // Use -L to follow redirects and -k to ignore SSL cert issues if any (but shouldn't)
  const downloadCmd = `
cd /root/appwrite
curl -L https://appwrite.io/install/compose -o docker-compose.yml
curl -L https://appwrite.io/install/env -o .env
  `;
  await ssh.execCommand(downloadCmd);

  console.log('Configuring .env and docker-compose.yml...');
  const configCmd = `
cd /root/appwrite
# Set ports to 8080/8443 in .env
# We need to make sure these variables exist in the downloaded .env
# If not, we add them.
if ! grep -q "_APP_ENV_HTTP_PORT" .env; then echo "_APP_ENV_HTTP_PORT=8080" >> .env; else sed -i "s/_APP_ENV_HTTP_PORT=80/_APP_ENV_HTTP_PORT=8080/g" .env; fi
if ! grep -q "_APP_ENV_HTTPS_PORT" .env; then echo "_APP_ENV_HTTPS_PORT=8443" >> .env; else sed -i "s/_APP_ENV_HTTPS_PORT=443/_APP_ENV_HTTPS_PORT=8443/g" .env; fi

# Set domains
sed -i "s/_APP_DOMAIN=localhost/_APP_DOMAIN=appwrite.tranzlo.tech/g" .env
sed -i "s/_APP_DOMAIN_TARGET=localhost/_APP_DOMAIN_TARGET=appwrite.tranzlo.tech/g" .env

# Generate random keys
for var in _APP_OPENSSL_KEY_V1 _APP_DB_ROOT_PASS _APP_REDIS_PASS; do
  secret=$(openssl rand -hex 32)
  # Check if it has a value or is empty
  if grep -q "^$var=$" .env || ! grep -q "^$var=" .env; then
    sed -i "s/^$var=.*/$var=$secret/g" .env || echo "$var=$secret" >> .env
  fi
done

# Force Traefik to use the environment variables for ports if it doesn't already
# The production compose uses them.
  `;
  await ssh.execCommand(configCmd);

  console.log('Starting Appwrite...');
  const startRes = await ssh.execCommand('cd /root/appwrite && docker compose pull && docker compose up -d');
  console.log(startRes.stdout);
  console.log(startRes.stderr);

  ssh.dispose();
}

cleanAndReinstallAppwrite().catch(console.error);
