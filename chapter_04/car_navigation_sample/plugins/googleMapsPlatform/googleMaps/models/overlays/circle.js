import MapOverlay from '../mapOverlay'

export default class Circle extends MapOverlay {
  constructor(google, map, center, radius, options) {
    super(google, map)
    this.center = center
    this.radius = radius
    this.options = options
  }

  draw() {
    return new this.google.maps.Circle({
      map: this.map,
      center: this.center,
      radius: this.radius,
      ...this.options
    })
  }
}
