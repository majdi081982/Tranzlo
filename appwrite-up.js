import { NodeSSH } from 'node-ssh';

const ssh = new NodeSSH();

async function appwriteUp() {
  console.log('Connecting to VPS...');
  await ssh.connect({
    host: '187.124.35.158',
    username: 'root',
    password: 'Cdromlg@8442',
    readyTimeout: 30000
  });

  console.log('Running Appwrite docker compose pull and up...');
  
  await ssh.execCommand('cd /root/appwrite && docker compose pull && docker compose up -d', {
    cwd: '/root',
    onStdout(chunk) {
      process.stdout.write(chunk.toString('utf8'));
    },
    onStderr(chunk) {
      process.stderr.write(chunk.toString('utf8'));
    }
  });

  console.log('\n✅ Appwrite docker compose complete!');
  ssh.dispose();
}

appwriteUp().catch(console.error);
