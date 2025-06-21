const express = require('express');
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const router = express.Router();

router.post('/', async (req, res) => {
  const { login, password } = req.body;
  console.log(" Incoming registration request:", req.body);

  if (!login || !password) {
    return res.status(400).json({ error: 'Login and password are required' });
  }

try {
    const existingUser = await prisma.user.findUnique({ where: { login } });

    if (existingUser) {
      return res.status(409).json({ error: 'User with this login already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        login,
        password: hashedPassword,
      },
    });

    console.log(` User registered: ${newUser.login}`);
    res.status(201).json({ message: 'User registered successfully', userId: newUser.id });
  } catch (error) {
    console.error(' Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

router.post('/', async (req, res) => {
  const { login, password } = req.body;
  if (!login || !password) return res.status(400).json({ error: 'Login and password are required' });

  try {
    const existingUser = await prisma.user.findUnique({ where: { login } });
    if (existingUser) return res.status(409).json({ error: 'User with this login already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({ data: { login, password: hashedPassword } });

    // Create JWT token (role = 'user' by default for registered users)
    const token = jwt.sign({ id: newUser.id, role: 'user' }, JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ message: 'User registered successfully', token, role: 'user' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
