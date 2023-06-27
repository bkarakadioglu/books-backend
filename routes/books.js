const express = require('express');
const router = express.Router();
const getBooks = require('../controllers/books/getBooks');
const updateBook = require('../controllers/books/updateBook');
const deleteBook = require('../controllers/books/deleteBook');
const createBook = require('../controllers/books/createBook');

// GET /api/books
router.get('/', getBooks);

// PUT /api/books/:id
router.put('/:id', updateBook);

// DELETE /api/books/:id
router.delete('/:id', deleteBook);

// POST /api/books
router.post('/', createBook);

module.exports = router;
