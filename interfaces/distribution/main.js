window.addEventListener('load', () => {
  document.querySelector('#block').style.display = 'none'
  play()
})

function play () {
  document.querySelectorAll('video').forEach((video) => {
    video.currentTime = 0
    video.play()
  })
}

function stop () {
  document.querySelectorAll('video').forEach((video) => {
    video.stop()
  })
}

function mode (mode) {
  if (mode === 'all') {
    document.querySelectorAll('.info').forEach((info) => info.style.opacity = 1)
  } else {
    document.querySelectorAll('.video-container').forEach((container) => {
      container.className.split(' ').filter((c) => c.startsWith('mode')).forEach((c) => container.classList.remove(c))
      container.classList.add(`mode-${ mode }`)
    })
  }
}

function slide (content) {
  document.querySelector('#slide').innerText = content
}

function init () {
  const delay = 30000

  mode('00')
  setTimeout(() => {
    slide('traffic is a complex system of correlating motion patterns')
  }, delay * 0.4)
  setTimeout(() => {
    slide('a structured chaos organized by certain regulations and their non-observance')
  }, delay * 0.8)
  setTimeout(() => {
    mode('01')
  }, delay * 1)
  setTimeout(() => {
    slide('a framework of shared space and collaboration unfolding within fluid hierarchies')
  }, delay * 1.4)
  setTimeout(() => {
    slide('an organism of living particles proceeding in wave-like motions')
  }, delay * 1.8)
  setTimeout(() => {
    mode('02')
  }, delay * 2)
  setTimeout(() => {
    slide('seeming like an endless cycle of repetitive movement sequences')
  }, delay * 2.4)
  setTimeout(() => {
    slide('that manifest the distribution of public space')
  }, delay * 2.8)
  setTimeout(() => {
    slide('')
  }, delay * 3)
  setTimeout(() => {
    mode('all')
  }, delay * 3)
}

function maps () {
  mapboxgl.accessToken = 'pk.eyJ1IjoiY25yZCIsImEiOiJjanY2ZWF0ZHAwMGs3NDNxcjI0MjVobG1iIn0.h2key8APdBWqexOo6k1Kgw'

  const locations = [
    [6.942628, 50.928259],
    [6.960028, 50.921341],
    [6.981778, 50.938389],
    [6.957563, 50.921615],
    [6.957563, 50.921615],
    [6.957563, 50.921615],
    [6.957563, 50.921615],
    [6.957563, 50.921615],
    [6.942628, 50.928259],
    [6.960028, 50.921341],
    [6.981778, 50.938389]
  ]
  let counter = 1
  
  locations.forEach((location) => {
    const map = new mapboxgl.Map({
      container: `map-${ counter }`,
      style: 'mapbox://styles/mapbox/light-v10',
      center: location,
      zoom: 16,
      attributionControl: false
    })
  
    map.on('load', () => {
      map.addSource('points', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: location
              }
            }
          ]
        }
      })
  
      map.addLayer({
        id: 'points',
        type: 'circle',
        source: 'points',
        paint: {
          'circle-radius': {
            base: 2.25,
            stops: [
              [12, 2],
              [22, 180]
            ]
          },
          'circle-color': '#000'
        }
      })
    })
  
    counter++
  })
}

/* init() */
maps()
