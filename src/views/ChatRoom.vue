<template>
  <div class="room">
    <div v-if="state.roomData">
      <div class="room-detail">
        <h1>{{ state.roomData.title }}</h1>
        <h3>ジャンル: {{ state.roomData.genre }}</h3>
        <h3>Owner: {{ state.roomData.owner_name }}</h3>
      </div>
      <div class="chats">
        <div v-for="(chat, index) in state.roomData.chats">
          <div class="chat">
            <h3>{{ chat.poster }}</h3>
            <p>{{ chat.text }}</p>
            <!-- <p>{{ chat.created_at.toDate().getHours() }} : {{ chat.created_at.toDate().getMinutes() }}</p> -->
          </div>
        </div>
      </div>
      <div class="messenger">
        <textarea />
        <!-- <button @click="sendBtn">Post</button> -->
      </div>
    </div>
    <div v-else>
      <h1>state: 404 Error</h1>
    </div>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  reactive,
  onMounted,
  SetupContext,
  toRefs
} from '@vue/composition-api'
import firebase from 'firebase'
// plugins
import useFirebase from '@/plugins/firebase'
// types
import { IChat, IRoomData, IRoomState } from '@/types/room'

export default defineComponent({
  setup(_, ctx) {
    // localstate
    const state = reactive<IRoomState>({
      roomData: null
    })
    // useFirebase
    const { createChat } = useFirebase()
    function sendBtn() {
      // post chat
      if (state.roomData) {
        createChat(state.roomData.id)
      }
    }
    // onMounted
    onMounted(() => {
      const roomId = ctx.root.$route.params.id
      const chatRoomRef = firebase
        .firestore()
        .collection('chatRooms')
        .doc(roomId)
      chatRoomRef.get().then(docSnapshot => {
        if (docSnapshot.exists) {
          chatRoomRef.onSnapshot(doc => {
            // doc => room
            state.roomData = {
              id: doc.id,
              ...doc.data(),
              chats: []
            }
          })
        }
        chatRoomRef.collection('chats').onSnapshot(snapshot => {
          const docs = snapshot.docs
          if (state.roomData) {
            state.roomData.chats = []
            for (const doc of docs) {
              state.roomData.chats.push(doc.data() as IChat)
            }
          }
        })
      })
    })
    // useFirebase
    return {
      state,
      sendBtn
    }
  }
})
</script>

<style lang="scss">
.room {
  padding: 10px;
  .room-detail {
    padding: 10px;
    border: 1px solid black;
  }
  .chats {
    min-height: 500px;
    padding: 20px;
    border: 1px solid #a0a2ae;
    .chat {
      p {
        color: #000;
      }
    }
  }
  .messenger {
    min-height: 100px;
    background: cadetblue;
    textarea {
      max-height: 300px;
      width: 100%;
      padding: 12px;
      border: none;
      resize: none;
      // overflow: auto;
    }
  }
}
</style>
