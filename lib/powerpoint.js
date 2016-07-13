var app = require('app')
var BrowserWindow = require('browser-window')
var officegen = require('officegen')
var pptx = officegen('pptx')
var fs = require('fs')
var ipc = require('ipc')

module.exports = () => {
  var out = fs.createWriteStream(app.windows[0].getTitle() + '.pptx')
  var deckLength = 0
  var win = app.windows[0]
  var captureWin = new BrowserWindow({
    toolbar: false,
    center: true,
    width: 987,
    height: 680,
    show: false
  })

  captureWin.loadUrl('http://localhost:2000/')
  setTimeout(function () {
    captureWin.webContents.executeJavaScript(`
      var ipc = require('ipc')
      ipc.on('message', (event, arg) => {
        ipc.send('reply', BESPOKE_PDF.slides.length)
      })
    `)
    captureWin.webContents.send('message', 'ping')
  }, 1000)

  var index = 1
  function createPowerpoint () {
    setTimeout(function () {
      progress(index, deckLength)
      var url = 'http://localhost:2000/#' + index
      captureWin.loadUrl(url)
      setTimeout(function () {
        captureWin.capturePage(image => {
          var slide = pptx.makeNewSlide()
          slide.addImage(image.toPng(), { y: 0, x: 0, cy: '100%', cx: '100%' })
          index++
          if (index <= deckLength) {
            createPowerpoint()
            return
          }
          pptx.generate(out)
        })
      }, 1000)
    }, 300)
  }

  function progress (count, last) {
    if (count === 1) {
      app.dock.setBadge('PPTX')
    }

    var perc = count / last
    perc = perc === 1 ? -1 : perc
    win.setProgressBar(perc)
    if (perc === -1) {
      app.dock.setBadge('')
    }
  }

  ipc.on('reply', (event, arg) => {
    deckLength = arg
    console.log('Beginning export to Powerpoint format')
    createPowerpoint()
  })

  out.on ( 'error', function ( err ) {
    console.log ( err );
  })

  pptx.on('finalize', function (written) {
    console.log('Created Powerpoint presentation. Size of file: ', written/1000 + 'KB')
  })
}