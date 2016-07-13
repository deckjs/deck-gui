var app = require('app')
var BrowserWindow = require('browser-window')
var Pdf = require('pdfkit')
var ipc = require('ipc')

module.exports = () => {
  if (process.capture) { return }

  var pdfWin = new BrowserWindow({
    toolbar: false,
    center: true,
    width: 987,
    height: 680,
    'web-preferences': {
      preload: __dirname + '/pdf-preload.js'
    },
    show: false
  })
  var win = app.windows[0]
  var url = win.getUrl()
  var doc = makePdf()
  var deckLength = 0
  var index = 1

  if (/^http/.test(url)) {
    getDeckLength(url)
    return doc
  }

  win.on('page-title-updated', () => {
    url = win.getUrl()
    getDeckLength(url)
  })

  return doc

  function progress (count, last) {
    if (count === 1) {
      app.dock.setBadge('PDF')
    }

    var perc = count / last
    perc = perc === 1 ? -1 : perc
    win.setProgressBar(perc)
    if (perc === -1) {
      app.dock.setBadge('')
    }
  }

  function getDeckLength (url) {
    ipc.on('reply', (event, arg) => {
      deckLength = arg
      console.log('Beginning export to PDF format')
      producePdf()
    })
    pdfWin.loadUrl(url)
    setTimeout(function () {
      pdfWin.webContents.executeJavaScript(`
        var ipc = require('ipc')
        ipc.on('message', (event, arg) => {
          ipc.send('reply', BESPOKE_PDF.slides.length)
        })
      `)
      setTimeout(function () {
        pdfWin.webContents.send('message', 'ping')
      }, 1000)
    }, 1000)
  }

  function producePdf () {
    setTimeout(function () {
      progress(index, deckLength)
      var url = 'http://localhost:2000/#' + index
      pdfWin.loadUrl(url)
      setTimeout(function () {
        pdfWin.capturePage(image => {
          doc.addPage()
          doc.image(image.toPng(), 14.5, 22, {
            width: 813
          })
        })
        index++
        if (index <= deckLength) {
          producePdf()
          return
        }
        else{
          setTimeout(function () {
            console.log('Created PDF.')
            doc.end()
          }, 500)
        }
      }, 1500)
    }, 1000)
  }
}

function makePdf () {
  Pdf.addPage = Pdf.prototype.addPage
  Pdf.prototype.addPage = () => {
  }
  var doc = new Pdf({
    size: 'A4',
    layout: 'landscape'
  })
  Pdf.prototype.addPage = Pdf.addPage
  return doc
}
