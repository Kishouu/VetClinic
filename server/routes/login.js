const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Find user from all roles by login
async function findUserByLogin(login) {
  const [user, doctor, admin] = await Promise.all([
    prisma.user.findUnique({ where: { login } }),
    prisma.doctor.findUnique({ where: { login } }),
    prisma.admin.findUnique({ where: { login } }),
  ]);

  if (user) return { user, role: 'user' };
  if (doctor) return { user: doctor, role: 'doctor' };
  if (admin) return { user: admin, role: 'admin' };
  return null;
}

// Login endpoint
router.post('/', async (req, res) => {
  const { login, password } = req.body;
  if (!login || !password) return res.status(400).json({ error: 'Missing login or password' });

  const result = await findUserByLogin(login);
  if (!result) return res.status(401).json({ error: 'Invalid login' });

  const { user, role } = result;

  // Check password (hashed)
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ error: 'Invalid password' });

  // Generate JWT token with user id and role
  const token = jwt.sign({ id: user.id, role }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token, role });
});

module.exports = router;
