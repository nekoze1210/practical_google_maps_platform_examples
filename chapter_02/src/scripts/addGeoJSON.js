import Data from '../googleMaps/models/overlays/data'

export default (maps, geoJSONUrl) => {
  Data.addGeoJSON(maps.map, geoJSONUrl)
}
