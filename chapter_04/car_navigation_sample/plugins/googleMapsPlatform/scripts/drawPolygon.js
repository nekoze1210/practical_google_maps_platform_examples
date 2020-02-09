import Polygon from '../googleMaps/models/overlays/polygon'

export default (maps, path, options) => {
  return new Polygon(maps.google, maps.map, path, options).draw()
}
