import { NodeSSH } from 'node-ssh';

const ssh = new NodeSSH();

async function checkAppwriteLogs() {
  await ssh.connect({
    host: '187.124.35.158',
    username: 'root',
    password: 'Cdromlg@8442',
    readyTimeout: 30000
  });

  console.log('--- appwrite container logs ---');
  const resAppwrite = await ssh.execCommand('docker logs appwrite --tail 100');
  console.log(resAppwrite.stdout);
  console.log(resAppwrite.stderr);

  console.log('\n--- appwrite-traefik container logs ---');
  const resTraefik = await ssh.execCommand('docker logs appwrite-traefik --tail 100');
  console.log(resTraefik.stdout);
  console.log(resTraefik.stderr);

  ssh.dispose();
}

checkAppwriteLogs().catch(console.error);
