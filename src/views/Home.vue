<template>
  <div class="home">
    <!-- <img src="@/assets/conversation.png" alt /> -->
    <RoomsShow />
    <!-- <CommunityCreater /> -->
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
// compornents
import RoomsShow from '@/components/common/RoomsShow.vue'
import CommunityCreater from '@/components/common/CommunityCreater.vue'

export default defineComponent({
  components: {
    RoomsShow,
    CommunityCreater
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
