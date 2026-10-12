import fs from 'fs';
import path from 'path';
import { blogArticles } from '../src/data/blogs.js';

const DB_FILE = path.join(process.cwd(), 'server', 'data', 'database.json');

if (fs.existsSync(DB_FILE)) {
  const dbData = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
  dbData.blogs = blogArticles;
  fs.writeFileSync(DB_FILE, JSON.stringify(dbData, null, 2), 'utf-8');
  console.log('✓ Successfully synced blogs to database.json. Total articles:', dbData.blogs.length);
} else {
  console.error('database.json not found at:', DB_FILE);
}
