const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const USERS_FILE = path.join(__dirname, '..', 'data', 'users.json');

// Load users
function loadUsers() {
  if (!fs.existsSync(USERS_FILE)) return [];
  const data = fs.readFileSync(USERS_FILE, 'utf-8');
  return JSON.parse(data);
}

// Save users
function saveUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

// ✅ Registration Route
router.post('/register', (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('📩 Registration request received:', email);

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const users = loadUsers();
    const existingUser = users.find((u) => u.email === email);

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    users.push({ email, password });
    saveUsers(users);

    console.log('✅ User registered:', email);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('❌ Registration failed:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// ✅ Login Route
router.post('/login', (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('🔐 Login attempt:', email);

    const users = loadUsers();
    const user = users.find((u) => u.email === email && u.password === password);

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    console.log('✅ Login successful for:', email);
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('❌ Login failed:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
