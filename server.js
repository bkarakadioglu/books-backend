const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 3000;


/**
 * Connect to MongoDB
 * @returns {Promise<void>}
 * @author bkarakadioglu
 */
async function connectToMongoDB() {
  try {
    await mongoose.connect('mongodb://localhost:27017/dbLib', { useNewUrlParser: true, useUnifiedTopology: true, family: 4 });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

// Connect to MongoDB
connectToMongoDB();

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());

// Routes
const booksRouter = require('./routes/books');
const authorsRouter = require('./routes/authors');

app.use('/api/books', booksRouter);
app.use('/api/authors', authorsRouter);

// Start the server
module.exports = app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
