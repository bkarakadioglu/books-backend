const mongoose = require('mongoose');

/**
 * Author schema
 */
const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  birthdate: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model('Author', authorSchema);
