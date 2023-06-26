const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

const doesExist = (username) => {
  let userswithsamename = users.filter((user) => {
    return user.username === username
  });
  if (userswithsamename.length > 0) {
    return true;
  } else {
    return false;
  }
}


public_users.post("/register", (req, res) => {
  console.log("Registering new user")
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (!doesExist(username)) {
      users.push({ "username": username, "password": password });
      return res.status(200).json({ message: "User successfully registred. Now you can login" });
    } else {
      return res.status(404).json({ message: "User already exists!" });
    }
  }
  return res.status(404).json({ message: "Unable to register user." });
});

// Get the book list available in the shop
// public_users.get('/', function (req, res) {
//   console.log("get all books")
//   res.send(JSON.stringify(books, null, 4));
// });

// Get the book list available in the shop with promise
public_users.get('/', function (req, res) {
  const get_books = new Promise((resolve, reject) => {
    resolve(res.send(JSON.stringify({ books }, null, 4)));
  });

  get_books.then(() => console.log("Promise for Task 10 resolved"));

});

// Get book details based on ISBN
public_users.get('/isbn_old/:isbn', function (req, res) {
  console.log("get isbn")
  const isbn = req.params.isbn;
  console.log(isbn)
  res.send(books[isbn])
});

public_users.get('/isbn/:isbn', function (req, res) {
  console.log("get isbn_promise")
  const isbn = req.params.isbn;
  const get_details = new Promise((resolve, reject) => {
    let filtered = books[isbn]
    resolve(res.send(filtered, null, 4));
  });
  get_books.then(() => console.log("Promise for Task 10 resolved"));
});


// Get book details based on author
public_users.get('/author/:author', function (req, res) {
  const author = req.params.author;
  console.log(author)
  const get_details = new Promise((resolve, reject) => {
    let filtered = Object.keys(books).reduce(function (filtered, key) {
      if (books[key].author === author) filtered[key] = books[key];
      return filtered;
    }, {});
    resolve(res.send(filtered, null, 4));
  });

  get_books.then(() => console.log("Promise for Task 10 resolved"));

});


// Get all books based on title
public_users.get('/title/:title', function (req, res) {
  const title = req.params.title;
  console.log(title)
  var filtered = Object.keys(books).reduce(function (filtered, key) {
    if (books[key].title === title) filtered[key] = books[key];
    return filtered;
  }, {});
  res.send(filtered)
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  console.log(isbn)
  res.send(books[isbn].reviews)
});

module.exports.general = public_users;
