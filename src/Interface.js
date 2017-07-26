// require in the blessed npm module (ensure you've ran `npm install` in the command line)
var blessed = require('blessed')

function Interface () {
  // render a screen and assign the rendered screen object to a property on our object
  this._screen = blessed.screen()

  // When we pass in our library, keep hold of it so we can go back to it when
  // we finish a book
  this._library = {}

  // When we select a book, keep hold of our selection so we can go back to it when
  // we finish a chapter
  this._selectedBook = {}
}

Interface.prototype = {
  init: function () {
    // Set the title bar on the command line window
    this._screen.title = 'Kindle'
  },
  getScreen () {
    // so we can add a key press event to our screen in app.js
    return this._screen
  },
  listBooks: function (library) {
    // keep hold of our library so we can come back to it later
    this._library = library

    var books = library.getBooks()

    // create a new array from books with just the names
    var bookNames = books.map(function (book) {
      return book.getName()
    })

    // render a new list of bookNames to this._screen
    var list = blessed.list({
      parent: this._screen,
      align: 'center',
      mouse: true,
      width: '100%',
      height: '100%',
      top: 'center',
      left: 'center',
      items: bookNames,
      style: {
        item: {
          hover: {
            bg: 'blue'
          }
        }
      }
    })

    // make sure we can select the element
    list.focus()

    // we have to assign this to another variable, so we can access *this* object instance
    // inside of the callback function below (because when inside functions, this refers to the function)
    const self = this

    // attach an event listener to our Node process that executes the passed callback function
    // when an item is selected
    list.on('select', function (event, selectedIndex) {
      // use the selectedIndex to get the full Book object corresponding to the clicked item
      var selectedBook = books[selectedIndex]

      // change our selectedBook property
      self._selectedBook = selectedBook

      // call the listChapters function on this object, passing in our selected Book object
      self.listChapters(selectedBook)
    })

    this.ready()
  },
  listChapters: function (book) {
    var chapters = book.getChapters()

    // create a new array from chapters with just the names
    var chapterNames = chapters.map(function (chapter) {
      return chapter.getName()
    })

    // render a new list of chapterNames to this._screen
    var list = blessed.list({
      parent: this._screen,
      align: 'center',
      mouse: true,
      width: '100%',
      height: '100%',
      top: 'center',
      left: 'center',
      items: chapterNames,
      style: {
        item: {
          hover: {
            bg: 'blue'
          }
        }
      }
    })

    // make sure we can select the element
    list.focus()

    // we have to assign this to another variable, so we can access *this* object instance
    // inside of the callback function below (because when inside functions, this refers to the function)
    const self = this

    // attach an event listener to our Node process that executes the passed callback function
    // when an item is selected
    list.on('select', function (event, selectedIndex) {
      // use the selectedIndex to get the full Chapter object corresponding to the clicked item
      var selectedChapter = chapters[selectedIndex]

      // call the viewChapter function on this object, passing in our selected Book object
      self.viewChapter(selectedChapter)
    })

    // attach an event listener to list that listens for the b key and calls the passed callback function
    list.key('b', function () {
      // Go back to our book listing, using the _library property we stored on our instance
      self.listBooks(self._library)

      self.ready()
    })

    this.ready()
  },
  viewChapter: function (chapter) {
    // render a scrolling viewport to the screen - the content key is what actually gets displayed inside
    // the viewport
    var box = blessed.box({
      parent: this._screen,
      top: 'center',
      left: 'center',
      width: '100%',
      height: '100%',
      content: chapter.read(),
      tags: true,
      border: {
        type: 'line'
      },
      style: {
        border: {
          fg: 'white'
        }
      },
      scrollable: true,
      alwaysScroll: true,
      keys: true,
      mouse: true
    })

    // make sure we can select the element
    box.focus()

    // assign this to another variable so we can still access *this* object inside of the callback function below
    const self = this

    // attach an event listener to box that listens for the b key and calls the passed callback function
    box.key('b', function () {
      // Go back to our chapter listing, using the selectedBook we stored on our instance
      self.listChapters(self._selectedBook)

      self.ready()
    })

    this.ready()
  },
  ready: function () {
    // rerender the screen
    this._screen.render()
  }
}

// make our constructor available to other files that require it
module.exports = Interface
