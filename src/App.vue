<template>
  <div id="app">    
    <TheHeader></TheHeader>
    <div>
      <span>name: {{ userName }}</span>            
    </div>
    <div>      
      <span>x: {{ x }}, y: {{ y }}</span>      
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, onMounted, SetupContext } from '@vue/composition-api'
import userStore from '@/store/index';
import TheHeader from '@/components/common/TheHeader.vue'
import { useMousePosition } from '@/mixins/mouse'


export default defineComponent({ // ????????
  components:{
    TheHeader
  },
  setup(_, ctx: SetupContext){
    onMounted(() => {
      console.log(ctx.root.$data)
    })
    const user = userStore()
    const userName = computed(() => user.userName)
    const { x, y } = useMousePosition()    
    //
    // return => templete ?????????????
    //
    return {
      userName,
      x,
      y      
    }
  }
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
  color: #2c3e50;  
}
</style>
