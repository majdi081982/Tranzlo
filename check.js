import { NodeSSH } from 'node-ssh';

const ssh = new NodeSSH();

async function checkAppwrite() {
  await ssh.connect({
    host: '187.124.35.158',
    username: 'root',
    password: 'Cdromlg@8442',
    readyTimeout: 20000
  });

  const res = await ssh.execCommand('docker run --rm appwrite/appwrite help');
  console.log(res.stdout);
  console.log(res.stderr);
  
  ssh.dispose();
}

checkAppwrite().catch(console.error);
