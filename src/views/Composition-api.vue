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
  SetupContext,
  inject,
  provide,
  InjectionKey
} from '@vue/composition-api'
import { useMousePosition } from '@/mixins/mouse'
import useFirebase from '@/plugins/firebase'

const key: InjectionKey<string> = Symbol()
export default defineComponent({
  setup(_, ctx: SetupContext) {
    provide(key, 'testify')
    const test = inject(key)
    onMounted(() => {
      console.log(ctx.root.$el)
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

<style lang="scss">
.test-container {
  min-height: 700px;
  padding: 10px;
}
</style>
