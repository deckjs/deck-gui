var noop = () => {}

window.WebSocket = function WebSocket () {}

window.WebSocket.prototype = {
  CLOSED: 3,
  CLOSING: 2,
  CONNECTING: 0,
  OPEN: 1,
  binaryType: noop,
  bufferedAmount: noop,
  close: noop,
  extensions: noop,
  onclose: noop,
  onerror: noop,
  onmessage: noop,
  onopen: noop,
  protocol: noop,
  readyState: noop,
  send: noop,
  url: noop
}
