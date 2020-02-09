// { lat: float, lng: float }
export function buildLatLng(google, lat, lng) {
  return new google.maps.LatLng(lat, lng)
}

// [{lat: float, lng: float }]
export function buildLatLngArray(google, coordinatesArray) {
  const r = coordinatesArray.map((coordinates) => {
    return new google.maps.LatLng(coordinates.lat, coordinates.lng)
  })
  return new google.maps.MVCArray(r)
}
