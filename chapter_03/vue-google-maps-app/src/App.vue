<template>
  <div id="map">
    <GmapMap
      :center="{ lat: 35.7329854, lng: 139.7128128 }"
      :zoom="15"
      map-type-id="roadmap"
      :options="{ disableDefaultUi: true, clickableIcons: false }"
      style="width: 100%; height: 100%"
      @click="onMapClick"
    >
      <GmapMarker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="false"
        :draggable="true"
        @click="center=m.position"
      />
    </GmapMap>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      markers: []
    }
  },
  methods: {
    onMapClick(event){
      this.markers.push({
        position: {
          lat: event.latLng.lat(),
          lng: event.latLng.lng()
        }
      })
    }
  }
}
</script>

<style>
#map {
  height: 100%;
}
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>
