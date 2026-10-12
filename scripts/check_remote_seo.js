import { Client } from 'ssh2';

const conn = new Client();
conn.on('ready', () => {
  const cmd = 'cat /home/u760953603/domains/crew5.agency/public_html/google64963217987dc2d5.html && echo "===SITEMAP===" && cat /home/u760953603/domains/crew5.agency/public_html/sitemap.xml';
  conn.exec(cmd, (err, stream) => {
    let out = '';
    stream.on('close', () => {
      console.log(out);
      conn.end();
    }).on('data', d => out += d);
  });
}).connect({
  host: '46.202.183.156',
  port: 65002,
  username: 'u760953603',
  password: process.env.SSH_PASSWORD || ''
});
