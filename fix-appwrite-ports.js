import { NodeSSH } from 'node-ssh';

const ssh = new NodeSSH();

async function fixAppwriteTraefikPorts() {
  await ssh.connect({
    host: '187.124.35.158',
    username: 'root',
    password: 'Cdromlg@8442',
    readyTimeout: 30000
  });

  console.log('Stopping Appwrite...');
  await ssh.execCommand('cd /root/appwrite && docker compose down');

  console.log('Updating docker-compose.yml Traefik ports...');
  // Replace Traefik ports 80:80 and 443:443 with 8080:80 and 8443:443
  // We need to be careful with the yaml structure.
  
  const updateCmd = `
cd /root/appwrite
sed -i 's/- 80:80/- 8080:80/g' docker-compose.yml
sed -i 's/- 443:443/- 8443:443/g' docker-compose.yml
  `;
  await ssh.execCommand(updateCmd);

  console.log('Starting Appwrite...');
  const startRes = await ssh.execCommand('cd /root/appwrite && docker compose up -d');
  console.log(startRes.stdout);
  console.log(startRes.stderr);

  ssh.dispose();
}

fixAppwriteTraefikPorts().catch(console.error);
