const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = chai;
const app = require('../server');
const Book = require('../models/Book');

chai.use(chaiHttp);

describe('Books API', () => {
  after(async () => {
    await Book.deleteMany({title: "Mock Book"});
    await Book.deleteMany({title: "Updated Book"});
  });

  describe('GET /api/books', () => {
    it('should get all books', async () => {
      const res = await chai.request(app).get('/api/books');
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array');
    });
  });

  describe('POST /api/books', () => {
    it('should create a new book', async () => {
      const mockBook = {
        title: 'Mock Book',
        author: '649ae6fb70daf4f672aeade9', //Id for George Orwell
        price: 11.98,
        isbn: '978-0452284241',
        language: 'English',
        numberOfPages: 128,
        publisher: 'Plume',
      };

      const res = await chai.request(app).post('/api/books').send(mockBook);
      expect(res).to.have.status(201);
      expect(res.body).to.include(mockBook);

      // Verify the book is saved in the database
      const book = await Book.findOne({ title: 'Mock Book' });
      expect(book).to.exist;
    });

    it('should return an error when creating an invalid book', async () => {
      const invalidBook = {
        author: 'New Author',
        price: 29.99,
      };

      const res = await chai.request(app).post('/api/books').send(invalidBook);
      expect(res).to.have.status(400);
      expect(res.body).to.have.property('error', 'Bad request');
    });
  });

  describe('PUT /api/books/:id', () => {
    it('should update an existing book', async () => {
      // Create a mock book
      const mockBook = await Book.create({ 
        title: 'Mock Book',
        author: '649ae6fb70daf4f672aeade9', //Id for George Orwell
        price: 11.98,
        isbn: '978-0452284241',
        language: 'English',
        numberOfPages: 128,
        publisher: 'Plume',
      });

      const updatedBook = {
        title: 'Updated Book',
        price: 19.99,
      };

      const res = await chai.request(app).put(`/api/books/${mockBook._id}`).send(updatedBook);
      expect(res).to.have.status(200);
      expect(res.body.title).to.equal(updatedBook.title);
      expect(res.body.price).to.equal(updatedBook.price);

      // Verify the book is updated in the database
      const updatedBookInDB = await Book.findById(mockBook._id);
      expect(updatedBookInDB.title).to.equal(updatedBook.title);
      expect(updatedBookInDB.price).to.equal(updatedBook.price);
    });

    it('should return an error when updating a non-existent book', async () => {
      const updatedBook = {
        title: 'Updated Book',
        price: 19.99,
      };
      //While trying to find an id that doesn't exist, the fake id should be in the /^[0-9a-fA-F]{24}$/ valid ObjectId form,
      //because mongoose tries to casts id parameter to the model's _id field so that it can properly query
      const res = await chai.request(app).put('/api/books/012345678901234567890123').send(updatedBook);
      expect(res).to.have.status(404);
      expect(res.body).to.have.property('error');
    });
  });

  describe('DELETE /api/books/:id', () => {
    it('should delete an existing book', async () => {
      // Create a mock book
      const book = await Book.create({ 
        title: 'Mock Book',
        author: '649ae6fb70daf4f672aeade9', //Id for George Orwell
        price: 11.98,
        isbn: '978-0452284241',
        language: 'English',
        numberOfPages: 128,
        publisher: 'Plume',
      });

      const res = await chai.request(app).delete(`/api/books/${book._id}`);
      expect(res).to.have.status(204);

      // Verify the book is deleted from the database
      const deletedBook = await Book.findById(book._id);
      expect(deletedBook).to.not.exist;
    });

    it('should return an error when deleting a non-existent book', async () => {
      //While trying to find an id that doesn't exist, the fake id should be in the /^[0-9a-fA-F]{24}$/ valid ObjectId form,
      //because mongoose tries to casts id parameter to the model's _id field so that it can properly query
      const res = await chai.request(app).delete('/api/books/012345678901234567890123');
      expect(res).to.have.status(404);
      expect(res.body).to.have.property('error', "Book not found");
    });
  });
});
