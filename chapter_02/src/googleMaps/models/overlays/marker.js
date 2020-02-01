import MapOverlay from '../mapOverlay'

export default class Marker extends MapOverlay {
  constructor(google, map, position, options) {
    super(google, map)
    this.position = position
    this.options = options
  }

  draw() {
    return new this.google.maps.Marker({
      map: this.map,
      position: this.position,
      ...this.options
    })
  }
}
