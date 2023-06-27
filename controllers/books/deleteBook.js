const Book = require('../../models/Book');

/**
 * Delete a book
 * @route DELETE /api/books/:id
 * @param {string} id.path.required - The ID of the book to delete
 * @returns {string} 204 - No content
 * @returns {Error} 404 - Book not found
 * @returns {Error} 500 - Internal server error
 */
const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      res.status(404).json({ error: 'Book not found' });
    } else {
      res.sendStatus(204);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = deleteBook;
