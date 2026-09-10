import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';
import { config } from '../config';

async function runMigrations() {
  console.log('🔄 [SeekProof Migration] Initializing database migration...');
  console.log(`📡 Connecting to MySQL server on ${config.db.host}:${config.db.port}...`);

  // First connect without specifying database to create it if needed
  const connection = await mysql.createConnection({
    host: config.db.host,
    port: config.db.port,
    user: config.db.user,
    password: config.db.password,
    multipleStatements: true,
  });

  try {
    const migrationFile = path.resolve(__dirname, '../migrations/002_seekproof_schema.sql');
    if (!fs.existsSync(migrationFile)) {
      throw new Error(`Migration file not found at ${migrationFile}`);
    }

    const sql = fs.readFileSync(migrationFile, 'utf8');
    console.log(`📄 Executing ${path.basename(migrationFile)}...`);

    await connection.query(sql);

    console.log('✅ [SeekProof Migration] Database and tables successfully created/migrated!');
  } catch (error: any) {
    console.error('❌ [SeekProof Migration] Error running migrations:', error.message);
    process.exit(1);
  } finally {
    await connection.end();
  }
}

// Execute directly if run via CLI
if (require.main === module) {
  runMigrations()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}

export { runMigrations };
