<template>
  <div class="room-creater">
    <input type="text" placeholder="Room Name" v-model="state.roomName"> 
    <input type="text" placeholder="description" v-model="state.description">
    <input type="text" placeholder="genre" v-model="state.genre">
    <button @click="validation">Create</button>
  </div>
</template>
<script>
import { defineComponent, reactive, toRefs } from '@vue/composition-api'
import useFirebase from '@/plugins/firebase'
export default defineComponent({
  setup(){
    // useFirebase
    const { getUser, createRoom } = useFirebase()    
    // localstate
    const state = reactive({
      roomName: '',
      description: '',
      genre: ''
    })
    function validation(){
      if( state.roomName && state.description && state.genre ){
        const roomPram = { 
          ...state
        }
        createRoom(roomPram)
      } else {
        alert('Please full in')
      }
    }
    // return
    return {
      state,
      validation      
    }
  }
})
</script>