const url = window.location.hostname === 'localhost' ? 'ws://localhost:2001' : 'wss://cnrd.computer/live-history-ws'
const socket = new WebSocket(url)

const left = document.getElementById('left')
const right = document.getElementById('right')

socket.addEventListener('message', (message) => {
  const msg = JSON.parse(message.data)
  
  left.src = msg.left
  right.src = msg.right
})

/* setInterval(() => {
  left.src += ''
  right.src += ''
}, 5 * 1000) */