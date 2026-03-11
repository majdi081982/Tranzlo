import { NodeSSH } from 'node-ssh';

const ssh = new NodeSSH();

async function checkTraefikPorts() {
  await ssh.connect({
    host: '187.124.35.158',
    username: 'root',
    password: 'Cdromlg@8442',
    readyTimeout: 30000
  });

  const res = await ssh.execCommand('grep -A 10 "traefik:" /root/appwrite/docker-compose.yml');
  console.log(res.stdout);
  ssh.dispose();
}

checkTraefikPorts().catch(console.error);
