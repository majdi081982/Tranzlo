import { NodeSSH } from 'node-ssh';

const ssh = new NodeSSH();

async function appwriteReleaseInstall() {
  console.log('Connecting to VPS...');
  await ssh.connect({
    host: '187.124.35.158',
    username: 'root',
    password: 'Cdromlg@8442',
    readyTimeout: 30000
  });

  console.log('Fetching latest Appwrite release tag...');
  const res = await fetch('https://api.github.com/repos/appwrite/appwrite/releases/latest');
  const data = await res.json();
  const tag = data.tag_name; // e.g., 1.4.13
  console.log('Latest Appwrite release tag:', tag);

  const script = `
mkdir -p /root/appwrite && cd /root/appwrite
# Remove any bad dev compose files
rm -f docker-compose.yml .env

# Download production version using the exact tag
curl -sL https://raw.githubusercontent.com/appwrite/appwrite/${tag}/docker-compose.yml > docker-compose.yml
curl -sL https://raw.githubusercontent.com/appwrite/appwrite/${tag}/.env > .env

# Update ports for proxy
sed -i 's/_APP_ENV_HTTP_PORT=80/_APP_ENV_HTTP_PORT=8080/g' .env
sed -i 's/_APP_ENV_HTTPS_PORT=443/_APP_ENV_HTTPS_PORT=8443/g' .env
sed -i 's/_APP_DOMAIN=localhost/_APP_DOMAIN=appwrite.tranzlo.tech/g' .env
sed -i 's/_APP_DOMAIN_TARGET=localhost/_APP_DOMAIN_TARGET=appwrite.tranzlo.tech/g' .env

# Provide initial required random variables
for var in _APP_OPENSSL_KEY_V1 _APP_DB_ROOT_PASS _APP_REDIS_PASS _APP_SYSTEM_SECURITY_EMAIL_ADDRESS; do
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

  console.log('Running script on server...');
  await ssh.execCommand(script.replace(/\r\n/g, '\n'), {
    cwd: '/root',
    onStdout(chunk) {
      process.stdout.write(chunk.toString('utf8'));
    },
    onStderr(chunk) {
      process.stderr.write(chunk.toString('utf8'));
    }
  });

  console.log('\n✅ Appwrite installed perfectly!');
  ssh.dispose();
}

appwriteReleaseInstall().catch(console.error);
