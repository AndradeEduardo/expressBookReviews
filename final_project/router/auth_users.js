const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const authenticatedUser = (username, password) => {
  let validusers = users.filter((user) => {
    return (user.username === username && user.password === password)
  });
  if (validusers.length > 0) {
    return true;
  } else {
    return false;
  }
}

const isValid = (username) => { //returns boolean
  //write code to check is the username is valid
}

//only registered users can login
regd_users.post("/login", (req, res) => {
  console.log("Loging in a user")
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.status(404).json({ message: "Error logging in" });
  }

  if (authenticatedUser(username, password)) {
    let accessToken = jwt.sign({
      data: password
    }, 'access', { expiresIn: 60 * 60 });

    req.session.authorization = {
      accessToken, username
    }
    return res.status(200).send("User successfully logged in");
  } else {
    return res.status(208).json({ message: "Invalid Login. Check username and password" });
  }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const username = req.session.authorization['username'];
  const new_review = req.query.review
  console.log(req)
  console.log("adding review " + new_review + " from " + username)
  let book = books[isbn];
  if (book) {
    let reviews = book.reviews
    reviews[username] = new_review
    res.send(`Review from ${username} updated.`);
  }
  else {
    res.send("Unable to find book!");
  }
});

regd_users.delete("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const username = req.session.authorization['username'];
  console.log("deleting review from " + username)
  let book = books[isbn];
  if (book) {
    let review = book.reviews[username]
    if (review) {
      delete books[isbn].reviews[username]
      res.send(`Review of ${book.title} from ${username} deleted.`);
    }
    else {
      res.send("No review to delete!");
    }
  }
  else {
    res.send("Unable to find book!");
  }
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
