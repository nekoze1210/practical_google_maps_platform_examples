import Circle from '../googleMaps/models/overlays/circle'

export default (maps, center, radius, options = {}) => {
  return new Circle(maps.google, maps.map, center, radius, options).draw()
}
