<template>
  <div class="settings">
    <div class="settings__content">
      <h1>settings</h1>
      <div v-if="getIsProcessing">
        <h1>読み込み中</h1>
      </div>
      <div v-else>
        <div v-if="getUser">
          <h3>ユーザネーム:</h3>
          <input type="text" v-model="getUser.name" />
          <h3>ひとこと:</h3>
          <input type="text" v-model="getUser.description" />
          <h2>images</h2>
          <div class="settings__avatar">
            <template v-if="!getUser.photoURL == ''">
              <img :src="getUser.photoURL" alt="avatar image" height="100%" />
            </template>
            <template v-else>
              <img
                src="../assets/no-avatar.png"
                alt="avatar image"
                height="100%"
              />
            </template>
            <input
              type="file"
              style="display: none"
              ref="avatarImg"
              @change="onUploadAvater"
            />
            <div class="settings__editBtn" @click="hanldeAvatar">
              <font-awesome-icon icon="pen" class="font" />
            </div>
          </div>
          <div>
            <button class="app__btn">編集を保存</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  reactive,
  watchEffect,
  ref
} from '@vue/composition-api'
import router from '@/router'
import useFirebase, { db, storage } from '../plugins/firebase'

export default defineComponent({
  setup(_, ctx) {
    const state = reactive({
      isLoggedIn: true
      // avatar: {
      //   imageData: null
      // }
    })
    const avatarImg = ref(null)
    const { getUser, getIsProcessing, updatePhotoURL } = useFirebase()
    function hanldeAvatar() {
      avatarImg.value.click()
    }
    function onUploadAvater(event: any) {
      const file = event.target.files[0]
      if (getUser.value) {
        const storageRef = storage.ref('images/' + getUser.value.id + '.png')
        storageRef.put(file).then(() => {
          storageRef.getDownloadURL().then(url => {
            updatePhotoURL(url)
          })
        })
      }
    }
    // onMounted
    onMounted(() => {
      setTimeout(() => {
        if (!getUser.value) {
          router.push('/')
        }
      }, 1000)
    })
    return {
      getUser,
      getIsProcessing,
      hanldeAvatar,
      avatarImg,
      onUploadAvater
    }
  }
})
</script>
<style lang="scss">
.settings {
  width: 100%;
  min-height: 600px;
  .settings__content {
    max-width: 700px;
    margin: 0px auto;
    input {
      width: 100%;
      padding: 10px;
    }
    .settings__avatar {
      width: 100px;
      height: 100px;
      // background-image: url('../assets/no-avatar.png');
      position: relative;
      border: 1px solid black;
      border-radius: 20px;
      overflow: hidden;
      .settings__editBtn {
        position: absolute;
        bottom: 4px;
        right: 4px;
        width: 30px;
        height: 30px;
        background: white;
        border: 1px solid #2ea6ff;
        border-radius: 50%;
        .font {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
    }
  }
}
</style>
