import { NodeSSH } from 'node-ssh';

const ssh = new NodeSSH();

async function configureProxies() {
  await ssh.connect({
    host: '187.124.35.158',
    username: 'root',
    password: 'Cdromlg@8442',
    readyTimeout: 20000
  });

  const setupScript = `
cat << 'EOF' > /etc/nginx/sites-available/n8n.tranzlo.tech
server {
    listen 80;
    server_name n8n.tranzlo.tech;

    location / {
        proxy_pass http://127.0.0.1:5678;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
EOF

ln -sf /etc/nginx/sites-available/n8n.tranzlo.tech /etc/nginx/sites-enabled/
systemctl reload nginx
`;

  await ssh.execCommand(setupScript.replace(/\r\n/g, '\n'), {
    cwd: '/root'
  });

  ssh.dispose();
}

configureProxies().catch(console.error);
