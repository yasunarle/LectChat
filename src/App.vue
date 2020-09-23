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
    TheFooter,
  },
  setup() {},
})
</script>

<style lang="scss">
body {
  padding: 0px;
  margin: 0px;
  * {
    padding: 0px;
    margin: 0px;
    box-sizing: border-box;
  }

  a {
    text-decoration: none;
    color: #7f5af0;
  }
  textarea {
    border: none;
    outline: none;
    color: #4f5959;
    resize: none;
  }
}
.app__btn {
  // div
  width: fit-content;
  padding: 8px 16px;
  background-color: #2ea6ff;
  color: none;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #f7fafc;
}
.app__logo {
  // div

  a {
    font-size: 30px;
    font-weight: bold;
    background-color: #1fd1f9;
    background-image: linear-gradient(315deg, #2ea6ff 0%, #7f5af0 74%);
    -webkit-background-clip: text;
    color: transparent;
  }
}
</style>
