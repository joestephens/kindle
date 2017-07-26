/* globals describe beforeEach test __dirname expect */
var path = require('path')
var fs = require('fs')
var Chapter = require('../src/Chapter')

describe('Chapter', function () {
  var chapter

  beforeEach(function () {
    chapter = new Chapter('Chapter 1', path.join(__dirname, '/fixtures/sampleChapter.txt'))
  })

  test('has a name', function () {
    expect(chapter.getName()).toBe('Chapter 1')
  })

  test('outputs content from chapter file', function () {
    var content = fs.readFileSync(path.join(__dirname, '/fixtures/sampleChapter.txt'), 'utf8')

    expect(chapter.read()).toBe(content)
  })
})
