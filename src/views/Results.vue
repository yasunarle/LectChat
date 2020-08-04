<template>
  <div class="results">
    <h1>検索結果</h1>
    <div v-if="state.rooms">      
      <div v-for="room in state.rooms">
        <p>{{ room.title }}</p>
      </div>
    </div>
    <div　v-else>
      一致するチャットルームが見つかりませんでした。
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from '@vue/composition-api'
// Plugins
import useFirebase, { db } from '@/plugins/firebase'

export default defineComponent({
  // props: {
  //   search_query: String
  // },

  setup(_, ctx) {
    const state = reactive({
      rooms: []
    })
    const search_query = ctx.root.$route.params.search_query
    // search func
    db.collection('rooms')
      .where('hashtags', 'array-contains', search_query)
      .get()
      .then(querySnapshot => {
        const docs = querySnapshot.docs

        docs.forEach(doc => {
          state.rooms.push(doc.data())
        })
        // state.rooms.push()
      })
    return {
      state
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.results {
  width: 100%;
  min-height: 600px;
}
</style>
