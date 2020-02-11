<template>
  <el-container>
    <sidebar>
      <template #directionForm>
        <direction-form
          :origin="origin"
          :destination="destination"
          @input-origin="(input) => (origin = input)"
          @input-destination="(input) => (destination = input)"
          @click-search-button="searchRoutes"
        />
      </template>
      <template #routePanel>
        <route-panel
          :routes="routes"
          :selectedRoute="selectedRoute"
          :isNavigationStarted="isNavigationStarted"
          @click-route="selectRoute"
          @click-start-navigation="startNavigation"
        />
      </template>
    </sidebar>
    <el-main>
      <div id="map" />
    </el-main>
  </el-container>
</template>

<script>
import Sidebar from '~/components/Sidebar.vue'
import DirectionForm from '~/components/DirectionForm.vue'
import RoutePanel from '~/components/RoutePanel.vue'
import loadGoogleMaps from '~/plugins/googleMapsPlatform/loadGoogleMaps.js'

const apiOptions = {
  libraries: ['geometry', 'places', 'visualization']
}

export default {
  components: { Sidebar, DirectionForm, RoutePanel },
  data() {
    return {
      map: null,
      google: null,
      origin: '',
      destination: '',
      routes: [],
      selectedRoute: null,
      navigationTimer: null,
      isNavigationStarted: false,
      carIcon: null
    }
  },
  mounted() {
    const element = this.$el.querySelector('#map')
    loadGoogleMaps(apiOptions, element).then((result) => {
      this.map = result.map
      this.google = result.google
      this.directionService = new this.google.maps.DirectionsService()
      this.directionsRenderer = new this.google.maps.DirectionsRenderer()
    })
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
      if (this.carIcon) {
        this.carIcon.setMap(null)
        this.carIcon = null
      }
      clearInterval(this.navigationTimer)
    },
    searchRoutes() {
      this.resetDestinations()
      if (!(this.origin && this.destination)) {
        alert('出発地・目的地を入力してください。')
        return
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
              startLocation: route.legs[0].start_location,
              endAddress: route.legs[0].end_address,
              overviewPolyline: route.overview_polyline,
              steps: this.google.maps.geometry.encoding.decodePath(
                route.overview_polyline
              )
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
      this.carIcon = new this.google.maps.Marker({
        map: this.map,
        position: this.selectedRoute.startLocation,
        icon: {
          path: this.google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
          scale: 6,
          rotation: 0,
          fillColor: '#DC5846',
          fillOpacity: 0.7,
          strokeColor: '#DC5846',
          strokeWeight: 2
        },
        zIndex: 999
      })
      this.directionsRenderer.setPanel(
        this.$el.querySelector('#route-panel-contents')
      )
      let i = 1
      this.navigationTimer = setInterval(() => {
        this.moveIcon(
          this.selectedRoute.steps[i - 1],
          this.selectedRoute.steps[i]
        )
        i++

        if (i >= this.selectedRoute.steps.length) {
          clearInterval(this.navigationTimer)
        }
      }, 1000)
    },
    moveIcon(currentPosition, nextPosition) {
      const angle = this.google.maps.geometry.spherical.computeHeading(
        currentPosition,
        nextPosition
      )
      this.carIcon.setIcon({
        path: this.google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
        scale: 6,
        rotation: angle,
        fillColor: '#ff0000',
        fillOpacity: 0.7,
        strokeColor: '#ff0000',
        strokeWeight: 2
      })
      this.carIcon.setPosition(nextPosition)
    }
  }
}
</script>

<style>
.el-main {
  padding: 0;
}
#map {
  position: fixed !important;
  height: 100% !important;
  width: 100% !important;
}
</style>
