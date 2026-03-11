import { NodeSSH } from 'node-ssh';

const ssh = new NodeSSH();

async function testDB() {
  await ssh.connect({
    host: '187.124.35.158',
    username: 'root',
    password: 'Cdromlg@8442',
    readyTimeout: 30000
  });

  console.log('Testing MariaDB connection as "user"...');
  // Use -ppassword without space
  const res = await ssh.execCommand('cd /root/appwrite && docker compose exec mariadb mariadb -u user -ppassword -e "SELECT 1;"');
  console.log('STDOUT:', res.stdout);
  console.log('STDERR:', res.stderr);

  console.log('\nTesting MariaDB connection as "root"...');
  const resRoot = await ssh.execCommand('cd /root/appwrite && docker compose exec mariadb mariadb -u root -p$(grep _APP_DB_ROOT_PASS .env | cut -d= -f2) -e "SELECT 1;"');
  console.log('STDOUT:', resRoot.stdout);
  console.log('STDERR:', resRoot.stderr);

  ssh.dispose();
}

testDB().catch(console.error);
