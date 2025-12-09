const express = require('express');
const router = express.Router();
const pool = require('../db');

// Submit a new query
router.post('/', async (req, res) => {
  try {
    const { user_email, user_name, query_subject, query_message } = req.body;
    
    if (!user_email || !query_message) {
      return res.status(400).json({ error: 'Email and message are required' });
    }

    const [result] = await pool.query(
      `INSERT INTO queries (user_email, user_name, query_subject, query_message, is_read) 
       VALUES (?, ?, ?, ?, FALSE)`,
      [user_email, user_name || null, query_subject || null, query_message]
    );

    const [rows] = await pool.query('SELECT * FROM queries WHERE id = ?', [result.insertId]);
    console.log('Query submitted:', user_email);
    res.json(rows[0]);
  } catch (err) {
    console.error('Query POST error:', err.message);
    res.status(500).json({ error: err.message || 'Failed to submit query' });
  }
});

// Get all queries (admin only)
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM queries ORDER BY is_read ASC, created_at DESC'
    );
    res.json(rows);
  } catch (err) {
    console.error('Queries GET error:', err.message);
    res.status(500).json({ error: err.message || 'Failed to fetch queries' });
  }
});

// Get unread queries count
router.get('/unread', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT COUNT(*) as unread_count FROM queries WHERE is_read = FALSE'
    );
    res.json({ unread_count: rows[0].unread_count });
  } catch (err) {
    console.error('Unread queries GET error:', err.message);
    res.status(500).json({ error: err.message || 'Failed to fetch unread count' });
  }
});

// Mark query as read
router.put('/:id/read', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('UPDATE queries SET is_read = TRUE WHERE id = ?', [id]);
    res.json({ success: true });
  } catch (err) {
    console.error('Query READ error:', err.message);
    res.status(500).json({ error: err.message || 'Failed to mark as read' });
  }
});

// Delete query
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM queries WHERE id = ?', [id]);
    res.json({ success: true });
  } catch (err) {
    console.error('Query DELETE error:', err.message);
    res.status(500).json({ error: err.message || 'Failed to delete query' });
  }
});

module.exports = router;
