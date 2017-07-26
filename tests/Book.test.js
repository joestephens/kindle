/* globals describe beforeEach test __dirname expect */
var path = require('path')
var Chapter = require('../src/Chapter')
var Book = require('../src/Book')

describe('Book', function () {
  var chapters = []
  var book

  beforeEach(function () {
    for (var i = 0; i < 12; i++) {
      chapters.push(new Chapter('Chapter 1', path.join(__dirname, '/fixtures/sampleChapter.txt')))
    }
    book = new Book('Harry Potter', chapters)
  })

  test('has a name', function () {
    expect(book.getName()).toBe('Harry Potter')
  })

  test('has chapters', function () {
    expect(book.getChapters()).toBe(chapters)
  })
})
