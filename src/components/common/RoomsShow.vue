<template>
  <div class="rooms-show">
    <h2 class="title">新着チャットルーム: 10件</h2>
    <div class="room-card" v-for="(room, index) in state.rooms" :key="index">
      <h2>
        <router-link :to="{ name: 'Room', params: { id: room.id } }">
          {{ room.title }}
        </router-link>
      </h2>
      <p>{{ room.description }}</p>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive } from '@vue/composition-api'
import firebase from 'firebase'
// Plugins
import { roomsRef } from '@/plugins/firebase'
export default defineComponent({
  setup() {
    // localstate
    const state = reactive({
      rooms: [],
    })
    // created
    roomsRef
      .limit(10)
      .get()
      .then((snapshot) => {
        const docs = snapshot.docs
        for (const doc of docs) {
          const room = {
            id: doc.id,
            ...doc.data(),
          }
          state.rooms.push(room)
        }
      })
    return {
      state,
    }
  },
})
</script>
<style lang="scss">
.rooms-show {
  .title {
    padding: 10px 0px;
    background-color: #1fd1f9;
    background-image: linear-gradient(315deg, #2ea6ff 0%, #7f5af0 74%);
    -webkit-background-clip: text;
    color: transparent;
  }
}
.room-card {
  padding: 10px;
  margin-bottom: 16px;
  background: #242629;
  border-radius: 2px;
  a {
    color: #fffffe;
  }
  a:hover {
    color: #7f5af0;
  }
  p {
    color: #94a1b2;
  }
}
</style>
