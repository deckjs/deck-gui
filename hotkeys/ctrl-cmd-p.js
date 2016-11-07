const {app} = require('electron')
var fs = require('fs')
var pdf = require('../lib/pdf')

module.exports = {
  shortcut: 'cmd + ctrl + p',
  handler: () => {
    var stream = pdf()
    if (!stream) return console.error('Already generating PDF')
    stream.pipe(fs.createWriteStream(app.windows[0].getTitle() + '.pdf'))
  },
  description: `
    create a pdf file from presentation
  `,
  label: 'Create PDF'
}
