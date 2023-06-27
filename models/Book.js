const mongoose = require('mongoose');

/**
 * Book schema
 */
const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author',
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  isbn: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  numberOfPages: {
    type: Number,
    required: true,
    min: 1,
  },
  publisher: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Book', bookSchema);
