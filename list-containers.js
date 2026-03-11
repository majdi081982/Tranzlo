import { NodeSSH } from 'node-ssh';

const ssh = new NodeSSH();

async function listContainers() {
  await ssh.connect({
    host: '187.124.35.158',
    username: 'root',
    password: 'Cdromlg@8442'
  });

  const res = await ssh.execCommand('docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"');
  console.log(res.stdout);
  
  const allRes = await ssh.execCommand('docker ps -a --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"');
  console.log('\n--- All Containers ---');
  console.log(allRes.stdout);

  ssh.dispose();
}

listContainers().catch(console.error);
