import { NodeSSH } from 'node-ssh';

const ssh = new NodeSSH();

async function investigate() {
  try {
    console.log('Connecting to VPS...');
    await ssh.connect({
      host: '187.124.35.158',
      username: 'root',
      password: 'Cdromlg@8442',
      readyTimeout: 20000
    });
    console.log('Connected! Gathering system status...\n');

    const commands = [
      'echo "--- NGINX STATUS ---"',
      'systemctl status nginx --no-pager -l || true',
      'nginx -t || true',
      'echo ""',
      'echo "--- DOCKER CONTAINERS ---"',
      'docker ps',
      'echo ""',
      'echo "--- APPWRITE LOGS (Last 20 lines) ---"',
      'cd /root/appwrite && docker compose logs --tail=20 || true',
      'echo ""',
      'echo "--- N8N LOGS (Last 20 lines) ---"',
      'cd /opt/n8n && docker compose logs --tail=20 || true',
      'echo ""',
      'echo "--- NGINX SITES ENABLED ---"',
      'ls -la /etc/nginx/sites-enabled/'
    ];

    const result = await ssh.execCommand(commands.join('\n'));
    console.log(result.stdout);
    if (result.stderr) {
      console.log('STDERR:');
      console.error(result.stderr);
    }
  } catch (error) {
    console.error('Connection or execution error:', error);
  } finally {
    ssh.dispose();
  }
}

investigate();
