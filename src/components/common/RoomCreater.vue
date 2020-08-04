<template>
  <div class="room-creater">
    <h1>RoomCreater</h1>
    <p>{{ hashtagList }}</p>
    <input type="text" placeholder="Room Name" v-model="state.room.name" />
    <input type="text" placeholder="description" v-model="state.room.description" />
    <input type="text" placeholder="genre" v-model="state.room.genre" />
    <div>
      <span>ハッシュタグ</span>
      <input type="text" placeholder="#アニメ　#ワンピース" v-model="state.room.hashtags" />
    </div>

    <button @click="handleCreateRoom">Create</button>
  </div>
</template>
<script>
import {
  defineComponent,
  reactive,
  toRefs,
  computed
} from '@vue/composition-api'
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
        genre: '',
        hashtags: ''
      }
    })
    const hashtagList = computed(() => {
      if (!state.room.hashtags) {
        return []
      } else {
        const _list = state.room.hashtags.match(
          /[#＃][Ａ-Ｚａ-ｚA-Za-z一-鿆0-9０-９ぁ-ヶｦ-ﾟー._-]+/gm
        )
        const formatedList =
          _list != null ? _list.map(hashtag => hashtag.slice(1)) : []
        // console.log(formatedList)
        return formatedList
      }
    })
    function isValitedRoom() {
      return state.room.name && state.room.description && state.room.genre
        ? true
        : false
    }
    function handleCreateRoom() {
      if (isValitedRoom()) {
        const roomPrams = {
          name: state.room.name,
          description: state.room.description,
          genre: state.room.genre,
          hashtagList: hashtagList.value
        }
        createRoom(roomPrams)
      } else {
        alert('Please full in')
      }
    }
    // return
    return {
      state,
      hashtagList,
      handleCreateRoom
    }
  }
})
</script>