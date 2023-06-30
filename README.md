# books-backend

books-backend is a RESTful API that I developed for the HubX backend case for my new grad application. It does basic crud operations: getting all the books, getting all the authors,
creating a book, creating an author, deleting a book and updating a book. It is also dockerized.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)


## Prerequisites
- Node
- MongoDB
- Docker

## Usage
### Running Locally
1. Clone the repo
2. Install dependencies `npm install`
3. Start the server `npm start`
4. The server will start running at `http://localhost:3000`.

### Running With Docker
1. Clone the repo
2. Build and start the containers `docker compose up api`
3. The server can be reached at `http://localhost:3000`.

### Testing Locally
1. Clone the repo
2. Install dependencies `npm install`
3. Start the tests `npm test`

### Testing With Docker
1. Clone the repo
2. Build and start the containers `docker compose up tests`

## API Endpoints

The Books API provides the following endpoints:

- `GET /api/books`: Get all books.
- `POST /api/books`: Create a new book.
- `PUT /api/books/:id`: Update an existing book.
- `DELETE /api/books/:id`: Delete a book.
- `GET /api/authors`: Get all authors.
- `POST /api/authors`: Create a new author. 

### Base URL

The base URL for all API endpoints is: `http://localhost:3000/api`

### Endpoints

#### Get All Books

- **URL:** `/books`
- **Method:** `GET`
- **Description:** Retrieve a list of all books.
- **Response:**
  - **Status Code:** 200 (OK)
  - **Body:**
    ```
    [
      {
        "_id": "book_id",
        "title": "Book Title",
        "author": {
          "id": "author_id",
          "name": "Author Name",
          "country": "Author Country",
          "birthdate": "Author Birthdate"
        },
        "price": 19.99,
        "isbn": "978-0-123456-78-9",
        "language": "English",
        "numberOfPages": 300,
        "publisher": "Publisher Name"
      },
      ...more books
    ]
    ```
#### Create a Book

- **URL:** `/books`
- **Method:** `POST`
- **Description:** Create a new book.
- **Request Body:**
  ```json
  {
    "title": "Book Title",
    "author": "author_id",
    "price": 19.99,
    "isbn": "978-0-123456-78-9",
    "language": "English",
    "numberOfPages": 300,
    "publisher": "Publisher Name"
  }
  ```
- **Response:**
  - **Status Code:** 201 (Created)
  - **Body:**
    ```json
    {
      "_id": "book_id",
      "title": "Book Title",
      "author": {
        "_id": "author_id",
        "name": "Author Name",
        "country": "Author Country",
        "birthdate": "Author Birthdate"
      },
      "price": 19.99,
      "isbn": "978-0-123456-78-9",
      "language": "English",
      "numberOfPages": 300,
      "publisher": "Publisher Name"
    }
    ```

#### Update a Book

- **URL:** `/books/:id`
- **Method:** `PUT`
- **Description:** Update an existing book.
- **URL Parameters:**
  - `id` (string) - The ID of the book.
- **Request Body:**
  ```json
  {
    "title": "Updated Book Title",
    "price": 24.99,
    "publisher": "Updated Publisher Name"
  }
  ```
- **Response:**
  - **Status Code:**

 200 (OK)
  - **Body:**
    ```json
    {
      "_id": "book_id",
      "title": "Updated Book Title",
      "author": {
        "_id": "author_id",
        "name": "Author Name",
        "country": "Author Country",
        "birthdate": "1950-01-01"
      },
      "price": 24.99,
      "isbn": "978-0-123456-78-9",
      "language": "English",
      "numberOfPages": 300,
      "publisher": "Updated Publisher Name"
    }
    ```

#### Delete a Book

- **URL:** `/books/:id`
- **Method:** `DELETE`
- **Description:** Delete a book.
- **URL Parameters:**
  - `id` (string) - The ID of the book.
- **Response:**
  - **Status Code:** 204 (No Content)
    
#### Get All Books

- **URL:** `/authors`
- **Method:** `GET`
- **Description:** Retrieve a list of all authors.
- **Response:**
  - **Status Code:** 200 (OK)
  - **Body:**
    ```
    [
      {
          "_id": "author_id",
          "name": "Author Name",
          "country": "Author Country",
          "birthdate": "1950-01-01"
      },
      // ...more authors
    ]
    ```

#### Create an Author

- **URL:** `/authors`
- **Method:** `POST`
- **Description:** Create a new author.
- **Request Body:**
  ```json
  {
    "name": "Author Name",
    "country": "Author Country",
    "birthdate": "1950-01-01"
  }
  ```
- **Response:**
  - **Status Code:** 201 (Created)
  - **Body:**
    ```
    {
        "_id": "author_id",
        "name": "Author Name",
        "country": "Author Country",
        "birthdate": "1950-01-01"
    }
    ```
