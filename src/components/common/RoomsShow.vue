<template>
  <div class="rooms-show">
    <h2>ルーム一覧</h2>
    <div v-for="(room, index) in state.rooms" :key="index">
      <h2>
        <router-link :to="{ name: 'Room', params: { id: room.id }}">{{ room.title }}</router-link>
      </h2>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive } from '@vue/composition-api'
import firebase from 'firebase'
export default defineComponent({
  setup() {
    // localstate
    const state = reactive({
      rooms: []
    })
    // created
    firebase
      .firestore()
      .collection('rooms')
      .get()
      .then(snapshot => {
        const docs = snapshot.docs
        for (const doc of docs) {
          const room = {
            id: doc.id,
            ...doc.data()
          }
          state.rooms.push(room)
        }
      })
    return {
      state
    }
  }
})
</script>