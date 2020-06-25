<template>
  <div class="header">
    <div class="logo">
      <div class="app-logo">LECT</div>
    </div>    
    <div v-if="getUser">
      <button @click="logOut">Log out</button>
    </div>  
    <div v-else>
      <button @click="logIn">Login</button>
    </div>      
  </div>
</template>
<script>
import { defineComponent, computed } from '@vue/composition-api'
import firebase from 'firebase'
// store
import userStore from '@/store/index'
// plugins
import useFirebase from '@/plugins/firebase'
// components
// import AppButton from '@/components/common/AppButton.vue'

export default defineComponent({
  components: { 
    // AppButton
  },
  setup(){
    const { getUser } = useFirebase()        
    function logIn(){
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithPopup(provider)
    }
    function logOut(){
      firebase.auth().signOut()
    }
    return {
      getUser,      
      logIn,
      logOut
    }
  }
})
</script>
<style lang="scss">
.header{
  height: 80px;
  width: 100%;
  // padding: 10px;
  border-bottom: 1px solid black;
  display: flex;  
  justify-content: space-between;
  .logo{
    height: 80px;
    img{
      height: 100%;
    }
  }
}    
</style>