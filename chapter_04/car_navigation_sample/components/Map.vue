<template>
  <div id="map" />
</template>

<script>
export default {
  props: {},
  data() {
    return {
      map: null,
      google: null,
      directionService: null,
      directionsRenderer: null
    }
  }
}
</script>
