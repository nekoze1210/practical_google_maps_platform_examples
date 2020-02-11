<template>
  <el-row class="route-panel">
    <div v-show="isNavigationStarted == false">
      <div v-for="route in routes" :key="route.index">
        <el-button @click="onClickRoute(route)" class="route-button">
          {{ route.name }}
        </el-button>
      </div>
      <el-button
        @click="onClickStartNavigationButton"
        v-show="selectedRoute != null"
        class="route-decision-button"
        >このルートでナビを開始する</el-button
      >
    </div>
    <div id="route-panel-contents" v-show="isNavigationStarted == true" />
  </el-row>
</template>

<script>
export default {
  props: {
    selectedRoute: {
      type: Object,
      required: false,
      default: () => {
        return null
      }
    },
    routes: {
      type: Array,
      required: true
    },
    isNavigationStarted: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  methods: {
    onClickRoute(route) {
      this.$emit('click-route', route)
    },
    onClickStartNavigationButton() {
      this.$emit('click-start-navigation')
    }
  }
}
</script>

<style scoped>
.route-panel {
  margin-top: 20px;
}
.route-button {
  width: 100%;
  height: 60px;
  margin-top: 10px;
}
.route-decision-button {
  margin-top: 100px;
  width: 100%;
  background: #dc5846;
  color: #fff;
}
#route-panel-contents {
  overflow-y: scroll;
  overflow-x: hidden;
  max-height: 600px;
}
</style>
