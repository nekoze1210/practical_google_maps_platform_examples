import Polyline from '../googleMaps/models/overlays/polyline'

export default (maps, path, options) => {
  let polyline = new Polyline(maps.google, maps.map, path, options)
  polyline.draw()
  polyline.setMarkerAtOrigin()
  polyline.setMarkerAtDestination()

  return polyline
}
