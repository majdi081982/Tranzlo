import { NodeSSH } from 'node-ssh';

const ssh = new NodeSSH();

async function checkAppwriteConfig() {
  await ssh.connect({
    host: '187.124.35.158',
    username: 'root',
    password: 'Cdromlg@8442',
    readyTimeout: 30000
  });

  const compose = await ssh.execCommand('cat /root/appwrite/docker-compose.yml');
  console.log('--- docker-compose.yml ---');
  console.log(compose.stdout);

  const env = await ssh.execCommand('cat /root/appwrite/.env');
  console.log('--- .env ---');
  console.log(env.stdout);

  const ps = await ssh.execCommand('docker ps -a');
  console.log('--- docker ps -a ---');
  console.log(ps.stdout);

  ssh.dispose();
}

checkAppwriteConfig().catch(console.error);
