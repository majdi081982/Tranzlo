import { NodeSSH } from 'node-ssh';

const ssh = new NodeSSH();

async function fixAppwriteCompose() {
  console.log('Connecting to VPS...');
  await ssh.connect({
    host: '187.124.35.158',
    username: 'root',
    password: 'Cdromlg@8442',
    readyTimeout: 30000
  });

  const commands = `
cd /root/appwrite
# Remove the broken dev compose files
rm -f docker-compose.yml .env

# Pull the stable Appwrite image to extract the proper production compose files
docker pull appwrite/appwrite:latest
docker run --rm appwrite/appwrite:latest cat docker-compose.yml > docker-compose.yml
docker run --rm appwrite/appwrite:latest cat .env > .env

# Update ports
sed -i 's/_APP_ENV_HTTP_PORT=80/_APP_ENV_HTTP_PORT=8080/g' .env
sed -i 's/_APP_ENV_HTTPS_PORT=443/_APP_ENV_HTTPS_PORT=8443/g' .env
sed -i 's/_APP_DOMAIN=localhost/_APP_DOMAIN=appwrite.tranzlo.tech/g' .env
sed -i 's/_APP_DOMAIN_TARGET=localhost/_APP_DOMAIN_TARGET=appwrite.tranzlo.tech/g' .env

# Provide initial required random variables
for var in _APP_OPENSSL_KEY_V1 _APP_DB_ROOT_PASS _APP_REDIS_PASS; do
  secret=$(openssl rand -hex 32)
  if grep -q "^$var=$" .env; then
    sed -i "s/^$var=$/$var=$secret/g" .env
  else
    echo "$var=$secret" >> .env
  fi
done

# Start the stable version
docker compose pull
docker compose up -d
  `;

  console.log('Running Appwrite docker compose setup from official image...');
  await ssh.execCommand(commands.replace(/\r\n/g, '\n'), {
    cwd: '/root',
    onStdout(chunk) {
      process.stdout.write(chunk.toString('utf8'));
    },
    onStderr(chunk) {
      process.stderr.write(chunk.toString('utf8'));
    }
  });

  console.log('\n✅ Appwrite docker compose complete!');
  ssh.dispose();
}

fixAppwriteCompose().catch(console.error);
