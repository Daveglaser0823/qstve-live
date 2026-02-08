import { neon } from '@neondatabase/serverless';
import { readFileSync } from 'fs';

const sql = neon(process.env.DATABASE_URL);
const migration = readFileSync(process.argv[2], 'utf8');

const statements = migration.split(';').map(s => s.trim()).filter(s => s && !s.startsWith('--'));
for (const stmt of statements) {
  try {
    const result = await sql.query(stmt);
    if (result.rows?.length) console.log(JSON.stringify(result.rows));
  } catch (e) {
    console.error('Error:', e.message?.slice(0, 120), '\nStmt:', stmt.slice(0, 80));
  }
}
console.log('Done');
