import { NodeSSH } from 'node-ssh';
import { exec } from 'child_process';
import util from 'util';
import path from 'path';

const ssh = new NodeSSH();
const execAsync = util.promisify(exec);

const config = {
  host: '187.124.179.33',
  username: 'root',
  password: 'Cdromlg@8442',
  remotePath: '/root/tranzlo-frontend'
};

const filesToArchive = 'src public package.json package-lock.json postcss.config.mjs next.config.ts tsconfig.json eslint.config.mjs next-env.d.ts';

async function runDeploy() {
  try {
    console.log('📦 Creating archive of local files...');
    
    // Using Windows 10+ built-in tar
    const tarCmd = `tar -czf deploy.tar.gz ${filesToArchive}`;
    await execAsync(tarCmd);
    console.log('✅ Archive created');

    console.log(`🔌 Connecting to VPS ${config.host}...`);
    await ssh.connect({
      host: config.host,
      username: config.username,
      password: config.password,
    });
    console.log('✅ Connected');

    console.log('⚙️ Ensuring Node.js and PM2 are installed on VPS...');
    const setupEnvCmd = `
      cd /root
      if ! command -v node &> /dev/null
      then
        echo "Installing Node.js 20.x..."
        curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
        apt-get install -y nodejs
      fi
      if ! command -v pm2 &> /dev/null
      then
        echo "Installing PM2..."
        npm install pm2@latest -g
      fi
      mkdir -p ${config.remotePath}
    `;
    await ssh.execCommand(setupEnvCmd);

    console.log(`📤 Uploading archive to ${config.remotePath}...`);
    await ssh.putFile('deploy.tar.gz', `/root/deploy.tar.gz`);

    console.log('🔧 Extracting and installing dependencies on the server...');
    // We install all dependencies (including dev tools like TypeScript) to prevent Next.js build issues
    const deployCmd = `
      cd ${config.remotePath}
      tar -xzf /root/deploy.tar.gz -C ./
      rm /root/deploy.tar.gz
      echo "Running npm install..."
      npm install
      echo "Building Next.js app..."
      npm run build
      echo "Starting PM2..."
      pm2 restart tranzlo || pm2 start npm --name "tranzlo" -- run start -- -p 3000
      pm2 save
    `;
    console.log('Executing build on server (this will take a few minutes)...');
    
    // Set a long timeout and log periodically if it hangs on build
    const res = await ssh.execCommand(deployCmd);
    console.log('--- SERVER OUTPUT ---');
    console.log(res.stdout);
    if (res.stderr) {
      console.log('--- SERVER ERRORS / WARNINGS ---');
      console.error(res.stderr);
    }

    console.log('🧹 Cleaning up local archive...');
    // Using powershell or cmd delete
    await execAsync('del deploy.tar.gz');

    console.log('🚀 Deployment Complete! Your Next.js app is running on port 3000.');
    ssh.dispose();
  } catch (err) {
    console.error('❌ Deployment Error:', err);
    try {
        await execAsync('del deploy.tar.gz');
    } catch (ignore) {}
    ssh.dispose();
  }
}

runDeploy();
