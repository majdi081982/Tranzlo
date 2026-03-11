import { NodeSSH } from 'node-ssh';

const ssh = new NodeSSH();

async function installAppwrite() {
  await ssh.connect({
    host: '187.124.35.158',
    username: 'root',
    password: 'Cdromlg@8442',
    readyTimeout: 20000
  });

  console.log('Connected! Installing expect...');
  await ssh.execCommand('apt-get update && apt-get install -y expect');

  console.log('Preparing Appwrite directory...');
  await ssh.execCommand('mkdir -p /root/appwrite');

  console.log('Creating expect script...');
  const expectScript = `#!/usr/bin/expect -f
set timeout -1

spawn docker run -it --rm --volume /var/run/docker.sock:/var/run/docker.sock --volume /root/appwrite:/usr/src/code/appwrite:rw appwrite/appwrite init

expect {
    "*HTTP port*" { send "8080\\r"; exp_continue }
    "*HTTPS port*" { send "8443\\r"; exp_continue }
    "*secret API key*" { send "\\r"; exp_continue }
    "*Appwrite hostname*" { send "appwrite.tranzlo.tech\\r"; exp_continue }
    "*CNAME*" { send "\\r"; exp_continue }
    eof
}
`;

  await ssh.execCommand('cat << \\EOF > /root/install_appwrite.exp\n' + expectScript + '\nEOF\n');
  await ssh.execCommand('chmod +x /root/install_appwrite.exp');

  console.log('Running Appwrite installation...');
  await ssh.execCommand('/usr/bin/expect /root/install_appwrite.exp', {
    cwd: '/root',
    onStdout(chunk) {
      process.stdout.write(chunk.toString('utf8'));
    },
    onStderr(chunk) {
      process.stderr.write(chunk.toString('utf8'));
    }
  });

  console.log('Adding Nginx proxy for Appwrite...');
  const nginxConfig = `
server {
    listen 80;
    server_name appwrite.tranzlo.tech;

    location / {
        proxy_pass http://127.0.0.1:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_addrs;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
`;
  await ssh.execCommand('cat << \\EOF > /etc/nginx/sites-available/appwrite.tranzlo.tech\n' + nginxConfig + '\nEOF\n');
  await ssh.execCommand('ln -sf /etc/nginx/sites-available/appwrite.tranzlo.tech /etc/nginx/sites-enabled/');
  await ssh.execCommand('systemctl reload nginx');

  console.log('Appwrite installation and reverse proxy setup complete.');
  ssh.dispose();
}

installAppwrite().catch(console.error);
