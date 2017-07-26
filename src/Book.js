function Book (name, chapters) {
  this._name = name
  this._chapters = chapters
}

Book.prototype = {
  getName: function () {
    return this._name
  },
  getChapters: function () {
    return this._chapters
  }
}

module.exports = Book
