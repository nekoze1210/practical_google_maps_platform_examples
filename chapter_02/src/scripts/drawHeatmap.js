import Heatmap from '../googleMaps/models/overlays/heatmap'

export default (maps, data, options) => {
  new Heatmap(maps.google, maps.map, data, options).draw()
}
