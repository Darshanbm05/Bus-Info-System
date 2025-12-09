const express = require('express');
const router = express.Router();
const pool = require('../db');

// Get all buses (optionally filter by from/to)
router.get('/', async (req, res) => {
  try {
    const { from, to } = req.query;
    let sql = `
      SELECT b.busid, b.class_of_service, b.via_places, b.departure_time,
             pfrom.id as from_id, pfrom.name as from_name,
             pto.id as to_id, pto.name as to_name
      FROM buses b
      JOIN places pfrom ON b.from_place_id = pfrom.id
      JOIN places pto ON b.to_place_id = pto.id
    `;
    const params = [];
    const clauses = [];
    if (from) {
      clauses.push('pfrom.name = ?');
      params.push(from);
    }
    if (to) {
      clauses.push('pto.name = ?');
      params.push(to);
    }
    if (clauses.length) sql += ' WHERE ' + clauses.join(' AND ');
    sql += ' ORDER BY b.departure_time';
    const [rows] = await pool.query(sql, params);
    res.json(rows);
  } catch (err) {
    console.error('Buses GET error:', err.message);
    res.status(500).json({ error: err.message || 'Failed to fetch buses' });
  }
});

// Add bus
router.post('/', async (req, res) => {
  try {
    const { from_place_id, to_place_id, class_of_service, via_places, departure_time } = req.body;
    if (!from_place_id || !to_place_id) return res.status(400).json({ error: 'from and to required' });
    const [result] = await pool.query(
      `INSERT INTO buses (from_place_id, to_place_id, class_of_service, via_places, departure_time)
       VALUES (?, ?, ?, ?, ?)`,
      [from_place_id, to_place_id, class_of_service || '', via_places || '', departure_time || null]
    );
    const [rows] = await pool.query(
      `SELECT b.*, pfrom.name as from_name, pto.name as to_name
       FROM buses b
       JOIN places pfrom ON b.from_place_id = pfrom.id
       JOIN places pto ON b.to_place_id = pto.id
       WHERE b.busid = ?`, [result.insertId]
    );
    res.json(rows[0]);
  } catch (err) {
    console.error('Buses POST error:', err.message);
    res.status(500).json({ error: err.message || 'Failed to add bus' });
  }
});

// Delete bus
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM buses WHERE busid = ?', [id]);
    res.json({ success: true });
  } catch (err) {
    console.error('Buses DELETE error:', err.message);
    res.status(500).json({ error: err.message || 'Failed to delete bus' });
  }
});

// Timetable for place id (show buses that go from/to or via the place)
router.get('/timetable/:placeId', async (req, res) => {
  try {
    const placeId = req.params.placeId;
    // buses where from_place_id = placeId OR to_place_id = placeId OR via_places LIKE placeName
    const [[placeRow]] = await pool.query('SELECT * FROM places WHERE id = ?', [placeId]);
    if (!placeRow) return res.status(404).json({ error: 'Place not found' });

    const name = placeRow.name;
    const [rows] = await pool.query(`
      SELECT b.busid, b.class_of_service, b.via_places, b.departure_time,
             pfrom.name as from_name, pto.name as to_name
      FROM buses b
      JOIN places pfrom ON b.from_place_id = pfrom.id
      JOIN places pto ON b.to_place_id = pto.id
      WHERE b.from_place_id = ? 
      ORDER BY b.departure_time
    `, [placeId, placeId, '%' + name + '%']);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
