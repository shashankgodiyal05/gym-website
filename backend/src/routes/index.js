import express from 'express';
import authRoutes from './authRoutes.js';
import trainersRoutes from './trainersRoutes.js';
import bookingsRoutes from './bookingsRoutes.js';
import membershipsRoutes from './membershipsRoutes.js';
import facilitiesRoutes from './facilitiesRoutes.js';

const router = express.Router();

// Mount resources
router.use('/auth', authRoutes);
router.use('/trainers', trainersRoutes);
router.use('/bookings', bookingsRoutes);
router.use('/memberships', membershipsRoutes);
router.use('/facilities', facilitiesRoutes);

// Health check
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    service: 'PulseFit Gym API',
    version: '1.0.0',
    uptimeSeconds: Math.floor(process.uptime()),
    timestamp: new Date().toISOString()
  });
});

// API Directory
router.get('/', (req, res) => {
  res.status(200).json({
    service: 'PulseFit Gym REST API',
    version: '1.0.0',
    status: 'online',
    endpoints: {
      health: 'GET /api/health',
      auth: {
        register: 'POST /api/auth/register',
        login: 'POST /api/auth/login',
        me: 'GET /api/auth/me',
        profile: 'PUT /api/auth/profile',
        reset: 'POST /api/auth/reset'
      },
      trainers: {
        list: 'GET /api/trainers?category=&search=',
        getById: 'GET /api/trainers/:id',
        slots: 'GET /api/trainers/:id/slots'
      },
      bookings: {
        list: 'GET /api/bookings?userId=',
        create: 'POST /api/bookings',
        cancel: 'DELETE /api/bookings/:id'
      },
      memberships: {
        plans: 'GET /api/memberships',
        enroll: 'POST /api/memberships/enroll',
        active: 'GET /api/memberships/active'
      },
      facilities: {
        list: 'GET /api/facilities',
        inquiry: 'POST /api/facilities/inquiry'
      }
    }
  });
});

export default router;
