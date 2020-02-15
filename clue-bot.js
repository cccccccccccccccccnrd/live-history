const fetch = require('node-fetch')
const url = 'https://en.wikipedia.org/w/api.php?action=query&format=json&'

async function getVandalisms(limit) {
  const user = 'ClueBot_NG'
  const response = await fetch(`${ url }list=usercontribs&uclimit=${ limit * 2 }&ucuser=${ user }`)
  const json = await response.json()
  const contributions = json.query.usercontribs
  const vandalisms = contributions.filter((c) => c.comment.includes('vandalism'))

  return vandalisms
}

async function getRevision(id) {
  const response = await fetch(`https://en.wikipedia.org/w/api.php?action=compare&format=json&fromrev=${ id }&torelative=prev`)
  const json = await response.json()
  const compare = json.compare
  compare.link = `https://en.wikipedia.org/w/index.php?title=${ compare.totitle.replace(/\s/g, '%20') }&diff=prev&oldid=${ id }`

  return compare
}

async function init () {
  const vandalisms = await getVandalisms(4)

  vandalisms.forEach((v, i) => {
    setTimeout(async () => {
      const revision = await getRevision(v.revid)
      const lines = revision['*'].match(/<td class=\"[^\"]*?diff-deletedline[^\"]*?\">(.*?)<\/td>/gi)
      const changes = lines.map((l) => l.replace(/<[^>]*>/gi, ''))
      console.log(changes)
      console.log(revision.link)
    }, 1000 * i)
  })
}

init()