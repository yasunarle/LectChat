<template>
  <div class="header">
    <div class="header__logo header__left">
      <div class="app__logo">
        <router-link to="/">Lect</router-link>
      </div>
    </div>
    <div class="header__search">
      <input type="text" class="search-input" v-model="state.searchContent" />
      <button @click="handleSearch">search</button>
    </div>
    <div class="header__right">
      <template v-if="getUser">
        <div class="header__navContainer">
          <router-link :to="{  name: 'User', params: { id: getUser.id } }">{{ getUser.name }}</router-link>
        </div>
        <div class="header__navContainer">
          <router-link to="/settings">settings</router-link>
        </div>
        <div class="header__navContainer">
          <a @click="logOut">Log out</a>
        </div>
      </template>
      <template v-else>
        <div class="header__navContainer">
          <a @click="logIn">Login</a>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
import { defineComponent, computed, reactive } from '@vue/composition-api'
import firebase from 'firebase'
// store
import userStore from '@/store/index'
// plugins
import useFirebase from '@/plugins/firebase'
// components
// import AppButton from '@/components/common/AppButton.vue'
// Router
import router from '@/router'

export default defineComponent({
  components: {
    // AppButton
  },
  setup() {
    // LocalState
    const state = reactive({
      searchContent: ''
    })

    function handleSearch() {
      if (state.searchContent != '') {
        router
          .push({
            name: 'Results',
            params: { search_query: state.searchContent }
          })
          .catch(err => {
            console.log(err.message)
          })
      }
    }
    // firebase
    const { getUser } = useFirebase()
    function logIn() {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithPopup(provider)
    }
    function logOut() {
      firebase.auth().signOut()
      router.push('/')
    }
    return {
      state,
      handleSearch,
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
  .header__search {
    width: 100%;
    flex: 1;
  }
  .header__right {
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