<template>
  <div class="transcript">
    <h1>{{ props.content }}</h1>
    <p>{{ time }}</p>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'

interface Props {
  content: string
  created_at: any
}
export default defineComponent({
  props: {
    content: String,
    created_at: Object
  },
  setup(props: Props) {
    const hour =
      props.created_at.toDate().getHours() < 10
        ? '0' + String(props.created_at.toDate().getHours())
        : props.created_at.toDate().getHours()
    const minutes =
      props.created_at.toDate().getMinutes() < 10
        ? '0' + String(props.created_at.toDate().getMinutes())
        : props.created_at.toDate().getMinutes()
    const time = computed(() => hour + ':' + minutes)

    return {
      props,
      time
    }
  }
})
</script>