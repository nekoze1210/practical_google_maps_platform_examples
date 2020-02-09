<template>
  <el-aside>
    <el-row class="direction-form">
      <h2 style="color: #fff; padding: 0 10px">Navitgation Simulator</h2>
      <el-input v-model="originInput" placeholder="出発地"></el-input>
      <el-input v-model="destinationInput" placeholder="目的地"></el-input>
      <el-button @click="$emit('click-search-button')">
        ルート検索
      </el-button>
    </el-row>
    <el-row class="route-panel">
      <div v-show="isNavigationStarted == false">
        <div v-for="route in routes" :key="route.index">
          <el-button @click="$emit('click-route', route)" class="route-button">
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
  </el-aside>
</template>

<script>
export default {
  props: {
    origin: {
      type: String,
      required: true
    },
    destination: {
      type: String,
      required: true
    },
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
  computed: {
    originInput: {
      get() {
        return this.$props.origin
      },
      set(value) {
        this.$emit('input-origin', value)
      }
    },
    destinationInput: {
      get() {
        return this.$props.destination
      },
      set(value) {
        return this.$emit('input-destination', value)
      }
    },
    isNavigationStartedToggle: {
      get() {
        return this.$props.isNavigationStarted
      }
    }
  },
  methods: {
    onClickStartNavigationButton() {
      this.$emit('click-start-navigation')
    }
  }
}
</script>

<style scoped>
.el-aside {
  padding: 0;
}
.el-input,
.el-button--default {
  margin-top: 20px;
}
.direction-form {
  height: 300px;
  background: #356df2;
  padding: 0 10px 0 10px;
}
.direction-form h2 {
  color: #fff;
}
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
