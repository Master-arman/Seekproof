import { Router, Request, Response } from 'express';
import db from '../database/db';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  const dbStatus = await db.testDbConnection();

  res.status(200).json({
    success: true,
    status: 'online',
    timestamp: new Date().toISOString(),
    service: 'SeekProof Investigation Platform API',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    database: {
      connected: dbStatus.connected,
      message: dbStatus.message
    }
  });
});

export default router;
