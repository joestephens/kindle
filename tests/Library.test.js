/* globals describe beforeEach test __dirname expect */
var path = require('path')
var Chapter = require('../src/Chapter')
var Book = require('../src/Book')
var Library = require('../src/Library')

describe('Library', function () {
  var library
  var book

  beforeEach(function () {
    library = new Library()

    var chapters = []
    for (var i = 0; i < 12; i++) {
      chapters.push(new Chapter('Chapter 1', new Chapter(path.join(__dirname, '/fixtures/sampleChapter.txt'))))
    }

    book = new Book(chapters)
  })

  test('has no books when instantiated', function () {
    expect(library.getBooks()).toHaveLength(0)
  })

  test('can have a book added', function () {
    library.addBook(book)

    expect(library.getBooks()[0]).toBe(book)
  })
})
