<template>
  <div class="user">
    <div class="user__profile">
      <!--  -->
      <div class="avater">
        <img :src="getUser.photoURL" width="120px" />
      </div>
      <!--  -->
      <div>
        <h1>{{ getUser.name }}</h1>
        <h1>自己紹介こんにちわ</h1>
        <h1>参加しているコミュニティー</h1>
        <h1>参加しているチャットルーム</h1>
        <div v-for="(room, index ) in getUser.joined_rooms" :key="index">{{ room }}</div>
      </div>
      <!--  -->
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from '@vue/composition-api'
import firebase from 'firebase'
// Plugins
import useFirebase from '@/plugins/firebase'

export default defineComponent({
  setup(_, ctx) {
    const { getUser } = useFirebase()
    return {
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