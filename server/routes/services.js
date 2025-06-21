const express = require('express');
const { PrismaClient } = require('@prisma/client');
const authenticateToken = require('../middleware/auth');

const prisma = new PrismaClient();
const router = express.Router();

// Middleware to restrict access to admins
function requireAdmin(req, res, next) {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access only' });
  }
  next();
}

// GET all services
router.get('/', authenticateToken, async (req, res) => {
  try {
    const services = await prisma.service.findMany({
      include: { doctor: true },
    });
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch services' });
  }
});

// GET service by ID
router.get('/:id', authenticateToken, async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const service = await prisma.service.findUnique({
      where: { id },
      include: { doctor: true },
    });
    if (!service) return res.status(404).json({ error: 'Service not found' });
    res.json(service);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch service' });
  }
});

// POST - Create service (Admins only)
router.post('/', authenticateToken, requireAdmin, async (req, res) => {
  const { name, price, doctorId } = req.body;
  if (!name || !price || !doctorId) {
    return res.status(400).json({ error: 'name, price, and doctorId are required' });
  }

  try {
    const service = await prisma.service.create({
      data: { name, price, doctorId },
    });
    res.status(201).json(service);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create service' });
  }
});

// PUT - Update service (Admins only)
router.put('/:id', authenticateToken, requireAdmin, async (req, res) => {
  const id = parseInt(req.params.id);
  const { name, price } = req.body;

  try {
    const updated = await prisma.service.update({
      where: { id },
      data: { name, price },
    });
    res.json(updated);
  } catch (err) {
    res.status(404).json({ error: 'Service not found or update failed' });
  }
});

// DELETE - Remove service (Admins only)
router.delete('/:id', authenticateToken, requireAdmin, async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    await prisma.service.delete({ where: { id } });
    res.json({ message: 'Service deleted' });
  } catch (err) {
    res.status(404).json({ error: 'Service not found or deletion failed' });
  }
});

module.exports = router;
