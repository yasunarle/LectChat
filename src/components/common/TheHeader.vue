<template>
  <div class="header">
    <div class="logo">
      <img alt="Vue logo" src="@/assets/logo.png">
      <AppButton>Login</AppButton>
    </div>    
  </div>
</template>
<script>
import AppButton from '@/components/common/AppButton.vue'
import { defineComponent } from '@vue/composition-api'
export default defineComponent({
  components: { 
    AppButton
  }
})
</script>
<style lang="scss">
.header{
  height: 80px;
  width: 100%;
  padding: 10px;
  border-bottom: 1px solid black;
  .logo{
    height: 80px;
    img{
      height: 100%;
    }
  }
}    
</style>