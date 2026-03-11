import { NodeSSH } from 'node-ssh';

const ssh = new NodeSSH();

async function debugAppwriteStatus() {
  await ssh.connect({
    host: '187.124.35.158',
    username: 'root',
    password: 'Cdromlg@8442',
    readyTimeout: 30000
  });

  console.log('--- docker compose ps ---');
  const res = await ssh.execCommand('cd /root/appwrite && docker compose ps');
  console.log(res.stdout);
  console.log(res.stderr);

  console.log('\n--- docker ps -a ---');
  const ps = await ssh.execCommand('docker ps -a');
  console.log(ps.stdout);

  ssh.dispose();
}

debugAppwriteStatus().catch(console.error);
