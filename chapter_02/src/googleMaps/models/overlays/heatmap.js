import MapOverlay from '../mapOverlay'

export default class Heatmap extends MapOverlay {
  constructor(google, map, data, options = {}) {
    super(google, map)
    this.data = data
    this.options = options
  }

  draw() {
    new this.google.maps.visualization.HeatmapLayer({
      map: this.map,
      data: this.data,
      ...this.options
    })
  }
}
