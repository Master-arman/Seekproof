import mysql from 'mysql2/promise';
import { config } from '../config';

let pool: mysql.Pool | null = null;
let isDbConnected = false;

export function getPool(): mysql.Pool {
  if (!pool) {
    pool = mysql.createPool({
      host: config.db.host,
      port: config.db.port,
      user: config.db.user,
      password: config.db.password,
      database: config.db.name,
      waitForConnections: true,
      connectionLimit: config.db.connectionLimit,
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 0,
      connectTimeout: 3000,
    });
  }
  return pool;
}

export async function testDbConnection(): Promise<{ connected: boolean; message: string }> {
  try {
    const currentPool = getPool();
    // Wrap connection in 2.5s timeout promise
    const connectionPromise = currentPool.getConnection();
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('Connection attempt timed out (MySQL offline)')), 2500)
    );

    const connection = await Promise.race([connectionPromise, timeoutPromise]);
    await connection.ping();
    connection.release();
    isDbConnected = true;
    return {
      connected: true,
      message: `Successfully connected to MySQL database '${config.db.name}' on ${config.db.host}:${config.db.port}`
    };
  } catch (error: any) {
    isDbConnected = false;
    return {
      connected: false,
      message: `MySQL Status: ${error.message || 'Unable to connect to database'}. In-memory fallback mode active.`
    };
  }
}

export function isConnected(): boolean {
  return isDbConnected;
}

export async function query<T = any>(sql: string, params?: any[]): Promise<T> {
  const currentPool = getPool();
  const [results] = await currentPool.execute(sql, params);
  return results as T;
}

export default {
  getPool,
  testDbConnection,
  isConnected,
  query
};
