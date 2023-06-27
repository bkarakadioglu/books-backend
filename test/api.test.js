const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');

chai.use(chaiHttp);
const expect = chai.expect;

describe('Books API', () => {
  // Test GET /api/books
  describe('GET /api/books', () => {
    it('should return an array of books', (done) => {
      chai
        .request(app)
        .get('/api/books')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          done();
        });
    });
  });

  // Test POST /api/books
  describe('POST /api/books', () => {
    it('should create a new book', (done) => {
      const newBook = {
        title: 'Animal Farm',
        author: '649ae6fb70daf4f672aeade9', 
        price: 11.98,
        isbn: '978-0452284241',
        language: 'English',
        numberOfPages: 128,
        publisher: 'Plume',
      };

      chai
        .request(app)
        .post('/api/books')
        .send(newBook)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.be.an('object');
          expect(res.body.title).to.equal('Animal Farm');
          done();
        });
    });

    it('should return 400 Bad Request for missing required fields', (done) => {
      const invalidBook = {
        title: 'Animal Farm',
        // Missing author field
        price: 9.99,
        isbn: '978-0452284241',
        language: 'English',
        numberOfPages: 128,
        publisher: 'Plume',
      };

      chai
        .request(app)
        .post('/api/books')
        .send(invalidBook)
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
  });

  // Test PUT /api/books/:id
  describe('PUT /api/books/:id', () => {
    it('should update an existing book', (done) => {
      const updatedBook = {
        title: '19845', //Changing 1984 to 19845
        author: '649ae6fb70daf4f672aeade9',
        price: 9.99,
        isbn: '978-1443434973',
        language: 'English',
        numberOfPages: 416,
        publisher: 'Harper Perennial',
      };

      chai
        .request(app)
        .put('/api/books/649b2788bc50c73760506806') //Id for the book 1984
        .send(updatedBook)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body.title).to.equal('19845');
          done();
        });
    });

    it('should return 404 Not Found for non-existent book', (done) => {
      const updatedBook = {
        title: '19845',
        author: '649ae6fb70daf4f672aeade9', 
        price: 19.99,
        isbn: '978-1443434973',
        language: 'English',
        numberOfPages: 300,
        publisher: 'Harper Perennial',
      };
      //While trying to find an id that doesn't exist, the fake id should be in the /^[0-9a-fA-F]{24}$/ valid ObjectId form,
      //because mongoose tries to casts id parameter to the model's _id field so that it can properly query
      chai
        .request(app)
        .put('/api/books/012345678901234567891234') // Id 012345678901234567891234 does not exist
        .send(updatedBook)
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });
  });

  // Test DELETE /api/books/:id
  describe('DELETE /api/books/:id', () => {
    it('should delete an existing book', (done) => {
      chai
        .request(app)
        .delete('/api/books/649b2788bc50c73760506806')
        .end((err, res) => {
          expect(res).to.have.status(204);
          done();
        });
    });
        //While trying to find an id that doesn't exist, the fake id should be in the /^[0-9a-fA-F]{24}$/ valid ObjectId form,
      //because mongoose tries to casts id parameter to the model's _id field so that it can properly query
    it('should return 404 Not Found for non-existent book', (done) => {
      chai
        .request(app)
        .delete('/api/books/012345678901234567891234') // Id 012345678901234567891234 does not exist
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });
  });
});
