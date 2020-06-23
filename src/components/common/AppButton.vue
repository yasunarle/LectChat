<template>
  <button type="button">
    <div>
      <slot/>
    </div>    
  </button>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
export default defineComponent({
  setup(){}
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
button{
  color: #42b983;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

</style>
