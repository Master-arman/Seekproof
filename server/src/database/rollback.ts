import mysql from 'mysql2/promise';
import { config } from '../config';

export async function runRollback() {
  console.log('🔄 [SeekProof Rollback] Initializing database rollback...');
  console.log(`📡 Connecting to MySQL server on ${config.db.host}:${config.db.port}...`);

  const connection = await mysql.createConnection({
    host: config.db.host,
    port: config.db.port,
    user: config.db.user,
    password: config.db.password,
    database: config.db.name,
    multipleStatements: true,
  });

  try {
    console.log(`⚠️ Dropping all tables in database '${config.db.name}'...`);

    const dropTablesSql = `
      SET FOREIGN_KEY_CHECKS = 0;
      DROP TABLE IF EXISTS audit_logs;
      DROP TABLE IF EXISTS site_settings;
      DROP TABLE IF EXISTS contact_messages;
      DROP TABLE IF EXISTS blog_posts;
      DROP TABLE IF EXISTS testimonials;
      DROP TABLE IF EXISTS leads;
      DROP TABLE IF EXISTS services;
      DROP TABLE IF EXISTS admins;
      DROP TABLE IF EXISTS activity_logs;
      DROP TABLE IF EXISTS evidence_files;
      DROP TABLE IF EXISTS cases;
      DROP TABLE IF EXISTS inquiries;
      DROP TABLE IF EXISTS users;
      SET FOREIGN_KEY_CHECKS = 1;
    `;

    await connection.query(dropTablesSql);
    console.log('✅ [SeekProof Rollback] All tables successfully dropped and rolled back.');
  } catch (error: any) {
    console.error('❌ [SeekProof Rollback] Error during rollback:', error.message);
    throw error;
  } finally {
    await connection.end();
  }
}

// Execute directly if run via CLI
if (require.main === module) {
  runRollback()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}
