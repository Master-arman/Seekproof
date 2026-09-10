import { AuditLog } from '../types';
import db from '../database/db';

const inMemoryAuditLogs: AuditLog[] = [];

export class AuditService {
  /**
   * Records an authentication or security-sensitive event.
   */
  static async logEvent(entry: Omit<AuditLog, 'id' | 'created_at'>): Promise<AuditLog> {
    const log: AuditLog = {
      id: `aud_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
      created_at: new Date(),
      ...entry,
    };

    inMemoryAuditLogs.unshift(log);
    // Keep max 500 in-memory logs
    if (inMemoryAuditLogs.length > 500) {
      inMemoryAuditLogs.pop();
    }

    if (db.isConnected()) {
      try {
        await db.query(
          `INSERT INTO audit_logs (id, event, user_id, email, ip_address, user_agent, status, metadata, created_at)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            log.id,
            log.event,
            log.user_id || null,
            log.email,
            log.ip_address,
            log.user_agent || null,
            log.status,
            log.metadata ? JSON.stringify(log.metadata) : null,
            log.created_at,
          ]
        );
      } catch (err: any) {
        // Silent fallback to memory store
        console.debug('Database audit log skipped, retained in memory:', err.message);
      }
    }

    // Output formatted security log to console in non-production or for visibility
    const statusLabel = log.status === 'success' ? '[AUTH SUCCESS]' : '[AUTH ALERT]';
    console.info(`${statusLabel} Event: ${log.event} | Email: ${log.email} | IP: ${log.ip_address}`);

    return log;
  }

  /**
   * Retrieves recent audit logs for security review.
   */
  static async getRecentLogs(limit = 50): Promise<AuditLog[]> {
    if (db.isConnected()) {
      try {
        const rows = await db.query<any[]>(
          `SELECT * FROM audit_logs ORDER BY created_at DESC LIMIT ?`,
          [limit]
        );
        return rows.map((r) => ({
          ...r,
          metadata: typeof r.metadata === 'string' ? JSON.parse(r.metadata) : r.metadata,
        }));
      } catch (err) {
        return inMemoryAuditLogs.slice(0, limit);
      }
    }
    return inMemoryAuditLogs.slice(0, limit);
  }
}

export default AuditService;
