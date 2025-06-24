const express = require('express');
const { PrismaClient } = require('@prisma/client');
const authenticateToken = require('../middleware/auth');

const prisma = new PrismaClient();
const router = express.Router();

// Middleware: require admin role
function requireAdmin(req, res, next) {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access only' });
  }
  next();
}

// Middleware: require doctor or admin
function requireDoctorOrAdmin(req, res, next) {
  if (!req.user || !['doctor', 'admin'].includes(req.user.role)) {
    return res.status(403).json({ error: 'Doctor or admin access only' });
  }
  next();
}

// CREATE appointment

router.post('/', authenticateToken, async (req, res) => {
  const userId = req.user.id;
  const { petName, date, serviceId, doctorId } = req.body;

  if (!petName || !date || !serviceId) {
    return res.status(400).json({ error: 'petName, date, and serviceId are required' });
  }

  try {
    let pet = await prisma.pet.findFirst({
      where: { name: petName, userId },
    });

    if (!pet) {
      return res.status(404).json({ error: 'Pet not found' });
    }

    let assignedDoctorId = doctorId;
    if (!doctorId) {
      const doctors = await prisma.doctor.findMany();
      if (doctors.length === 0) return res.status(404).json({ error: 'No available doctors' });
      assignedDoctorId = doctors[0].id;
    } else {
      const doctor = await prisma.doctor.findUnique({ where: { id: doctorId } });
      if (!doctor) return res.status(404).json({ error: 'Doctor not found' });
    }

    const service = await prisma.service.findUnique({ where: { id: serviceId } });
    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }

    const appointment = await prisma.appointment.create({
      data: {
        date: new Date(date),
        userId,
        doctorId: assignedDoctorId,
        serviceId,
        petId: pet.id,
      },
      include: { pet: true, doctor: true, service: true, user: true },
    });

    res.status(201).json({ message: 'Appointment created successfully', appointment });
  } catch (err) {
    console.error('Appointment creation error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/*
router.post('/', authenticateToken, async (req, res) => {
  const userId = req.user.id;
  const { date, notes, petName, species, breed, doctorId, serviceId } = req.body;

  if (!date || !petName || !species || !breed || !serviceId) {
    return res.status(400).json({
      error: 'Date, petName, species, and serviceId are required',
    });
  }

  try {
    let pet = await prisma.pet.findFirst({
      where: { name: petName, species, breed, userId },
    });

    if (!pet) {
      pet = await prisma.pet.create({
        data: { name: petName, species, breed, userId },
      });
    }

    let assignedDoctorId = doctorId;
    if (!doctorId) {
      const doctors = await prisma.doctor.findMany();
      if (doctors.length === 0) return res.status(404).json({ error: 'No available doctors' });
      assignedDoctorId = doctors[0].id;
    } else {
      const doctor = await prisma.doctor.findUnique({ where: { id: doctorId } });
      if (!doctor) return res.status(404).json({ error: 'Doctor not found' });
    }

    const service = await prisma.service.findUnique({ where: { id: serviceId } });
    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }

    const appointment = await prisma.appointment.create({
      data: {
        date: new Date(date),
        notes: notes || '',
        userId,
        doctorId: assignedDoctorId,
        serviceId,
        petId: pet.id,
      },
      include: {
        pet: true,
        doctor: true,
        service: true,
        user: true,
      },
    });

    res.status(201).json({ message: 'Appointment created successfully', appointment });
  } catch (err) {
    console.error('Appointment error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});
*/
// GET all appointments (admin only)
router.get('/', authenticateToken, requireDoctorOrAdmin, async (req, res) => {
  try {
    const appointments = await prisma.appointment.findMany({
      include: { pet: true, doctor: true, user: true, service: true },
    });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch appointments' });
  }
});

// GET appointments for logged-in user
router.get('/user', authenticateToken, async (req, res) => {
  const userId = req.user.id;
  try {
    const appointments = await prisma.appointment.findMany({
      where: { userId },
      include: { pet: true, doctor: true, service: true },
    });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch user appointments' });
  }
});

// GET appointments for a specific doctor (admin only)
router.get('/doctor/:doctorId', authenticateToken, requireDoctorOrAdmin, async (req, res) => {
  const doctorId = parseInt(req.params.doctorId);
  try {
    const appointments = await prisma.appointment.findMany({
      where: { doctorId },
      include: { pet: true, user: true, service: true },
    });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch doctor appointments' });
  }
});

// UPDATE appointment (doctor or admin only)
router.put('/:id', authenticateToken, requireDoctorOrAdmin, async (req, res) => {
  const appointmentId = parseInt(req.params.id);
  const { date, notes, serviceId, doctorId } = req.body;

  try {
    if (serviceId) {
      const service = await prisma.service.findUnique({ where: { id: serviceId } });
      if (!service) return res.status(404).json({ error: 'Service not found' });
    }

    if (doctorId) {
      const doctor = await prisma.doctor.findUnique({ where: { id: doctorId } });
      if (!doctor) return res.status(404).json({ error: 'Doctor not found' });
    }

    const updatedAppointment = await prisma.appointment.update({
      where: { id: appointmentId },
      data: {
        date: date ? new Date(date) : undefined,
        notes,
        serviceId,
        doctorId,
      },
      include: { pet: true, doctor: true, service: true },
    });

    res.json({ message: 'Appointment updated', appointment: updatedAppointment });
  } catch (err) {
    console.error(err);
    res.status(404).json({ error: 'Appointment not found or update failed' });
  }
});

// DELETE appointment (admin only)
router.delete('/:id', authenticateToken, requireDoctorOrAdmin, async (req, res) => {
  const appointmentId = parseInt(req.params.id);
  try {
    await prisma.appointment.delete({ where: { id: appointmentId } });
    res.json({ message: 'Appointment deleted' });
  } catch (err) {
    res.status(404).json({ error: 'Appointment not found or deletion failed' });
  }
});

module.exports = router;
