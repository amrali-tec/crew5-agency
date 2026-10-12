import { Client } from 'ssh2';

const conn = new Client();

const config = {
  host: '46.202.183.156',
  port: 65002,
  username: 'u760953603',
  password: process.env.SSH_PASSWORD || '',
  readyTimeout: 30000
};

console.log('Connecting to SSH server at', config.host + ':' + config.port, 'as', config.username, '...');

conn.on('ready', () => {
  console.log('✅ SSH Connection established successfully!');

  const cmd = 'pwd && whoami && ls -la domains/crew5.agency/public_html';
  
  conn.exec(cmd, (err, stream) => {
    if (err) {
      console.error('Exec error:', err);
      conn.end();
      return;
    }
    
    let output = '';
    stream.on('close', (code, signal) => {
      console.log('--- Command Output ---');
      console.log(output);
      console.log('--- End of Output (Exit Code:', code, ') ---');
      conn.end();
    }).on('data', (data) => {
      output += data.toString();
    }).stderr.on('data', (data) => {
      console.error('STDERR:', data.toString());
    });
  });
}).on('error', (err) => {
  console.error('❌ SSH Connection error:', err.message);
}).connect(config);
