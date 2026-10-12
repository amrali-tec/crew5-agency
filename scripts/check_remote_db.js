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
    php -r '
      require_once "/home/u760953603/domains/crew5.agency/public_html/api/config.php";
      $pdo = getDB();
      $stmt = $pdo->query("SELECT * FROM projects WHERE id = 1");
      print_r($stmt->fetch(PDO::FETCH_ASSOC));
    ' 2>/dev/null || true
  `;
  conn.exec(cmd, (err, stream) => {
    if (err) throw err;
    let output = '';
    stream.on('close', (code) => {
      console.log('--- Project 1 from SQLite on remote server ---');
      console.log(output);
      conn.end();
    }).on('data', (d) => output += d);
  });
}).connect(config);
