var Interface = require('./src/interface')
var Library = require('./src/library')
var Book = require('./src/book')
var Chapter = require('./src/chapter')
var fs = require('fs')

// create a new Interface
var iface = new Interface()

// create a new Library
var library = new Library()

// we will loop through these array elements to find all of our contents.json files
var bookFolders = ['alicesAdventuresInWonderland', 'sherlockHolmes']

// loop over each element in bookFolders
bookFolders.forEach(function (folder) {
  // read the contents of a JSON file
  var bookFile = fs.readFileSync('./books/' + folder + '/contents.json', 'utf8')

  // parse the JSON into a JavaScript object
  var bookInfo = JSON.parse(bookFile)

  // use the bookInfo.contents array to create a new array of chapter objects
  var chapters = bookInfo.contents.map(function (chapter) {
    var file = './books/' + folder + '/' + chapter.file

    return new Chapter(chapter.chapter, file)
  })

  // add a new Book to the library with our mapped chapter objects
  library.addBook(new Book(bookInfo.name, chapters))
})

// Run our Interface's listBooks method to trigger our first clickable list
iface.listBooks(library)

// Get Interface's internal screen property
var screen = iface.getScreen()

// Add event listener to screen that waits for Esc, q, or Ctrl-C keypresses, then run the callback
screen.key(['escape', 'q', 'C-c'], function () {
  screen.destroy()
})
