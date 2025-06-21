const express = require('express');
const { PrismaClient } = require('@prisma/client');
const authenticateToken = require('../middleware/auth');

const prisma = new PrismaClient();
const router = express.Router();

// Helper middleware: only admin or doctor
function requireAdminOrDoctor(req, res, next) {
  if (req.user?.role !== 'admin' && req.user?.role !== 'doctor') {
    return res.status(403).json({ error: 'Access allowed for admin or doctor only' });
  }
  next();
}

// GET all doctors
router.get('/', authenticateToken, async (req, res) => {
  try {
    if (req.user.role === 'admin' || req.user.role === 'doctor') {
      // Full info for admin or doctor
      const doctors = await prisma.doctor.findMany({
        include: {
          services: true,
          appointments: true,
          receipts: true,
        },
      });
      return res.json(doctors);
    } else {
      // Simple users see only login and services
      const doctors = await prisma.doctor.findMany({
        select: {
          id: true,
          login: true,
          services: {
            select: {
              id: true,
              name: true,
              price: true,
            },
          },
        },
      });
      return res.json(doctors);
    }
  } catch (err) {
    console.error('Failed to fetch doctors:', err);
    res.status(500).json({ error: 'Failed to fetch doctors' });
  }
});

// GET doctor by ID
router.get('/:id', authenticateToken, async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    if (req.user.role === 'admin' || req.user.role === 'doctor') {
      // Full info for admin or doctor
      const doctor = await prisma.doctor.findUnique({
        where: { id },
        include: {
          services: true,
          appointments: true,
          receipts: true,
        },
      });
      if (!doctor) return res.status(404).json({ error: 'Doctor not found' });
      return res.json(doctor);
    } else {
      // Simple user: only login and services
      const doctor = await prisma.doctor.findUnique({
        where: { id },
        select: {
          id: true,
          login: true,
          services: {
            select: {
              id: true,
              name: true,
              price: true,
            },
          },
        },
      });
      if (!doctor) return res.status(404).json({ error: 'Doctor not found' });
      return res.json(doctor);
    }
  } catch (err) {
    console.error('Failed to fetch doctor by ID:', err);
    res.status(500).json({ error: 'Failed to fetch doctor' });
  }
});

// GET doctor by service ID
router.get('/service/:serviceId', authenticateToken, async (req, res) => {
  const serviceId = parseInt(req.params.serviceId);

  try {
    const service = await prisma.service.findUnique({
      where: { id: serviceId },
      include: {
        doctor: {
          select: {
            id: true,
            login: true,
            services: true,
            // appointments and receipts are excluded for service query
          },
        },
      },
    });

    if (!service || !service.doctor) {
      return res.status(404).json({ error: 'No doctors found for this service' });
    }

    // For simple user, only send doctor login and services; for admin/doctor send full doctor info
    if (req.user.role === 'admin' || req.user.role === 'doctor') {
      // Get full doctor info (include appointments and receipts)
      const fullDoctor = await prisma.doctor.findUnique({
        where: { id: service.doctor.id },
        include: {
          services: true,
          appointments: true,
          receipts: true,
        },
      });
      return res.json(fullDoctor);
    } else {
      // Simple user: send limited info
      const limitedDoctor = {
        id: service.doctor.id,
        login: service.doctor.login,
        services: service.doctor.services,
      };
      return res.json(limitedDoctor);
    }
  } catch (err) {
    console.error('Failed to fetch doctors by service:', err);
    res.status(500).json({ error: 'Failed to fetch doctors by service' });
  }
});

module.exports = router;
