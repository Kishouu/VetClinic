const express = require('express');
const { PrismaClient } = require('@prisma/client');
const authenticateToken = require('../middleware/auth');

const prisma = new PrismaClient();
const router = express.Router();

router.post('/', authenticateToken, async (req, res) => {
  const userId = req.user.id;
  const { date, notes, petName, species, type, doctorId } = req.body;

  if (!date || !petName || !species) {
    return res.status(400).json({ error: 'Date, petName, and species are required' });
  }

  try {
    let pet = await prisma.pet.findFirst({
      where: {
        name: petName,
        species,
        userId,
      },
    });

    if (!pet) {
      pet = await prisma.pet.create({
        data: {
          name: petName,
          species,
          userId,
        },
      });
    }

    let assignedDoctorId = doctorId;

    if (!doctorId) {
      const doctors = await prisma.doctor.findMany();
      if (doctors.length === 0) {
        return res.status(404).json({ error: 'No available doctors' });
      }
      assignedDoctorId = doctors[0].id;
    } else {
      const doctor = await prisma.doctor.findUnique({ where: { id: doctorId } });
      if (!doctor) {
        return res.status(404).json({ error: 'Doctor not found' });
      }
    }

    const appointment = await prisma.appointment.create({
      data: {
        date: new Date(date),
        notes: notes || '',
        userId,
        petId: pet.id,
        doctorId: assignedDoctorId,
      },
      include: {
        pet: true,
        doctor: true,
      },
    });

    res.status(201).json({ message: 'Appointment created successfully', appointment });
  } catch (err) {
    console.error('Appointment error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;

