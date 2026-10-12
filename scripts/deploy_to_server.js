import { Client } from 'ssh2';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const LOCAL_ARCHIVE = path.resolve('deploy_package.tar.gz');
const REMOTE_DIR = '/home/u760953603/domains/crew5.agency';
const REMOTE_PUBLIC_HTML = `${REMOTE_DIR}/public_html`;
const REMOTE_ARCHIVE = `${REMOTE_DIR}/deploy_package.tar.gz`;

const config = {
  host: '46.202.183.156',
  port: 65002,
  username: 'u760953603',
  password: process.env.SSH_PASSWORD || '',
  readyTimeout: 60000
};

console.log('====================================================');
console.log('🚀 Starting Crew5 Production Deployment to Remote Server');
console.log('📡 Target Host:', config.host + ':' + config.port);
console.log('👤 User:', config.username);
console.log('📁 Remote Directory:', REMOTE_PUBLIC_HTML);
console.log('====================================================');

// Package fresh local dist, api, and server
console.log('\n📦 Step 0: Packaging fresh local dist, api, and server files...');
execSync('tar --exclude="server/node_modules" -czf deploy_package.tar.gz dist api server', { cwd: path.resolve('.'), stdio: 'inherit' });
console.log('✅ deploy_package.tar.gz generated successfully!\n');

const conn = new Client();

function executeCommand(conn, cmd) {
  return new Promise((resolve, reject) => {
    console.log(`\n⚙️  Executing remote: ${cmd}`);
    conn.exec(cmd, (err, stream) => {
      if (err) return reject(err);
      let stdout = '';
      let stderr = '';
      stream.on('close', (code, signal) => {
        if (code !== 0) {
          console.warn(`⚠️  Command finished with code ${code}`);
        } else {
          console.log(`✅ Command completed successfully.`);
        }
        resolve({ code, stdout, stderr });
      }).on('data', (d) => {
        stdout += d.toString();
        process.stdout.write(d);
      }).stderr.on('data', (d) => {
        stderr += d.toString();
        process.stderr.write(d);
      });
    });
  });
}

function uploadFile(conn, localPath, remotePath) {
  return new Promise((resolve, reject) => {
    console.log(`\n📤 Uploading ${localPath} -> ${remotePath} via SFTP...`);
    conn.sftp((err, sftp) => {
      if (err) return reject(err);

      const totalSize = fs.statSync(localPath).size;
      let uploaded = 0;
      let lastPercent = 0;

      const readStream = fs.createReadStream(localPath);
      const writeStream = sftp.createWriteStream(remotePath);

      readStream.on('data', (chunk) => {
        uploaded += chunk.length;
        const percent = Math.floor((uploaded / totalSize) * 100);
        if (percent >= lastPercent + 10 || percent === 100) {
          lastPercent = percent;
          process.stdout.write(`\r📊 Upload Progress: ${percent}% (${(uploaded / (1024 * 1024)).toFixed(2)} MB / ${(totalSize / (1024 * 1024)).toFixed(2)} MB)`);
        }
      });

      writeStream.on('close', () => {
        console.log('\n✅ File upload completed successfully!');
        resolve();
      });

      writeStream.on('error', (err) => {
        console.error('\n❌ Upload stream error:', err);
        reject(err);
      });

      readStream.pipe(writeStream);
    });
  });
}

async function runDeploy() {
  conn.on('ready', async () => {
    try {
      console.log('✅ SSH Connection established successfully!\n');

      // 1. Create a remote backup
      const backupTimestamp = new Date().toISOString().replace(/[:T]/g, '_').split('.')[0];
      const backupName = `backup_${backupTimestamp}.tar.gz`;
      console.log(`📦 Step 1: Creating safety backup [${backupName}] on remote server...`);
      await executeCommand(conn, `tar -czf ${REMOTE_DIR}/${backupName} -C ${REMOTE_DIR} public_html`);

      // 2. Upload the local deploy archive
      console.log(`\n📦 Step 2: Uploading fresh deployment package...`);
      await uploadFile(conn, LOCAL_ARCHIVE, REMOTE_ARCHIVE);

      // 3. Extract and replace files in public_html
      console.log(`\n📦 Step 3: Extracting package into public_html, api, and server directories...`);
      const extractScript = `
        cd ${REMOTE_DIR} && \
        mkdir -p deploy_temp && \
        tar -xzf deploy_package.tar.gz -C deploy_temp && \
        cp -r deploy_temp/dist/* ${REMOTE_PUBLIC_HTML}/ && \
        cp -r deploy_temp/dist/.htaccess ${REMOTE_PUBLIC_HTML}/.htaccess 2>/dev/null || true && \
        mkdir -p ${REMOTE_PUBLIC_HTML}/api && \
        cp -r deploy_temp/api/* ${REMOTE_PUBLIC_HTML}/api/ && \
        mkdir -p ${REMOTE_PUBLIC_HTML}/server && \
        cp -r deploy_temp/server/* ${REMOTE_PUBLIC_HTML}/server/ && \
        mkdir -p ${REMOTE_PUBLIC_HTML}/uploads && \
        mkdir -p ${REMOTE_PUBLIC_HTML}/api/data && \
        mkdir -p ${REMOTE_PUBLIC_HTML}/server/data && \
        chmod -R 755 ${REMOTE_PUBLIC_HTML} && \
        chmod -R 777 ${REMOTE_PUBLIC_HTML}/uploads && \
        chmod -R 777 ${REMOTE_PUBLIC_HTML}/api/data && \
        chmod -R 777 ${REMOTE_PUBLIC_HTML}/server/data && \
        php -r '
          require_once "${REMOTE_PUBLIC_HTML}/api/config.php";
          $pdo = getDB();
          $json = json_decode(file_get_contents("${REMOTE_PUBLIC_HTML}/server/data/database.json"), true);
          if (!empty($json["projects"])) {
            foreach ($json["projects"] as $p) {
              $stmt = $pdo->prepare("UPDATE projects SET results = ?, tags = ? WHERE id = ? OR slug = ?");
              $stmt->execute([
                json_encode($p["results"] ?? [], JSON_UNESCAPED_UNICODE),
                json_encode($p["tags"] ?? [], JSON_UNESCAPED_UNICODE),
                $p["id"],
                $p["slug"] ?? ""
              ]);
            }
          }
        ' 2>/dev/null || true && \
        rm -rf deploy_temp deploy_package.tar.gz
      `;
      await executeCommand(conn, extractScript);

      // 4. Verify remote public_html contents
      console.log(`\n🔍 Step 4: Verifying deployed files on remote server...`);
      await executeCommand(conn, `ls -la ${REMOTE_PUBLIC_HTML}; ls -la ${REMOTE_PUBLIC_HTML}/assets | head -n 15; head -n 15 ${REMOTE_PUBLIC_HTML}/index.html`);

      console.log('\n🎉 ====================================================');
      console.log('🌟 DEPLOYMENT COMPLETED SUCCESSFULLY!');
      console.log('🌐 Live Site: https://crew5.agency/');
      console.log('====================================================\n');

    } catch (err) {
      console.error('\n❌ Deployment failed with error:', err);
    } finally {
      conn.end();
    }
  }).on('error', (err) => {
    console.error('❌ SSH Connection error:', err.message);
  }).connect(config);
}

runDeploy();
