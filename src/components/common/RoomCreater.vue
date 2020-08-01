<template>
  <div class="room-creater">
    <h1>RoomCreater</h1>
    <input type="text" placeholder="Room Name" v-model="state.room.name" />
    <input type="text" placeholder="description" v-model="state.room.description" />
    <input type="text" placeholder="genre" v-model="state.room.genre" />
    <button @click="handleCreateRoom">Create</button>
  </div>
</template>
<script>
import { defineComponent, reactive, toRefs } from '@vue/composition-api'
import useFirebase from '@/plugins/firebase'
export default defineComponent({
  setup() {
    // useFirebase
    const { getUser, createRoom } = useFirebase()
    // localstate
    const state = reactive({
      room: {
        name: '',
        description: '',
        genre: ''
      }
    })
    function isValitedRoom() {
      return state.room.name && state.room.description && state.room.genre
        ? true
        : false
    }
    function handleCreateRoom() {
      if (isValitedRoom()) {
        const roomPram = {
          ...state.room
        }
        createRoom(roomPram)
      } else {
        alert('Please full in')
      }
    }
    // return
    return {
      state,
      handleCreateRoom
    }
  }
})
</script>