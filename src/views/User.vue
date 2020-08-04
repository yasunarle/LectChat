<template>
  <div class="user">
    <div class="user__content">
      <template v-if="state.pageUser">
        <div class="user__profile">
          <div class="avater">
            <img :src="state.pageUser.photoURL" width="120px" />
          </div>
          <div>
            <h1>{{ state.pageUser.name }}</h1>
            <h4 class="createdRooms__title">作成したチャットルーム</h4>
            <template v-for="room in state.created_rooms">
              <div>
                <router-link :to="{ name: 'Room', params: { id: room.id } }">
                  {{ room.title }}
                </router-link>
              </div>
            </template>
            <h4 class="createdRooms__title">参加しているチャットルーム</h4>
            <div v-for="(room, index) in state.joined_rooms" :key="index">
              <router-link :to="{ name: 'Room', params: { id: room.id } }">
                {{ room.title }}
              </router-link>
            </div>
          </div>
        </div>
        <RoomCreater />
      </template>
      <template v-else>
        <div>
          <h1>State 404 Error</h1>
        </div>
      </template>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from '@vue/composition-api'
import firebase, { firestore } from 'firebase'
// Components
import RoomCreater from '@/components/common/RoomCreater.vue'
// Plugins
import useFirebase, { db, usersRef, roomsRef } from '@/plugins/firebase'
// Types
import { IUserPageState, IUser } from '@/types/user'
// Router
import router from '@/router'

export default defineComponent({
  components: {
    RoomCreater
  },
  setup(_, ctx) {
    //
    // created
    //
    const state = reactive<IUserPageState>({
      pageUser: null,
      joined_rooms: [],
      created_rooms: []
    })
    //
    // firebase
    //
    const userRef = usersRef.doc(ctx.root.$route.params.id)
    userRef.get().then(snapshot => {
      if (snapshot.exists) {
        const pageUserObj = {
          id: snapshot.id,
          ...snapshot.data()
        } as IUser
        state.pageUser = pageUserObj
        // joined_rooms
        if (state.pageUser) {
          for (const roomId of state.pageUser.joined_rooms) {
            roomsRef
              .doc(roomId)
              .get()
              .then(roomSnapShot => {
                state.joined_rooms.push({
                  id: roomSnapShot.id,
                  ...roomSnapShot.data()
                })
              })
          }
        }
      }
    })
    roomsRef
      .where('owner_id', '==', ctx.root.$route.params.id)
      .get()
      .then(snapshot => {
        const docs = snapshot.docs
        docs.forEach(doc => {
          const room = {
            id: doc.id,
            ...doc.data()
          }
          state.created_rooms.push(room)
        })
      })
    //
    // useFirebase
    //
    const { getUser } = useFirebase()

    return {
      state,
      getUser
    }
  }
})
</script>
<style lang="scss">
.user {
  width: 100%;
  min-height: 700px;
  .user__content {
    max-width: 700px;
    margin: 0 auto;
    padding: 10px;
    .user__profile {
      display: flex;
      flex-direction: row;
      .createdRooms__title {
        border-bottom: 1px solid black;
        padding: 10px;
      }
    }
  }
}
</style>
