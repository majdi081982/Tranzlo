import { NodeSSH } from 'node-ssh';

const ssh = new NodeSSH();

async function extractAppwriteFiles() {
  await ssh.connect({
    host: '187.124.35.158',
    username: 'root',
    password: 'Cdromlg@8442',
    readyTimeout: 30000
  });

  console.log('Extracting production files from appwrite/appwrite image...');
  
  // Try to extract from the image
  const extractCmd = `
docker pull appwrite/appwrite:latest
docker run --rm appwrite/appwrite:latest cat /usr/src/code/appwrite/docker-compose.yml > /root/appwrite/docker-compose.yml
docker run --rm appwrite/appwrite:latest cat /usr/src/code/appwrite/.env > /root/appwrite/.env
  `;
  
  const res = await ssh.execCommand(extractCmd);
  console.log(res.stdout);
  console.log(res.stderr);

  // Check if they are actually production files (no 'build:' lines)
  const check = await ssh.execCommand('grep "build:" /root/appwrite/docker-compose.yml');
  if (check.stdout) {
    console.log('WARNING: Still seeing build lines. This might not be the production file.');
    console.log(check.stdout);
  } else {
    console.log('Success: No build lines found in docker-compose.yml');
  }

  ssh.dispose();
}

extractAppwriteFiles().catch(console.error);
