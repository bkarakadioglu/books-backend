const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

async function connectToMongoDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, family: 4 , dbName: process.env.DB_NAME});
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

connectToMongoDB();

app.use(express.json());
app.use(cors());

const booksRouter = require('./routes/books');
const authorsRouter = require('./routes/authors');

app.use('/api/books', booksRouter);
app.use('/api/authors', authorsRouter);

const server = app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

module.exports = server;