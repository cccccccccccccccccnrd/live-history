const fetch = require('node-fetch')
const url = 'https://en.wikipedia.org/w/api.php?action=query&format=json&'

const state = {
  timestamp: now() - 60 * 60
}

function now() {
  return Math.round(Date.now() / 1000)
}

async function getVandalisms(unlimited = false) {
  const user = 'ClueBot_NG'
  if (unlimited) {
    const response = await fetch(`${ url }list=usercontribs&uclimit=15&ucuser=${ user }`)
    const json = await response.json()
    const contributions = json.query.usercontribs
    const vandalisms = contributions.filter((c) => c.comment.includes('vandalism'))
    return vandalisms
  } else {
    const timestamp = now()
    const response = await fetch(`${ url }list=usercontribs&uclimit=100&ucuser=${ user }&ucstart=now&ucend=${ state.timestamp }`)
    const json = await response.json()
    const contributions = json.query.usercontribs
    const vandalisms = contributions.filter((c) => c.comment.includes('vandalism'))
  
    state.timestamp = timestamp
    return vandalisms
  }
}

async function getRevision(id) {
  try {
    const response = await fetch(`https://en.wikipedia.org/w/api.php?action=compare&format=json&fromrev=${ id }&torelative=prev`)
    const json = await response.json()
    const compare = json.compare
    compare.link = `https://en.wikipedia.org/w/index.php?title=${ compare.totitle.replace(/\s/g, '%20') }&diff=prev&oldid=${ id }`
  
    return compare
  } catch(error) {
    return null
  }
}

function getChanges(revision) {
  const lines = revision['*'].match(/<td class=\"[^\"]*?diff-deletedline[^\"]*?\">(.*?)<\/td>/gi)
  const inlines = lines.map((l) => l.match(/<del class=\"[^\"]*?diffchange diffchange-inline[^\"]*?\">(.*?)<\/del>/gi)).flat().filter((l) => l !== null)
  const changes = inlines.length === 0 ? lines.map((l) => l.replace(/<[^>]*>/gi, '')).filter((l) => l !== '') : inlines.map((l) => l.replace(/<[^>]*>/gi, '')).filter((l) => l !== '')

  return changes.filter(Boolean)
}

async function init() {
  const vandalisms = await getVandalisms(true)
  const messages = await Promise.all(vandalisms.map(async (v) => {
    const revision = await getRevision(v.revid)
    const changes = getChanges(revision)
    return changes.map((c) => {
      return {
        content: c,
        url: revision.link
      }
    })
  }))
  return messages.flat(Infinity)
}

async function get() {
  const vandalisms = await getVandalisms()
  const messages = await Promise.all(vandalisms.map(async (v) => {
    const revision = await getRevision(v.revid)
    const changes = getChanges(revision)
    return changes.map((c) => {
      return {
        content: c,
        url: revision.link
      }
    })
  }))
  return messages.flat(Infinity)
}

module.exports = {
  init,
  get
}