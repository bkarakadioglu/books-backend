const Book = require('../../models/Book');

/**
 * Update a book
 * @route PUT /api/books/:id
 * @param {string} id.path.required - The ID of the book to update
 * @param {Book} book.body.required - The updated book object
 * @returns {Book} 200 - The updated book
 * @returns {Error} 400 - Bad request
 * @returns {Error} 404 - Book not found
 * @returns {Error} 500 - Internal server error
 */
const updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {returnOriginal : false});
    if (!book) {
      res.status(404).json({ error: 'Book not found' });
    } else {
      res.json(book);
    }
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(400).json({ error: 'Bad request' });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

module.exports = updateBook;
