<template>
  <div id="app">    
    <TheHeader/>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
// components
import TheHeader from '@/components/common/TheHeader.vue'

export default defineComponent({
  components:{
    TheHeader
  },
  setup(){}
})
</script>

<style lang="scss">
body{
  padding: 0px;
  margin: 0px;
  *{
    padding: 0px;
    margin: 0px;    
  }
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;  
  // color: #2c3e50;
  color: #6E68FD;

}
.app-logo{
  font-size: 30px;
  font-weight: bold;
}
</style>
