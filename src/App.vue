<template>
  <div id="app">
    <TheHeader />
    <router-view></router-view>
    <TheFooter />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
// Components
import TheHeader from '@/components/common/TheHeader.vue'
import TheFooter from '@/components/common/TheFooter.vue'

export default defineComponent({
  components: {
    TheHeader,
    TheFooter
  },
  setup() {}
})
</script>

<style lang="scss">
body {
  padding: 0px;
  margin: 0px;
  * {
    padding: 0px;
    margin: 0px;
  }
  textarea {
    border: none;
    outline: none;
    color: #4f5959;
    resize: none;
  }
  a {
    text-decoration: none;
    color: #4fc08d;
  }
}
.app__btn {
  background-color: #2ea6ff;
  border: none;
  border-radius: 3px;
  padding: 10px 20px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #4f5959;
}
.app-logo {
  font-size: 30px;
  font-weight: bold;
}
</style>
