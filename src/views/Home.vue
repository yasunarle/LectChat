<template>
  <div class="home">
    <div class="home__content">
      <div class="left">
        <RoomsShow />
      </div>
      <div class="right">
        <div class="right__content">
          <p>PR</p>
        </div>
      </div>
    </div>
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
    CommunityCreater,
  },
  setup() {},
})
</script>

<style lang="scss">
.home {
  padding: 20px;
  min-height: 800px;
  background: #fffffe;
  img {
    height: 200px;
  }
  .home__content {
    max-width: 1000px;
    margin: auto;
    display: flex;
    flex-direction: row;
    .left {
      flex: 2;
    }
    .right {
      flex: 1;
      margin: 10px;
      padding: 10px;
      border: 4px solid #16161a;
      border-radius: 2px;
      color: #fffffe;
      .right__content {
        font-size: 20px;
        font-weight: bold;
        min-height: 500px;
      }
    }
  }
}
</style>
