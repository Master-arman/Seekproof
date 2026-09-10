import express, { Application } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import { config } from './config';
import { apiLimiter } from './middleware/rateLimiter';
import { errorHandler, notFoundHandler } from './middleware/errorMiddleware';

// Route imports
import healthRoutes from './routes/healthRoutes';
import authRoutes from './routes/authRoutes';
import caseRoutes from './routes/caseRoutes';
import inquiryRoutes from './routes/inquiryRoutes';
import v1Routes from './routes/v1Routes';

const app: Application = express();

// Security Middlewares
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' }
}));

app.use(cors({
  origin: [config.clientUrl, 'http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parsing with JSON size limit
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request Logging
if (config.env !== 'test') {
  app.use(morgan('dev'));
}

// Global API rate limiting
app.use('/api', apiLimiter);

// Primary API v1 Endpoints (/api/v1/*)
app.use('/api/v1', v1Routes);

// Compatibility Endpoints
app.use('/api/health', healthRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/cases', caseRoutes);
app.use('/api/inquiries', inquiryRoutes);

// Fallback & Error Handling
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
