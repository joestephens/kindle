var fs = require('fs')

function Chapter (name, file) {
  this._name = name
  this._file = file
}

Chapter.prototype = {
  getName: function () {
    return this._name
  },
  read: function () {
    return fs.readFileSync(this._file, 'utf8')
  }
}

module.exports = Chapter
