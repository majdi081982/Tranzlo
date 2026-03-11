import { NodeSSH } from 'node-ssh';
import * as fs from 'fs';

const ssh = new NodeSSH();

async function logServerStatus() {
  await ssh.connect({
    host: '187.124.35.158',
    username: 'root',
    password: 'Cdromlg@8442',
    readyTimeout: 30000
  });

  let report = "SERVER STATUS REPORT\n====================\n\n";

  const commands = [
    { name: "APPWRITE COMPOSE", cmd: "cat /root/appwrite/docker-compose.yml" },
    { name: "APPWRITE ENV", cmd: "cat /root/appwrite/.env" },
    { name: "DOCKER PS ALL", cmd: "docker ps -a" },
    { name: "PORT CHECK", cmd: "ss -tulpn" },
    { name: "NGINX CONFIGS", cmd: "ls /etc/nginx/sites-enabled/" }
  ];

  for (const item of commands) {
    report += `--- ${item.name} ---\n`;
    const res = await ssh.execCommand(item.cmd);
    report += res.stdout + "\n";
    if (res.stderr) report += "STDERR: " + res.stderr + "\n";
    report += "\n";
  }

  fs.writeFileSync('server_report.txt', report);
  console.log('Report written to server_report.txt');

  ssh.dispose();
}

logServerStatus().catch(console.error);
