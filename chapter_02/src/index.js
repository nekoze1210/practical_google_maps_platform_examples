// Stylesheets
import './style.scss'

// Load API Key from .env
const API_KEY = process.env.API_KEY

// API Loader Options
// https://github.com/davidkudera/google-maps-loader#options
const apiOptions = {
  libraries: ['geometry', 'places', 'visualization']
}

// Usecases
import loadGoogleMaps from './scripts/loadGoogleMaps'
import drawMarker from './scripts/drawMarker'
import drawPolyline from './scripts/drawPolyline'
import drawPolygon from './scripts/drawPolygon'
import drawCircle from './scripts/drawCircle'
import drawHeatmap from './scripts/drawHeatmap'
import drawMarkerClusterer from './scripts/drawMarkerClusterer'

// Geolocation utils
import { buildLatLng, buildLatLngArray } from './googleMaps/utils/latLng'

// Sample Geolocation Raw Data
import directionRawData from './raw_data/directions.json'
import polygonPointsRawData from './raw_data/polygon_points.json'
import convinienceStorePointsRawData from './raw_data/convinience_store_ikebukuro.json'
import heatmapRawData from './raw_data/heatmap.json'
import addGeoJSON from './scripts/addGeoJSON'

async function loadMaps() {
  const googleMaps = await loadGoogleMaps(API_KEY, apiOptions)

  // マップがクリックされた時のイベントリスナ
  googleMaps.addListener('click', event => {
    let options = {
      animation: googleMaps.google.maps.Animation.DROP,
      draggable: true
    }
    drawMarker(googleMaps, event.latLng, options)
  })

  // Polyline の配置
  drawPolyline(googleMaps, directionRawData, {
    draggable: false,
    strokeColor: '#4F83F0',
    strokeWeight: '7'
  })

  // Polygon の配置
  drawPolygon(googleMaps, polygonPointsRawData, {
    draggable: false,
    strokeColor: '#E22C29',
    strokeWeight: '4',
    fillColor: '#F09193'
  })

  // // Polygon の配置 (GeoJSON)
  let geoJsonUrl =
    'https://gist.githubusercontent.com/nekoze1210/65cee41a4c4738a0546c71a251d0c104/raw/479d05c877c342379c1633302c6100ad4f35d529/polygon2.json'
  addGeoJSON(googleMaps, geoJsonUrl)

  // Cluster の配置
  let markers = convinienceStorePointsRawData.map(point => {
    return drawMarker(
      googleMaps,
      buildLatLng(googleMaps.google, point.lat, point.lng),
      {
        label: point.label
      }
    )
  })
  drawMarkerClusterer(googleMaps, markers)

  // Heatmap の配置
  let heatmapLatLngArray = buildLatLngArray(googleMaps.google, heatmapRawData)
  drawHeatmap(googleMaps, heatmapLatLngArray)

  // Circle の配置
  let center = buildLatLng(googleMaps.google, 35.73341, 139.709286)

  drawCircle(googleMaps, center, 100, {
    draggable: false,
    strokeColor: '#E22C29',
    strokeWeight: '4',
    fillColor: '#F09193'
  })
}

// 処理呼び出し
loadMaps()
