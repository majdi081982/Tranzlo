import { NodeSSH } from 'node-ssh';

const ssh = new NodeSSH();

async function testConnectivity() {
  await ssh.connect({
    host: '187.124.35.158',
    username: 'root',
    password: 'Cdromlg@8442',
    readyTimeout: 30000
  });

  console.log('Testing Appwrite (Traefik) on 8080...');
  const resAppwrite = await ssh.execCommand('curl -s -I http://127.0.0.1:8080 -H "Host: appwrite.tranzlo.tech" | grep HTTP');
  console.log(resAppwrite.stdout);

  console.log('\nTesting n8n on 5678...');
  const resN8n = await ssh.execCommand('curl -s -I http://127.0.0.1:5678 | grep HTTP');
  console.log(resN8n.stdout);

  ssh.dispose();
}

testConnectivity().catch(console.error);
