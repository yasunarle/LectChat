<template>
  <div class="header">
    <div class="header__logo header__left">
      <div class="app__logo">
        <router-link to="/">Lect</router-link>
      </div>
    </div>
    <div class="header__right">
      <template v-if="getUser">
        <div class="header__navContainer">
          <a @click="logOut" href="#">Log out</a>
        </div>
      </template>
      <template v-else>
        <div class="header__navContainer">
          <a @click="logIn" href="#">Login</a>
        </div>
      </template>
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
  setup() {
    const { getUser } = useFirebase()
    function logIn() {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithPopup(provider)
    }
    function logOut() {
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
.header {
  height: 60px;
  width: 100%;
  border-bottom: 1px solid black;
  display: flex;
  flex-direction: row;
  .header__logo {
    margin: 20px;
  }
  .header__right {
    flex: 1;
    .header__navContainer {
      cursor: pointer;
      a {
        text-decoration: none;
        color: #4f5959;
      }
      a:hover {
        color: #4fc08d;
      }
    }
  }
}
</style>