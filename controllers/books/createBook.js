const Book = require('../../models/Book');

/**
 * Create a new book
 * @route POST /api/books
 * @param {Book} book.body.required - The book object to create
 * @returns {Book} 201 - The created book
 * @returns {Error} 400 - Bad request
 * @returns {Error} 500 - Internal server error
 */
const createBook = async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(400).json({ error: 'Bad request' });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

module.exports = createBook;
