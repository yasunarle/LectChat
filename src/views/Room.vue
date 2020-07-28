<template>
  <div class="room">
    <div v-if="state.roomData" class="room__content">
      <div class="room__header">
        <h1>タイトル: {{ state.roomData.title }}</h1>
        <h2>説明文: {{ state.roomData.description }}</h2>
        <h3>ジャンル: {{ state.roomData.genre }}</h3>
        <h3>オーナー: {{ state.roomData.owner_name }}</h3>
      </div>

      <input type="text" v-model="state.inputText" />
      <button @click="postBtn">送信</button>

      <div class="transcripts">
        <template v-for="(transcript, index) in state.roomData.transcripts">
          <AppTranScript :content="transcript.content" :created_at="transcript.created_at" />
        </template>
      </div>
    </div>
    <div v-else>
      <h1>そんなルームないよ</h1>
    </div>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  reactive,
  onMounted,
  computed
} from '@vue/composition-api'
import firebase from 'firebase'
// Plugins
import useFirebase from '@/plugins/firebase'
// Types
import { ITranScript, IRoomData, IRoomState } from '@/types/room'
// Components
import AppTranScript from '@/components/common/AppTranScript.vue'

export default defineComponent({
  components: {
    AppTranScript
  },
  setup(_, ctx) {
    // localstate
    const state = reactive<IRoomState>({
      roomData: null,
      inputText: ''
    })
    // useFirebase
    const { postTranScript } = useFirebase()
    function postBtn() {
      // post Message in the room
      postTranScript(state.roomData.id, state.inputText)
    }
    // onMounted
    onMounted(() => {
      const roomId = ctx.root.$route.params.id
      const roomRef = firebase
        .firestore()
        .collection('rooms')
        .doc(roomId)
      // --
      roomRef.get().then(docSnapshot => {
        if (docSnapshot.exists) {
          state.roomData = {
            id: docSnapshot.id,
            ...docSnapshot.data(),
            transcripts: []
          } // as IRoomData
          roomRef.collection('transcripts').onSnapshot(tsSnapshot => {
            const docs = tsSnapshot.docs
            if (state.roomData) {
              state.roomData.transcripts = []
              for (const doc of docs) {
                state.roomData.transcripts.push(doc.data() as ITranScript)
              }
            }
          })
        }
      })
    })

    return {
      state,
      postBtn
    }
  }
})
</script>

<style lang="scss">
.room {
  padding: 10px;
  .room__content {
    padding: 10px;
    border: 1px solid black;
  }
  .chats {
    min-height: 500px;
    padding: 20px;
    border: 1px solid black;
  }
}
</style>