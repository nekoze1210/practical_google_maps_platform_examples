import Marker from '../googleMaps/models/overlays/marker'

export default (maps, latLng, options) => {
  return new Marker(maps.google, maps.map, latLng, options).draw()
}
