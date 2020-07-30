<template>
  <div class="user">
    <template v-if="state.pageUser">
      <div class="user__profile">
        <!--  -->
        <div class="avater">
          <img :src="state.pageUser.photoURL" width="120px" />
        </div>
        <!--  -->
        <div>
          <h1>{{ state.pageUser.name }}</h1>
          <h1>自己紹介こんにちわ</h1>
          <h1>参加しているコミュニティー</h1>
          <h1>参加しているチャットルーム</h1>
          <div v-for="(room, index ) in state.pageUser.joined_rooms" :key="index">{{ room }}</div>
        </div>
        <!--  -->
      </div>
    </template>
    <template v-else>
      <div>
        <h1>State 404 Error</h1>
      </div>
    </template>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from '@vue/composition-api'
import firebase, { firestore } from 'firebase'
// Plugins
import useFirebase from '@/plugins/firebase'

export default defineComponent({
  setup(_, ctx) {
    //
    // created
    //
    const state = reactive({
      pageUser: null
    })
    const userRef = firebase
      .firestore()
      .collection('users')
      .doc(ctx.root.$route.params.id)
    userRef.get().then(snapshot => {
      if (snapshot.exists) {
        state.pageUser = {
          id: snapshot.id,
          ...snapshot.data()
        }
      }
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
  .user__profile {
    max-width: 700px;
    margin: 0 auto;
    padding: 10px;
    display: flex;
    flex-direction: row;
  }
}
</style>