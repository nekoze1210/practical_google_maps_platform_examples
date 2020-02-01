import MarkerClusterer from '@google/markerclusterer'

const defaultMarkerClustererOptions = {
  imagePath:
    'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
}

export default class Clusterer {
  constructor(map, markers, options = defaultMarkerClustererOptions) {
    this.map = map
    this.markers = markers
    this.options = options
  }

  draw() {
    new MarkerClusterer(this.map, this.markers, this.options)
  }
}
