const express = require('express');
const router = express.Router();
const pool = require('../db');

// Get all places
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM places ORDER BY name');
    res.json(rows);
  } catch (err) {
    console.error('Places GET error:', err.message);
    res.status(500).json({ error: err.message || 'Failed to fetch places' });
  }
});

// Add a place
router.post('/', async (req, res) => {
  try {
    const { name } = req.body;
    console.log('Adding place:', name);
    if (!name) return res.status(400).json({ error: 'Place name required' });
    const [result] = await pool.query('INSERT INTO places (name) VALUES (?)', [name]);
    console.log('Place inserted with ID:', result.insertId);
    const [rows] = await pool.query('SELECT * FROM places WHERE id = ?', [result.insertId]);
    res.json(rows[0]);
  } catch (err) {
    console.error('Places POST error:', err.message);
    res.status(500).json({ error: err.message || 'Failed to add place' });
  }
});

// Delete place
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM places WHERE id = ?', [id]);
    res.json({ success: true });
  } catch (err) {
    console.error('Places DELETE error:', err.message);
    res.status(500).json({ error: err.message || 'Failed to delete place' });
  }
});

module.exports = router;
