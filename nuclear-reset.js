import { NodeSSH } from 'node-ssh';

const ssh = new NodeSSH();

async function fullDockerReset() {
  await ssh.connect({
    host: '187.124.35.158',
    username: 'root',
    password: 'Cdromlg@8442',
    readyTimeout: 30000
  });

  console.log('Force stopping and removing ALL containers...');
  await ssh.execCommand('docker stop $(docker ps -aq) || true');
  await ssh.execCommand('docker rm $(docker ps -aq) || true');
  
  console.log('Removing all unused networks and volumes...');
  await ssh.execCommand('docker network prune -f');
  await ssh.execCommand('docker volume prune -f');

  console.log('Starting Appwrite stack...');
  await ssh.execCommand('cd /root/appwrite && docker compose up -d');

  console.log('Starting n8n stack...');
  await ssh.execCommand('cd /opt/n8n && docker compose up -d');

  console.log('Reloading Nginx...');
  await ssh.execCommand('systemctl reload nginx');

  console.log('\nWait 30 seconds for services to initialize...');
  await new Promise(r => setTimeout(r, 30000));

  console.log('Final check...');
  const res = await ssh.execCommand('docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"');
  console.log(res.stdout);

  ssh.dispose();
}

fullDockerReset().catch(console.error);
