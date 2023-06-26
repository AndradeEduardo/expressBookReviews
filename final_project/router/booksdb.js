let books = {
      1: { "author": "Chinua Achebe", "title": "Things Fall Apart", "reviews": {} },
      2: { "author": "Hans Christian Andersen", "title": "Fairy tales", "reviews": {} },
      3: { "author": "Dante Alighieri", "title": "The Divine Comedy", "reviews": {} },
      4: { "author": "Unknown", "title": "The Epic Of Gilgamesh", "reviews": { "user1": "review1", "user2": "review2" } },
      5: { "author": "Unknown", "title": "The Book Of Job", "reviews": {} },
      6: { "author": "Unknown", "title": "One Thousand and One Nights", "reviews": {} },
      7: { "author": "Unknown", "title": "Nj\u00e1l's Saga", "reviews": {} },
      8: { "author": "Jane Austen", "title": "Pride and Prejudice", "reviews": {} },
      9: { "author": "Honor\u00e9 de Balzac", "title": "Le P\u00e8re Goriot", "reviews": {} },
      10: { "author": "Samuel Beckett", "title": "Molloy, Malone Dies, The Unnamable, the trilogy", "reviews": {} }
}

// var filtered = Object.keys(books).reduce(function (filtered, key) {
//       if (books[key].author === "Unknown") filtered[key] = books[key];
//       return filtered;
// }, {});
// const user_name = "user1"
// console.log(Object.keys(books[4].reviews))
console.log(books[4].reviews)
delete books[4].reviews["user1"]
console.log(books[4].reviews)
// console.log(Object.keys(books))
// console.log(filtered)

module.exports = books;
