var app = require('app')

module.exports = () => {

  var win = app.windows[app.windows.length - 1]

  win.webContents.executeJavaScript(`
    !function toggle() {
      if(window.stream) {
        return window.endScreenCast()
      }

      navigator.webkitGetUserMedia({video: {
        mandatory: {
          chromeMediaSource: 'screen',
          maxWidth: 1920,
          maxHeight: 1080,
          minFrameRate: 1,
          maxFrameRate: 5
        }
      }}, s => {
        window.stream = s
        window.video = document.createElement('video')
        document.body.appendChild(video)
        video.id = 'receiver'
        video.src = URL.createObjectURL(stream)
        video.play()
        stream.onended = endScreenCast
      }, ()=>{})

      window.endScreenCast = () => {
        stream.getTracks().forEach(track => track.stop())
        if (document.body.contains(video)) {
          document.body.removeChild(video)  
        }
        window.video = window.stream = null
      }
    }()
  `)
}