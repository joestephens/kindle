function Library (books) {
  this._books = []
}

Library.prototype = {
  getBooks: function () {
    return this._books
  },
  addBook: function (book) {
    this._books.push(book)
  }
}

module.exports = Library
