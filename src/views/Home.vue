<template>
  <div class="home">  
    <h1>This App is made by comopsition API</h1>
    <p>test of composition API</p>
    <router-link to="/compositionapi">Go to URI</router-link>
    <h1>RoomCreater</h1> 
    <RoomCreater/>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
// compornents
import RoomCreater from '@/components/common/RoomCreater.vue'
export default defineComponent({  
  components: {
    RoomCreater
  },
  setup(){

  }
})
</script>
