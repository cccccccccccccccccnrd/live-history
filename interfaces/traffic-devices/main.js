mapboxgl.accessToken = 'pk.eyJ1IjoiY25yZCIsImEiOiJjanY2ZWF0ZHAwMGs3NDNxcjI0MjVobG1iIn0.h2key8APdBWqexOo6k1Kgw'

const locations = [
  [6.942777, 50.928776],
  [6.942445, 50.928555],
  [6.959850, 50.921291],
  [6.959815, 50.920847],
  [6.960750, 50.935750],
  [6.960167, 50.935278]
]

let counter = 1

locations.forEach((location) => {

  const map = new mapboxgl.Map({
    container: `map-${ counter }`,
    style: 'mapbox://styles/mapbox/light-v10',
    center: location,
    zoom: 17,
    attributionControl: false
  })

  map.on('load', function() {
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

