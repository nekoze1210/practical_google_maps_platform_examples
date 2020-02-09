<template>
  <el-container>
    <sidebar
      :routes="routes"
      :selectedRoute="selectedRoute"
      :origin="origin"
      :destination="destination"
      :isNavigationStarted="isNavigationStarted"
      @click-route="selectRoute"
      @click-search-button="searchRoutes"
      @click-start-navigation="startNavigation"
      @input-origin="(value) => (origin = value)"
      @input-destination="(value) => (destination = value)"
    />
    <el-main style="padding: 0">
      <div id="map"></div>
    </el-main>
  </el-container>
</template>

<script>
import Sidebar from '~/components/Sidebar.vue'
import loadGoogleMaps from '~/plugins/googleMapsPlatform/scripts/loadGoogleMaps.js'

const apiOptions = {
  libraries: ['geometry', 'places', 'visualization']
}

export default {
  components: { Sidebar },
  data() {
    return {
      map: null,
      google: null,
      origin: '池袋駅',
      destination: '大塚駅',
      routes: [],
      selectedRoute: null,
      timer: null,
      isNavigationStarted: false
    }
  },
  mounted() {
    const element = this.$el.querySelector('#map')
    loadGoogleMaps(process.env.API_KEY, apiOptions, element).then(
      (googleMap) => {
        this.map = googleMap.map
        this.google = googleMap.google
        this.directionService = new this.google.maps.DirectionsService()
        this.directionsRenderer = new this.google.maps.DirectionsRenderer()
      }
    )
  },
  methods: {
    selectRoute(route) {
      this.selectedRoute = route
    },
    resetDestinations() {
      this.routes = []
      this.selectedRoute = null
      this.isNavigationStarted = false
      this.directionsRenderer.setPanel(null)
      clearInterval(this.timer)
    },
    searchRoutes() {
      this.resetDestinations()
      if (!(this.origin && this.destination)) {
        alert('出発地・目的地を入力してください。')
      }
      const request = {
        origin: this.origin,
        destination: this.destination,
        travelMode: 'DRIVING',
        optimizeWaypoints: true,
        avoidHighways: false,
        avoidTolls: false
      }
      this.directionService.route(request, (response, status) => {
        if (status === 'OK') {
          this.routes = response.routes.map((route, index) => {
            return {
              id: parseInt(index) + 1,
              name: 'ルート' + (parseInt(index) + 1),
              distance: route.legs[0].distance,
              duration: route.legs[0].duration,
              startAddress: route.legs[0].start_address,
              endAddress: route.legs[0].end_address,
              overviewPolyline: route.overview_polyline,
              steps: this.google.maps.geometry.encoding.decodePath(
                route.overview_polyline
              ),
              carIcon: new this.google.maps.Marker({
                map: this.map,
                position: route.legs[0].start_location,
                icon: {
                  path: this.google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                  scale: 6,
                  rotation: 0,
                  fillColor: '#DC5846',
                  fillOpacity: 0.7,
                  strokeColor: '#DC5846',
                  strokeWeight: 2
                },
                visible: false,
                zIndex: 999
              })
            }
          })
          this.directionsRenderer.set('directions', null)
          this.directionsRenderer.setMap(this.map)
          this.directionsRenderer.setDirections(response)
        } else {
          alert('ルートの取得に失敗しました。')
        }
      })
    },
    startNavigation() {
      this.isNavigationStarted = true
      this.selectedRoute.carIcon.setVisible()
      this.directionsRenderer.setPanel(
        this.$el.querySelector('#route-panel-contents')
      )
      let i = 1
      this.timer = setInterval(() => {
        this.moveIcon(
          this.selectedRoute.steps[i - 1],
          this.selectedRoute.steps[i]
        )
        i++

        if (i >= this.selectedRoute.steps.length) {
          clearInterval(this.timer)
        }
      }, 500)
    },
    moveIcon(currentPosition, nextPosition) {
      const angle = this.google.maps.geometry.spherical.computeHeading(
        currentPosition,
        nextPosition
      )
      this.selectedRoute.carIcon.setIcon({
        path: this.google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
        scale: 6,
        rotation: angle,
        fillColor: '#ff0000',
        fillOpacity: 0.7,
        strokeColor: '#ff0000',
        strokeWeight: 2
      })
      this.selectedRoute.carIcon.setPosition(nextPosition)
    }
  }
}
</script>

<style>
#map {
  position: fixed !important;
  height: 100% !important;
  width: 100% !important;
}
</style>
