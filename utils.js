const fetch = require('node-fetch')
const url = 'https://en.wikipedia.org/w/api.php?action=query&format=json&'

const state = {
  timestamp: now()
}

function now() {
  return Math.round(Date.now() / 1000)
}

function link(title, history = false) {
  if (history) {
    return `https://en.m.wikipedia.org/w/index.php?title=${ title.replace(/\s/g, '%20') }&action=history`
  } else {
    return `https://en.m.wikipedia.org/w/index.php?title=${ title.replace(/\s/g, '%20') }`
  }
}

async function getTitle(term) {
  const response = await fetch(`${url}list=search&srsearch=${term}`)
  const json = await response.json()
  const first = json.query.search[0]
  const title = first.title

  return title
}

async function getContent(title) {
  const response = await fetch(`${url}prop=revisions&titles=${title}&rvslots=*&rvprop=timestamp|user|comment|content`)
  const json = await response.json()
  const pages = json.query.pages

  return pages
}

async function getRecentChanges() {
  const timestamp = now()
  const response = await fetch(`${url}list=recentchanges&rcprop=title|ids|sizes|flags|user&rcshow=!bot|!minor&rctype=edit|new&rctoponly=true&rcstart=now&rcend=${ state.timestamp }&rclimit=100`)
  const json = await response.json()
  const changes = json.query.recentchanges
  state.timestamp = timestamp

  return changes
}

function getDuplicates(changes) {
  const titles = changes.map((c) => c.title)
  const duplicates = titles.reduce((acc, v, i, arr) => arr.indexOf(v) !== i && acc.indexOf(v) === -1 ? acc.concat(v) : acc, [])

  return duplicates
}

module.exports = {
  now,
  link,
  getRecentChanges,
  getDuplicates
}
