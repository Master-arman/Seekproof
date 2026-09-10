import app from './app';
import { config } from './config';
import db from './database/db';

async function startServer() {
  console.log('🕵️‍♂️ [SeekProof Server] Initializing investigation backend engine...');

  // Probe database connection
  const dbStatus = await db.testDbConnection();
  if (dbStatus.connected) {
    console.log(`🗄️ [Database Status] MySQL connected: ${dbStatus.message}`);
  } else {
    console.warn(`⚠️ [Database Status] ${dbStatus.message}`);
  }

  const server = app.listen(config.port, () => {
    console.log(`🚀 [SeekProof Server] Operational on port ${config.port} (Environment: ${config.env})`);
    console.log(`🔗 Health check endpoint: http://localhost:${config.port}/api/health`);
    console.log(`🛡️ Client CORS allowed: ${config.clientUrl}`);
  });

  const handleShutdown = async (signal: string) => {
    console.log(`\n🛑 [SeekProof Server] Received ${signal}. Closing HTTP server gracefully...`);
    server.close(async () => {
      console.log('🔒 HTTP server closed.');
      process.exit(0);
    });
  };

  process.on('SIGTERM', () => handleShutdown('SIGTERM'));
  process.on('SIGINT', () => handleShutdown('SIGINT'));
}

startServer().catch((err) => {
  console.error('💥 Fatal error starting SeekProof server:', err);
  process.exit(1);
});
