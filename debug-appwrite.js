import { NodeSSH } from 'node-ssh';

const ssh = new NodeSSH();

async function checkAppwriteFiles() {
  await ssh.connect({
    host: '187.124.35.158',
    username: 'root',
    password: 'Cdromlg@8442',
    readyTimeout: 30000
  });

  console.log('--- docker-compose.yml ports ---');
  const compose = await ssh.execCommand('grep "ports:" -A 5 /root/appwrite/docker-compose.yml');
  console.log(compose.stdout);
  
  console.log('\n--- .env ports ---');
  const env = await ssh.execCommand('grep "PORT" /root/appwrite/.env');
  console.log(env.stdout);

  console.log('\n--- Docker Containers ---');
  const ps = await ssh.execCommand('docker ps -a');
  console.log(ps.stdout);

  ssh.dispose();
}

checkAppwriteFiles().catch(console.error);
