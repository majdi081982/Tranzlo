import { NodeSSH } from 'node-ssh';

const ssh = new NodeSSH();

async function fixAppwrite() {
  await ssh.connect({
    host: '187.124.35.158',
    username: 'root',
    password: 'Cdromlg@8442',
    readyTimeout: 20000
  });

  console.log('Connected! Fixing Appwrite...');

  const commands = `
cd /root/appwrite
# Get the production docker-compose and .env from the official container
docker run --rm appwrite/appwrite:latest cat docker-compose.yml > docker-compose.yml
docker run --rm appwrite/appwrite:latest cat .env > .env

# Replace default ports and hostnames in .env
sed -i 's/_APP_ENV_HTTP_PORT=80/_APP_ENV_HTTP_PORT=8080/g' .env
sed -i 's/_APP_ENV_HTTPS_PORT=443/_APP_ENV_HTTPS_PORT=8443/g' .env
sed -i 's/_APP_DOMAIN=localhost/_APP_DOMAIN=appwrite.tranzlo.tech/g' .env
sed -i 's/_APP_DOMAIN_TARGET=localhost/_APP_DOMAIN_TARGET=appwrite.tranzlo.tech/g' .env

# Generate secure random variables for secrets that should not be empty
for var in _APP_OPENSSL_KEY_V1 _APP_DB_ROOT_PASS _APP_REDIS_PASS; do
  secret=$(openssl rand -hex 32)
  # Some versions have placeholder, some just empty
  if grep -q "^$var=$" .env; then
    sed -i "s/^$var=$/$var=$secret/g" .env
  else
    echo "$var=$secret" >> .env
  fi
done

# Start Appwrite safely
docker compose up -d

# Check what went wrong with nginx
systemctl status nginx --no-pager
nginx -t
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

  ssh.dispose();
}

fixAppwrite().catch(console.error);
