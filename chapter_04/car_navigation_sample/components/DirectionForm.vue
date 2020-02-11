<template>
  <el-row id="direction-form">
    <h2>Navitgation Simulator</h2>
    <el-input v-model="originInput" placeholder="出発地"></el-input>
    <el-input v-model="destinationInput" placeholder="目的地"></el-input>
    <el-button @click="onClickSearchButton">
      ルート検索
    </el-button>
  </el-row>
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
    }
  },
  methods: {
    onClickSearchButton() {
      this.$emit('click-search-button')
    }
  }
}
</script>

<style scoped>
#direction-form h2 {
  color: #fff;
  padding: 0 10px;
}
.el-input,
.el-button--default {
  margin-top: 20px;
}
#direction-form {
  height: 300px;
  background: #356df2;
  padding: 0 10px 0 10px;
}
</style>
