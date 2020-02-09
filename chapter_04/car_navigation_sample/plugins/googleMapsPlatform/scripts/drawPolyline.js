import Polyline from '../googleMaps/models/overlays/polyline'

export default (google, map, path, options) => {
  const polyline = new Polyline(google, map, path, options)
  polyline.draw()
  polyline.setMarkerAtOrigin()
  polyline.setMarkerAtDestination()

  return polyline
}
