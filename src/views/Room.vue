<template>
  <div class="room">
    <div v-if="state.roomData" class="room__content">
      <!--  -->
      <div class="room__header">
        <h1>タイトル: {{ state.roomData.title }}</h1>
        <h2>説明文: {{ state.roomData.description }}</h2>
        <h3>ジャンル: {{ state.roomData.genre }}</h3>
        <h3>オーナー: {{ state.roomData.owner_name }}</h3>

        <div v-if="isJoinedRoom">
          <button @click="handleLeaveRoom">Leave</button>
        </div>
        <div v-else>
          <button @click="handleJoinRoom">参加</button>
        </div>
      </div>
      <!--  -->
      <div class="room__postForm">
        <!-- @keyup.enter="handlePost" -->
        <textarea type="text" v-model="state.inputText" placeholder="公開コメントを入力..." />
        <button @click="handlePost">送信</button>
      </div>
      <!--  -->
      <div class="transcripts">
        <template v-for="(transcript, index) in state.roomData.transcripts">
          <AppTranScript
            :content="transcript.content"
            :poster_id="transcript.poster_id"
            :poster_name="transcript.poster_name"
            :created_at="transcript.created_at"
          />
        </template>
      </div>
      <!--  -->
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
    //
    // localstate
    //
    const state = reactive<IRoomState>({
      roomData: null,
      inputText: ''
    })
    //
    // useFirebase
    //
    const { postTranScript, joinRoom, leaveRoom, getUser } = useFirebase()
    const isJoinedRoom = computed(() => {
      if (state.roomData) {
        if (getUser.value) {
          return getUser.value.joined_rooms.indexOf(state.roomData.id) >= 0
            ? true
            : false
        }
      }
    })

    function handlePost() {
      if (state.roomData) {
        postTranScript(state.roomData.id, state.inputText)
        state.inputText = ''
      }
    }
    function handleJoinRoom() {
      if (state.roomData) {
        joinRoom(state.roomData.id)
      }
    }
    function handleLeaveRoom() {
      if (state.roomData) {
        leaveRoom(state.roomData.id)
      }
    }
    //
    // onMounted
    //
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
          roomRef
            .collection('transcripts')
            .orderBy('created_at', 'desc')
            .onSnapshot(tsSnapshot => {
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
      handlePost,
      isJoinedRoom,
      handleJoinRoom,
      handleLeaveRoom
    }
  }
})
</script>

<style lang="scss">
.room {
  width: 100%;
  min-height: 600px;
  background: #f6f6f6;
  .room__content {
    max-width: 900px;
    margin: 0px auto;
    padding: 10px;
    .room__postForm {
      max-width: 400px;
      margin: 0 auto;
      height: 100px;
      padding: 20px;
      display: flex;
      flex-direction: column;
      text-align: center;
      border-top: 1px solid #cccccc;
      border-bottom: 1px solid #cccccc;
      textarea {
        height: 1000px;
        padding: 10px;
        background: #f6f6f6;
        border-bottom: 1px solid #cccccc;
      }
      button {
        margin-top: 20px;
        color: #4fc08d;
      }
    }
  }
}
</style>