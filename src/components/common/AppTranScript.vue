<template>
  <div class="transcript">
    <div class="avatar">
      <span>11</span>
    </div>
    <div>
      <h3>
        {{ props.poster_name }}
        <span class="formatedTime">{{ formatedTime }}</span>
      </h3>
      <p>{{ props.content }}</p>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'

interface Props {
  content: string
  poster_id: string
  poster_name: string
  created_at: any
}
export default defineComponent({
  props: {
    content: String,
    poster_id: String,
    poster_name: String,
    created_at: Object,
  },
  setup(props: Props) {
    const formatedHour =
      props.created_at.toDate().getHours() < 10
        ? '0' + String(props.created_at.toDate().getHours())
        : props.created_at.toDate().getHours()
    const formatedMinutes =
      props.created_at.toDate().getMinutes() < 10
        ? '0' + String(props.created_at.toDate().getMinutes())
        : props.created_at.toDate().getMinutes()
    const day = props.created_at.toDate().getDate()
    const month = props.created_at.toDate().getMonth()

    // Computed
    const formatedTime = computed(
      () => month + '/' + day + '/' + formatedHour + ':' + formatedMinutes
    )

    return {
      props,
      formatedTime,
    }
  },
})
</script>
<style lang="scss">
.transcript {
  padding: 8px;
  display: flex;
  p {
    color: #16161a;
  }
  .formatedTime {
    padding-top: 8px;
    font-size: 14px;
    color: #94a1b2;
  }
}
</style>
