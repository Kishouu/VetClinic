const express = require('express');
const { PrismaClient } = require('@prisma/client');
const authenticateToken = require('../middleware/auth');

const prisma = new PrismaClient();
const router = express.Router();

// Middleware: require doctor or admin role
function requireDoctorOrAdmin(req, res, next) {
  if (!req.user || !['doctor', 'admin'].includes(req.user.role)) {
    return res.status(403).json({ error: 'Doctor or admin access only' });
  }
  next();
}

// CREATE pet
router.post('/', authenticateToken, async (req, res) => {
  const userId = req.user.id;
  const { name, species, breed } = req.body;

  if (!name || !species) {
    return res.status(400).json({ error: 'Name and species are required' });
  }

  try {
    const newPet = await prisma.pet.create({
      data: { name, species, userId, breed },
    });
    res.status(201).json(newPet);
  } catch (err) {
    console.error('Create pet error:', err);
    res.status(500).json({ error: 'Failed to create pet' });
  }
});

// GET all pets (admin/doctor only)
router.get('/', authenticateToken, requireDoctorOrAdmin, async (req, res) => {
  try {
    const pets = await prisma.pet.findMany({
      include: {
        user: true,
        appointments: true,
      },
    });
    res.json(pets);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch pets' });
  }
});

// GET pets of logged-in user
router.get('/user', authenticateToken, async (req, res) => {
  const userId = req.user.id;
  try {
    const pets = await prisma.pet.findMany({
      where: { userId },
      include: { appointments: true },
    });
    res.json(pets);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch user pets' });
  }
});

// GET a specific pet by ID
router.get('/:id', authenticateToken, async (req, res) => {
  const petId = parseInt(req.params.id);
  try {
    const pet = await prisma.pet.findUnique({
      where: { id: petId },
      include: { user: true, appointments: true },
    });
    if (!pet) return res.status(404).json({ error: 'Pet not found' });
    res.json(pet);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch pet' });
  }
});

// UPDATE pet
router.put('/:id', authenticateToken, async (req, res) => {
  const petId = parseInt(req.params.id);
  const userId = req.user.id;
  const { name, species } = req.body;

  try {
    const pet = await prisma.pet.findUnique({
      where: { id: petId },
    });

    if (!pet || pet.userId !== userId) {
      return res.status(403).json({ error: 'Unauthorized or pet not found' });
    }

    const updatedPet = await prisma.pet.update({
      where: { id: petId },
      data: { name, species },
    });

    res.json({ message: 'Pet updated', pet: updatedPet });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update pet' });
  }
});

// DELETE pet
router.delete('/:id', authenticateToken, async (req, res) => {
  const petId = parseInt(req.params.id);
  const userId = req.user.id;

  try {
    const pet = await prisma.pet.findUnique({
      where: { id: petId },
    });

    if (!pet || pet.userId !== userId) {
      return res.status(403).json({ error: 'Unauthorized or pet not found' });
    }

    await prisma.pet.delete({ where: { id: petId } });
    res.json({ message: 'Pet deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete pet' });
  }
});

module.exports = router;
