<template>
  <div class="home">  
    <AppButton>Login</AppButton> 
  </div>
</template>

<script>
// @ is an alias to /src
import AppButton from '@/components/common/AppButton.vue'

export default {
  name: 'Home',
  components: {
    AppButton
  }
}
</script>
