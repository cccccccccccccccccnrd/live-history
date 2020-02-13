const fetch = require('node-fetch')
const url = 'https://en.wikipedia.org/w/api.php'

async function getTitle(term) {
  const response = await fetch(`${url}?format=json&action=query&list=search&srsearch=${term}`)
  const json = await response.json()
  const first = json.query.search[0]
  const title = first.title

  return title
}

async function getContent(title) {
  const response = await fetch(`${url}?format=json&action=query&prop=revisions&titles=${title}&rvslots=*&rvprop=timestamp|user|comment|content`)
  const json = await response.json()
  const pages = json.query.pages

  return pages
}

async function init() {
  const title = await getTitle('meaning')
  const content = await getContent(title)
  console.log(content)
}

init()