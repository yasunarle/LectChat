<template>
  <div class="chat-room">    
    <div v-if="state.roomData">
      <div class="room-data">
        <h1>{{ state.roomData.title }}</h1>
        <h3>ジャンル: {{ state.roomData.genre }}</h3> 
        <h3>Owner: {{ state.roomData.owner_id }}</h3>
      </div>
      <input type="text">
      <button @click="sendBtn">Post</button>
      <div class="chats">
        <div v-for="(chat, index) in state.roomData.chats">
          <div>
            {{ chat }}
          </div>
        </div>
      </div>      
    </div>
    <div v-else>
      <h1>そんなルームないよ</h1>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, onMounted, SetupContext, toRefs } from "@vue/composition-api"
import firebase from 'firebase'
import useFirebase from '@/plugins/firebase'
export default defineComponent({
  setup(_, ctx){
    // localstate
    const state = reactive({
      roomData: null
    })    
    // useFirebase
    const { createChat } = useFirebase()
    function sendBtn() {
      console.log(state.roomData.id)
      createChat(state.roomData.id)
    }    
    // onMounted
    onMounted(() => {    
      const roomId = ctx.root.$route.params.id
      const chatRoomRef = firebase.firestore().collection('chatRooms').doc(roomId)
      chatRoomRef.get()
        .then((docSnapshot) => {
          if( docSnapshot.exists ){
            chatRoomRef.onSnapshot(( doc ) => { // doc => room            
              state.roomData = {
                id: doc.id,
                ...doc.data(),                
                chats: []
              }              
            })
          }  
          chatRoomRef.collection("chats")
            .onSnapshot((snapshot) => {
              const docs = snapshot.docs
              state.roomData.chats = []
              for( const doc of docs ){
                state.roomData.chats.push(doc.data())
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
.chat-room{
  padding: 10px;
  .room-data{
    padding: 10px;
    border: 1px solid black;
  }
  .chats{
    min-height: 500px;
    padding: 20px;
    border: 1px solid black;
  }
}

  
</style>