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

function init () {
  mapboxgl.accessToken = 'pk.eyJ1IjoiY25yZCIsImEiOiJjanY2ZWF0ZHAwMGs3NDNxcjI0MjVobG1iIn0.h2key8APdBWqexOo6k1Kgw'

  const locations = [
    [6.942628, 50.928259],
    [6.960028, 50.921341],
    [6.981778, 50.938389],
    [6.957563, 50.921615],
    [6.957563, 50.921615],
    [6.957563, 50.921615],
    [6.957563, 50.921615],
    [6.957563, 50.921615]
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

init()
