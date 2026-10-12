import { Client } from 'ssh2';

const conn = new Client();
const config = {
  host: '46.202.183.156',
  port: 65002,
  username: 'u760953603',
  password: process.env.SSH_PASSWORD || '',
  readyTimeout: 30000
};

conn.on('ready', () => {
  const cmd = `
    cat /home/u760953603/domains/crew5.agency/public_html/api/index.php
  `;
  conn.exec(cmd, (err, stream) => {
    if (err) throw err;
    let output = '';
    stream.on('close', (code) => {
      console.log('--- api/index.php full content ---');
      console.log(output);
      conn.end();
    }).on('data', (d) => output += d);
  });
}).connect(config);
