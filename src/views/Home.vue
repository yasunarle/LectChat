<template>
  <div class="home">
    <img src="@/assets/conversation.png" alt />
    <RoomCreater />
    <RoomsShow />
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
// compornents
import RoomCreater from '@/components/common/RoomCreater.vue'
import RoomsShow from '@/components/common/RoomsShow.vue'

export default defineComponent({
  components: {
    RoomCreater,
    RoomsShow
  },
  setup() {}
})
</script>

<style lang="scss">
.home {
  padding: 20px;
  min-height: 800px;
  img {
    height: 200px;
  }
}
</style>
