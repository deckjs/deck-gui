const {app} = require('electron')
var fs = require('fs')
var pdf = require('../lib/pdf')

module.exports = {
  shortcut: 'cmd + ctrl + p',
  handler: () => pdf()
      .pipe(fs.createWriteStream(app.windows[0].getTitle() + '.pdf')),
  description: `
    create a pdf file from presentation
  `
}
