import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { servicesCategories } from '../src/data/services.js';
import { projectsData } from '../src/data/projects.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, 'data', 'database.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));

db.services = servicesCategories;
db.projects = projectsData;

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf-8');
console.log('Successfully synced bilingual data to database.json!');
