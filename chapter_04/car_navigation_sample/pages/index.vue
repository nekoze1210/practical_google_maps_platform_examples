<template>
  <el-container>
    <el-aside style="padding-top: 0px;">
      <h2>Navitgation Simulator</h2>
      <el-input
        v-model="origin"
        placeholder="出発地"
        style="padding-top: 20px;"
      ></el-input>
      <el-input
        v-model="destination"
        placeholder="目的地"
        style="padding-top: 20px;"
      ></el-input>
    </el-aside>
    <el-main style="padding-top: 0px">
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
      origin: '',
      destination: ''
    }
  },
  mounted() {
    const element = this.$el.querySelector('#map')
    loadGoogleMaps(process.env.API_KEY, apiOptions, element).then(
      (googleMap) => {
        this.map = googleMap.map
        this.google = googleMap.google
      }
    )
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
