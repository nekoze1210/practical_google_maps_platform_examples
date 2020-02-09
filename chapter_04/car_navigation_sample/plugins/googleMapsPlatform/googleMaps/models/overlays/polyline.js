import MapOverlay from '../mapOverlay'
// import { buildLatLngArray } from '../../utils/latLng'
import Marker from './marker'

export default class Polyline extends MapOverlay {
  // options: https://developers.google.com/maps/documentation/javascript/reference/polygon#PolylineOptions
  constructor(google, map, path, options = {}) {
    super(google, map)
    this.path = path
    // this.mvcArray = buildLatLngArray(this.google, this.path)
    this.options = options
  }

  draw() {
    new this.google.maps.Polyline({
      map: this.map,
      path: this.path,
      ...this.options
    })
  }

  setMarkerAtOrigin() {
    new Marker(this.google, this.map, this.path[0]).draw()
  }

  setMarkerAtDestination() {
    new Marker(this.google, this.map, this.path.slice(-1)[0], {
      icon: {
        path: this.google.maps.SymbolPath.CIRCLE,
        scale: 5,
        strokeWeight: 5
      }
    }).draw()
  }
}
