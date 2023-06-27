const Book = require('../../models/Book');

/**
 * Get all books
 * @route GET /api/books
 * @returns {Array<Book>} 200 - An array of books
 * @returns {Error} 500 - Internal server error
 */
const getBooks = async (req, res) => {
  try {
    const books = await Book.find().populate('author');
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = getBooks;
