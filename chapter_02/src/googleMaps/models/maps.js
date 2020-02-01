const firstViewCenterCoordinates = {
  lat: 35.7329854,
  lng: 139.7128128
}

export default class Maps {
  constructor(google, element, options = {}) {
    this.google = google
    this.options = options
    this.element = element
    this.markers = []
    this.map = null
  }

  init() {
    this.map = new this.google.maps.Map(this.element, {
      center: firstViewCenterCoordinates,
      zoom: 15,
      mapTypeId: this.google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true,
      clickableIcons: false
    })

    return this
  }

  addListener(event_name, callback) {
    this.map.addListener(event_name, event => {
      callback(event)
    })
  }
}
