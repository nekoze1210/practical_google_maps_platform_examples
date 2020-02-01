import MapOverlay from '../mapOverlay'
import { buildLatLngArray } from '../../utils/latLng'

export default class Polygon extends MapOverlay {
  constructor(google, map, path, options = {}) {
    super(google, map)
    this.path = path
    this.mvcArray = buildLatLngArray(this.google, this.path)
    this.options = options
  }

  draw() {
    new this.google.maps.Polygon({
      map: this.map,
      path: this.path,
      ...this.options
    })
  }
}
