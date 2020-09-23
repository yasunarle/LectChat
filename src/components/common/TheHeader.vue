<template>
  <div class="header">
    <div class="header__logo header__left">
      <div class="app__logo">
        <router-link to="/">Lect</router-link>
      </div>
    </div>
    <div class="search">
      <div class="search__content">
        <input
          type="text"
          class="search__input"
          v-model="state.searchContent"
          placeholder="検索..."
        />
        <button @click="handleSearch" class="search__btn">
          <font-awesome-icon icon="search" />
        </button>
      </div>
    </div>
    <div class="header__right">
      <template v-if="getUser">
        <div class="header__navContainer">
          <router-link :to="{ name: 'User', params: { id: getUser.id } }">
            <img :src="getUser.photoURL" alt="" />
          </router-link>
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
      searchContent: '',
    })

    function handleSearch() {
      if (state.searchContent != '') {
        router
          .push({
            name: 'Results',
            params: { search_query: state.searchContent },
          })
          .catch((err) => {
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
      logOut,
    }
  },
})
</script>
<style lang="scss">
.header {
  height: 60px;
  width: 100%;
  border-bottom: 2px solid #16161a;
  display: flex;
  flex-direction: row;
  background: #242629;
  .header__logo {
    margin: 10px 20px;
  }
  .search {
    width: 100%;
    flex: 1;
    .search__content {
      max-width: 600px;
      height: 100%;
      padding: 16px;
      margin: auto;
      // background: #4f5959;
      .search__input {
        height: 100%;
        padding: 14px 16px;
        background: #16161a;
        color: #fffffe;
        font-size: 18px;
        border: 1px solid #94a1b2;
      }
      .search__btn {
        padding: 8px 14px;
        margin-left: 10px;
        background: #7f5af0;
        border: none;
        color: #16161a;
      }
    }
  }
}
.header__right {
  .header__navContainer {
    padding-right: 16px;
    background: white;
    a {
      // vue-router
      text-decoration: none;
      color: #fffffe;
      cursor: pointer;
      img {
        width: 46px;
        border-radius: 50%;
        border: 2px solid #2ea6ff;
      }
    }
    a:hover {
      color: #7f5af0;
    }
  }
}
</style>
