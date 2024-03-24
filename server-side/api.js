// server/api.js

const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const router = express.Router();
const db = new sqlite3.Database('searchncheck.db');


// API endpoint for searching users by name
router.get('/search', (req, res) => {

  const { query, category } = req.query;
  console.log(req.query)
  if (!category) {
    return res.status(400).json({ error: 'Category parameters are required' });
  }

  const sql = `SELECT * FROM compData WHERE ${category} = ?`;

  db.all(sql, [`${query}`], (err, rows) => {
    if (err) {
      console.error('Error searching users:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.json(rows);
  });
});

router.get('/', (req, res) => {console.log("hi"); res.json({hi: 'HI'})})



module.exports = router;
