import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRouter from './src/routes/index.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'http://localhost:4173',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:5173'
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, server-to-server)
      if (!origin) return callback(null, true);
      // In production or custom domains, allow origin or vercel preview domains
      if (
        process.env.NODE_ENV === 'production' ||
        process.env.CORS_ORIGIN === '*' ||
        origin.endsWith('.vercel.app') ||
        allowedOrigins.includes(origin)
      ) {
        return callback(null, true);
      }
      return callback(null, true); // Permissive for client demo
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);

app.use(express.json());

// Request logger
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[${req.method}] ${req.originalUrl} - ${res.statusCode} (${duration}ms)`);
  });
  next();
});

// Root Welcome Endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    name: 'PulseFit™ API Backend',
    version: '1.0.0',
    description: 'REST API for PulseFit Gym & Athletic Training Platform',
    documentation: '/api',
    health: '/api/health'
  });
});

// Mount API router
app.use('/api', apiRouter);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Endpoint ${req.method} ${req.originalUrl} not found. Visit /api for directory.`
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('[PulseFit API Error]', err.stack || err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
  });
});

// Only listen if not imported by serverless function or testing
if (process.env.NODE_ENV !== 'test' && !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`\n========================================`);
    console.log(`🏋️ PulseFit™ API Backend Running`);
    console.log(`📡 URL: http://localhost:${PORT}`);
    console.log(`🩺 Health: http://localhost:${PORT}/api/health`);
    console.log(`📋 API Docs: http://localhost:${PORT}/api`);
    console.log(`========================================\n`);
  });
}

export default app;
