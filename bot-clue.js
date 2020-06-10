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
    const response = await fetch(`${ url }list=usercontribs&uclimit=100&ucuser=${ user }`)
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
    return {}
  }
}

function getChanges(revision) {
  if (revision.hasOwnProperty('*')) {
    const lines = revision['*'].match(/<td class=\"[^\"]*?diff-deletedline[^\"]*?\">(.*?)<\/td>/gi)
    const inlines = lines.map((l) => l.match(/<del class=\"[^\"]*?diffchange diffchange-inline[^\"]*?\">(.*?)<\/del>/gi)).flat().filter((l) => l !== null)
    const changes = inlines.length === 0 ? lines.map((l) => l.replace(/<[^>]*>/gi, '')).filter((l) => l !== '') : inlines.map((l) => l.replace(/<[^>]*>/gi, '')).filter((l) => l !== '')

    return changes.join(' ').trim()
  } else {
    return null
  }
}

async function get(initial = false) {
  const vandalisms = await getVandalisms(initial)
  const messages = await Promise.all(vandalisms.map(async (v) => {
    const revision = await getRevision(v.revid)
    const changes = getChanges(revision)
    if (changes) {
      return {
        content: changes,
        url: revision.link
      }
    } else {
      return null
    }
  }))
  return messages.filter(Boolean)
}

module.exports = {
  get
}