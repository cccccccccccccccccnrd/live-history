const url = 'https://en.wikipedia.org/w/api.php?action=query&format=json&'
const content = document.getElementById('content')

const state = {
  timestamp: now() - 60 * 60
}

function now() {
  return Math.round(Date.now() / 1000)
}

async function getVandalisms() {
  const user = 'ClueBot_NG'
  const timestamp = now()
  const response = await fetch(`${ url }list=usercontribs&uclimit=100&ucuser=${ user }&ucstart=now&ucend=${ state.timestamp }&origin=*`)
  const json = await response.json()
  const contributions = json.query.usercontribs
  const vandalisms = contributions.filter((c) => c.comment.includes('vandalism'))

  state.timestamp = timestamp
  return vandalisms
}

async function getRevision(id) {
  const response = await fetch(`https://en.wikipedia.org/w/api.php?action=compare&format=json&fromrev=${ id }&torelative=prev&origin=*`)
  const json = await response.json()
  const compare = json.compare
  compare.link = `https://en.wikipedia.org/w/index.php?title=${ compare.totitle.replace(/\s/g, '%20') }&diff=prev&oldid=${ id }`

  return compare
}

async function get() {
  const vandalisms = await getVandalisms()

  vandalisms.forEach((v, i) => {
    setTimeout(async () => {
      const revision = await getRevision(v.revid)
      console.log(revision['*'])
      const lines = revision['*'].match(/<td class=\"[^\"]*?diff-deletedline[^\"]*?\">(.*?)<\/td>/gi)
      const changes = lines.map((l) => l.replace(/<[^>]*>/gi, ''))
      content.innerHTML += `${ changes.join(' ') } <a href="${ revision.link }" target="_blank">*</a> `
      document.documentElement.scrollTop = document.documentElement.scrollHeight
    }, 1000 * i)
  })
}

async function init () {
  setInterval(() => {
    get()
  }, 2 * 60 * 1000)
}

init()
get()