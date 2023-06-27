const express = require('express');
const router = express.Router();
const Author = require('../models/Author');

// Route: GET /authors
// Description: Get all authors
router.get('/', async (req, res) => {
  try {
    const authors = await Author.find();
    res.json(authors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
