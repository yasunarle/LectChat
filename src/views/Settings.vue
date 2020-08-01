<template>
  <div class="settings">
    <h1>settings</h1>
    <div v-if="getIsProcessing">
      <h1>読み込み中</h1>
    </div>
    <div v-else>
      <div v-if="getUser">
        <h1>id: {{ getUser.id }}</h1>
        <h1>ユーザーネーム: {{ getUser.name }}</h1>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  reactive,
  watchEffect
} from '@vue/composition-api'
import router from '@/router'
import useFirebase, { db } from '../plugins/firebase'

export default defineComponent({
  setup(_, ctx) {
    const state = reactive({
      isLoggedIn: true
    })
    const { getUser, getIsProcessing } = useFirebase()

    // onMounted
    onMounted(() => {
      setTimeout(() => {
        if (!getUser.value) {
          router.push('/')
        }
      }, 1000)
    })
    return {
      getUser,
      getIsProcessing
    }
  }
})
</script>
<style lang="scss">
.settings {
  min-height: 600px;
}
</style>