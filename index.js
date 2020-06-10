const path = require('path')
const express = require('express')
const WebSocket = require('ws')
const utils = require('./utils.js')
const bot = require('./bot-clue.js')

const state = {
  ws: null,
  changes: [],
  duplicates: []
}

const app = express()

app.use('/lh', express.static(path.join(__dirname, 'interfaces/live-history')))
app.use('/bot', express.static(path.join(__dirname, 'interfaces/bot')))
app.use('/hi', express.static(path.join(__dirname, 'interfaces/bot-chat/dist')))

app.listen(2000)
console.log('live-history listening on http://localhost:2000')

const wss = new WebSocket.Server({ port: 2001 })

wss.on('connection', (ws) => {
  console.log('ws connected')
  state.ws = ws

  ws.on('message', (data) => {
    console.log(data)
  })
})

function reset() {
  state.changes = []
  state.duplicates = []
}

function interface(entry) {
  const msg = {
    left: utils.link(entry[0]),
    right: utils.link(entry[0], true)
  }

  send(msg, 'interface')
}

function send(message, type) {
  const msg = {
    type: type,
    payload: message
  }

  if (state.ws) {
    state.ws.send(JSON.stringify(msg))
  } else {
    console.log('no ws connected')
  }
}

function init() {
  setInterval(async () => {
    const changes = await bot.get()
    console.log(changes)
    send(changes, 'bot-message')
  }, 1 * 60 * 1000)

  setInterval(async () => {
    const changes = await utils.getRecentChanges()
    state.changes = state.changes.concat(changes)
    console.log(state.changes.length, changes.length)
  }, 5 * 1000)

  setInterval(() => {
    const duplicates = utils.getDuplicates(state.changes)
    state.duplicates = state.duplicates.concat(duplicates)
    state.changes = []
  }, 2 * 60 * 1000)

  setInterval(() => {
    const list = state.duplicates.reduce((acc, curr) => {
      acc[curr] ? acc[curr]++ : acc[curr] = 1
      return acc
    }, {})

    const sorted = Object.keys(list).sort((a, b) => list[b] - list[a]).map((key) => [key, list[key]])
    console.log(sorted)
    const hot = sorted.filter((entry) => entry[1] > 1)
    hot.forEach((entry) => console.log(entry[1], utils.link(entry[0], true)))
    if (hot[0]) {
      interface(hot[0])
    }
  }, 4 * 60 * 1000)

  setInterval(() => {
    reset()
  }, 15 * 60 * 1000)
}

init()