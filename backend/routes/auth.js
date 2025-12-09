const express = require('express');
const router = express.Router();
const pool = require('../db');
const bcrypt = require('bcrypt');

// LOGIN ROUTE
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const [rows] = await pool.query(
      'SELECT * FROM admin WHERE username = ?',
      [username]
    );

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const admin = rows[0];

    // For now comparing plaintext (password stored as plain in database)
    const ok = password === admin.password;

    // If using hashed passwords then use:
    // const ok = await bcrypt.compare(password, admin.password);

    if (!ok) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    return res.json({
      success: true,
      token: 'admin-token-123'
    });

  } catch (err) {
    console.error('Auth POST error:', err.message);
    res.status(500).json({ error: err.message || 'Login failed' });
  }
});

module.exports = router;
