import { NodeSSH } from 'node-ssh';

const ssh = new NodeSSH();

async function run() {
  try {
    console.log('Connecting to VPS 187.124.179.33...');
    await ssh.connect({
      host: '187.124.179.33',
      username: 'root',
      password: 'Cdromlg@8442'
    });
    console.log('Connected! Preparing automation script for Appwrite...');

    const setupCommand = `
      sudo apt update && sudo apt install -y docker.io docker-compose-v2 expect
      mkdir -p /root/appwrite
      cd /root/appwrite
      
      cat << 'EOF' > install.exp
#!/usr/bin/expect -f
set timeout -1
spawn docker run -it --rm --volume /var/run/docker.sock:/var/run/docker.sock --volume /root/appwrite:/usr/src/code/appwrite:rw --entrypoint=install appwrite/appwrite:latest

expect -nocase "http port"
send "80\r"

expect -nocase "https port"
send "443\r"

expect -nocase "secret api key"
send "\r"

expect -nocase "hostname"
send "appwrite.tranzlo.net\r"

expect -nocase "cname"
send "appwrite.tranzlo.net\r"

expect eof
EOF

      chmod +x install.exp
      ./install.exp
    `;

    console.log('Executing automated installation (this will take a few minutes)...');
    const res = await ssh.execCommand(setupCommand);
    console.log('STDOUT:', res.stdout);
    if (res.stderr) console.error('STDERR:', res.stderr);

    console.log('Verifying Appwrite containers...');
    const verify = await ssh.execCommand('cd /root/appwrite && docker compose up -d');
    console.log(verify.stdout);
    
    console.log('Appwrite Deployment Complete! Dashboard should be live.');
    ssh.dispose();
  } catch (e) {
    console.error('Connection or Execution Error:', e);
    ssh.dispose();
  }
}

run();
