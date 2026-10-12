import { Client } from 'ssh2';

async function testPassword(pwd) {
  return new Promise((resolve) => {
    const conn = new Client();
    conn.on('ready', () => {
      console.log(`✅ Success with password: ${pwd}`);
      conn.end();
      resolve(true);
    }).on('error', (err) => {
      console.log(`❌ Failed with password ${pwd}: ${err.message}`);
      resolve(false);
    }).connect({
      host: '46.202.183.156',
      port: 65002,
      username: 'u760953603',
      password: pwd,
      readyTimeout: 10000
    });
  });
}

(async () => {
  await testPassword(process.env.SSH_PASSWORD || '');
  await testPassword(process.env.SSH_PASSWORD || '');
})();
