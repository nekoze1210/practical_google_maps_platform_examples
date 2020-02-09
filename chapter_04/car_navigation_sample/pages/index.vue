<template>
  <el-container>
    <el-aside style="padding-top: 0px;">
      <el-row
        style="height: 300px; background: #356DF2; padding: 0 10px 0 10px;"
      >
        <h2 style="color: #fff; padding: 0 10px">Navitgation Simulator</h2>
        <el-input
          v-model="origin"
          placeholder="出発地"
          style="padding-top: 20px"
        ></el-input>
        <el-input
          v-model="destination"
          placeholder="目的地"
          style="padding-top: 20px;"
        ></el-input>
        <el-button @click="searchRoutes" style="margin-top: 20px;">
          ルート検索
        </el-button>
      </el-row>
      <el-row style="margin-top: 20px">
        <div v-for="route in routes" :key="route.index">
          <el-button
            @click="selectRoute(route)"
            style="width: 100%; height: 60px; margin-top: 10px;"
          >
            {{ route.name }}
          </el-button>
        </div>
        <el-button
          @click="startNavigation"
          v-show="selectedRoute != null"
          type="danger"
          style="margin-top: 100px; width: 100%; background: #DC5846"
          >このルートでナビを開始する</el-button
        >
      </el-row>
    </el-aside>
    <el-main style="padding: 0">
      <div id="map"></div>
    </el-main>
  </el-container>
</template>

<script>
import loadGoogleMaps from '~/plugins/googleMapsPlatform/scripts/loadGoogleMaps.js'

const apiOptions = {
  libraries: ['geometry', 'places', 'visualization']
}

export default {
  data() {
    return {
      map: null,
      google: null,
      origin: '池袋駅',
      destination: '大塚駅',
      routes: [],
      selectedRoute: null
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
    searchRoutes() {
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
          const carImage = require('~/assets/car.png')
          const image = {
            url: carImage,
            size: new this.google.maps.Size(50, 40),
            origin: new this.google.maps.Point(0, 0),
            anchor: new this.google.maps.Point(17, 34),
            scaledSize: new this.google.maps.Size(50, 30)
          }
          this.routes = response.routes.map((route, index) => {
            const value = parseInt(index) + 1
            return {
              id: value,
              name: 'ルート' + value,
              distance: route.legs[0].distance,
              duration: route.legs[0].duration,
              startAddress: route.legs[0].start_address,
              startLocation: route.legs[0].start_location,
              endAddress: route.legs[0].end_address,
              endLocation: route.legs[0].end_location,
              overviewPolyline: route.overview_polyline,
              steps: this.google.maps.geometry.encoding.decodePath(
                route.overview_polyline
              ),
              carIcon: new this.google.maps.Marker({
                map: this.map,
                position: route.legs[0].start_location,
                icon: image,
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
    sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms))
    },
    startNavigation() {
      this.selectedRoute.carIcon.setVisible()
      const steps = this.selectedRoute.steps
      this.moveCar(steps[11])

      // steps.forEach(async (step) => {
      //   await this.sleep(1000)
      //   console.log(step)
      //   this.moveCar(step)
      // })

      // for (let i = 0; i < this.selectedRoute.steps.length; i++) {
      //   setInterval(() => {
      //     console.log(i)
      //     this.moveCar(this.selectedRoute.steps[i])
      //   }, 1000)
      // }
    },
    moveCar(position) {
      const marker = this.selectedRoute.carIcon
      // const lat = marker.position.lat()
      // const lng = marker.position.lng()
      console.log(marker)

      console.log(position)
      const deltalat = (position.lat() - marker.position.lat()) / 100
      const deltalng = (position.lng() - marker.position.lat()) / 100

      const delay = 10 * 0.5
      for (let i = 0; i < 100; i++) {
        ;((ind) => {
          setTimeout(() => {
            let lat = this.selectedRoute.carIcon.position.lat()
            let lng = this.selectedRoute.carIcon.position.lng()
            lat += deltalat
            lng += deltalng
            const latlng = new this.google.maps.LatLng(lat, lng)
            marker.setPosition(latlng)
          }, delay * ind)
        })(i)
      }
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
