import { NodeSSH } from 'node-ssh';

const ssh = new NodeSSH();

async function ultimateFix() {
  await ssh.connect({
    host: '187.124.35.158',
    username: 'root',
    password: 'Cdromlg@8442',
    readyTimeout: 30000
  });

  console.log('[1/5] Stopping and removing old Appwrite containers...');
  await ssh.execCommand('cd /root/appwrite && docker compose down -v || true');
  await ssh.execCommand('docker stop $(docker ps -aq) || true');
  await ssh.execCommand('docker rm $(docker ps -aq) || true');

  console.log('[2/5] Downloading clean production configuration...');
  await ssh.execCommand('mkdir -p /root/appwrite');
  const downloadCmd = `
cd /root/appwrite
curl -L https://appwrite.io/install/compose -o docker-compose.yml
curl -L https://appwrite.io/install/env -o .env
  `;
  await ssh.execCommand(downloadCmd);

  console.log('[3/5] Patching Traefik ports for Nginx compatibility...');
  // Production compose often has:
  // ports:
  //   - 80:80
  //   - 443:443
  // We change it to 8080:80 and 8443:443
  const patchCmd = `
cd /root/appwrite
sed -i 's/- 80:80/- 8080:80/g' docker-compose.yml
sed -i 's/- 443:443/- 8443:443/g' docker-compose.yml
  `;
  await ssh.execCommand(patchCmd);

  console.log('[4/5] Configuring environment variables...');
  const envCmd = `
cd /root/appwrite
sed -i "s/_APP_DOMAIN=localhost/_APP_DOMAIN=appwrite.tranzlo.tech/g" .env
sed -i "s/_APP_DOMAIN_TARGET=localhost/_APP_DOMAIN_TARGET=appwrite.tranzlo.tech/g" .env

# Generate keys if they look like placeholders or are missing
for var in _APP_OPENSSL_KEY_V1 _APP_DB_ROOT_PASS _APP_REDIS_PASS; do
  secret=$(openssl rand -hex 32)
  if grep -q "^$var=$" .env || ! grep -q "^$var=" .env || grep -q "^$var=your-secret-key" .env; then
    # Use a more robust sed to update or append
    if grep -q "^$var=" .env; then
      sed -i "s/^$var=.*/$var=$secret/g" .env
    else
      echo "$var=$secret" >> .env
    fi
  fi
done
  `;
  await ssh.execCommand(envCmd);

  console.log('[5/5] Starting services...');
  const startRes = await ssh.execCommand('cd /root/appwrite && docker compose pull && docker compose up -d');
  console.log(startRes.stdout);
  console.log(startRes.stderr);

  // Also make sure n8n is running
  console.log('Ensuring n8n is running...');
  await ssh.execCommand('cd /opt/n8n && docker compose up -d');

  console.log('\n✅ DONE! Please wait 1-2 minutes for Appwrite to finish internal migrations.');
  ssh.dispose();
}

ultimateFix().catch(console.error);
