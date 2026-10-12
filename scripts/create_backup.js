import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const ROOT_DIR = path.resolve('.');
const now = new Date();
const pad = (n) => String(n).padStart(2, '0');
const timestamp = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}_${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;

const tarFilename = `crew5_backup_${timestamp}.tar.gz`;
const zipFilename = `crew5_backup_${timestamp}.zip`;

console.log('====================================================');
console.log('📦 Creating Full Project Backup in Root Directory');
console.log('📁 Root Path:', ROOT_DIR);
console.log('⏰ Timestamp:', timestamp);
console.log('====================================================\n');

try {
  // 1. Create .tar.gz archive excluding node_modules, temp folders, and old archives
  console.log(`Creating ${tarFilename}...`);
  const tarCmd = `tar --exclude="node_modules" --exclude=".git" --exclude="*.tar.gz" --exclude="*.zip" -czf "${tarFilename}" src public server api dist scripts package.json package-lock.json tailwind.config.js vite.config.js index.html postcss.config.js .env.example walkthrough.md`;
  execSync(tarCmd, { cwd: ROOT_DIR, stdio: 'inherit' });

  const tarStats = fs.statSync(path.join(ROOT_DIR, tarFilename));
  const tarSizeMB = (tarStats.size / (1024 * 1024)).toFixed(2);
  console.log(`✅ ${tarFilename} created successfully! (Size: ${tarSizeMB} MB)\n`);

  // 2. Also create a standard .zip archive using PowerShell for easy Windows exploration
  console.log(`Creating ${zipFilename}...`);
  const zipCmd = `powershell -Command "Compress-Archive -Path src, public, server, api, dist, scripts, package.json, package-lock.json, tailwind.config.js, vite.config.js, index.html, postcss.config.js, .env.example, walkthrough.md -DestinationPath '${zipFilename}' -Force"`;
  execSync(zipCmd, { cwd: ROOT_DIR, stdio: 'inherit' });

  const zipStats = fs.statSync(path.join(ROOT_DIR, zipFilename));
  const zipSizeMB = (zipStats.size / (1024 * 1024)).toFixed(2);
  console.log(`✅ ${zipFilename} created successfully! (Size: ${zipSizeMB} MB)\n`);

  console.log('====================================================');
  console.log('🎉 Project backups created in project root:');
  console.log(`1. ${path.join(ROOT_DIR, tarFilename)} (${tarSizeMB} MB)`);
  console.log(`2. ${path.join(ROOT_DIR, zipFilename)} (${zipSizeMB} MB)`);
  console.log('====================================================');
} catch (error) {
  console.error('❌ Failed to create backup:', error.message);
  process.exit(1);
}
