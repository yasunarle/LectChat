<template>
  <div class="test-container">
    <div class="mixins">
      <h1>mixins</h1>
      <span>x: {{ x }}, y: {{ y }}</span>
    </div>
    <div class="user-state">
      <h1>user Auth state -- firebse</h1>
      <div v-if="getUser">
        <h3>username: {{ getUser.name }}</h3>
        <p>id: {{ getUser.id }}</p>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  reactive,
  computed,
  onMounted,
  SetupContext
} from '@vue/composition-api'
import { useMousePosition } from '@/mixins/mouse'
import useFirebase from '@/plugins/firebase'
import firebase from 'firebase'

enum Source {
  CACHE = 'cache',
  DEFAULT = 'default',
  SERVER = 'server'
}

export default defineComponent({
  setup(_, ctx: SetupContext) {
    onMounted(() => {
      console.log(ctx.root.$el)
      let getOptions = {
        source: Source.CACHE
      }

      // firebase.firestore().collection('users').doc("JhulkjgFmgPrBfUom34W31HKeja2")
      //   .get(getOptions)
      //     .then(( doc ) => {
      //       console.log(doc.data())
      //     })
    })
    // localstate
    const state = reactive({
      inputText: ''
    })
    // useMouse
    const { x, y } = useMousePosition()
    // useFirebase
    const { getUser } = useFirebase()
    //
    // return => to exporsed templete
    //
    return {
      state,
      x,
      y,
      getUser
    }
  }
})
</script>
