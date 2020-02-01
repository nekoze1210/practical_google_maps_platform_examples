import Clusterer from '../googleMaps/utils/clusterer'

export default (maps, markers, options) => {
  new Clusterer(maps.map, markers, options).draw()
}
