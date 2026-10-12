import { Client } from 'ssh2';

const conn = new Client();
conn.on('ready', () => {
  const cmd = `
    echo "=== 1. ROBOTS.TXT ===" && \
    curl -s -k https://crew5.agency/robots.txt && \
    echo -e "\n=== 2. SITEMAP.XML (First 20 lines) ===" && \
    curl -s -k https://crew5.agency/sitemap.xml | head -n 20 && \
    echo -e "\n=== 3. GOOGLE VERIFICATION ===" && \
    curl -s -k https://crew5.agency/google64963217987dc2d5.html && \
    echo -e "\n=== 4. HOMEPAGE SEO META TAGS ===" && \
    curl -s -k https://crew5.agency/ | grep -E "(title|description|robots|google-site-verification|canonical|og:)" | head -n 20
  `;
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
