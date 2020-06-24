import Vue from 'vue'
import firebase from 'firebase'
import { inject, reactive, onMounted } from '@vue/composition-api'

// declare module 'vue/types/vue' {
//   interface Vue {
//     $auth: firebase.auth.Auth & {
//       user: any
//       currentUser: any
//     }
//   }
// }

const config: any = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID,
}
firebase.initializeApp(config)

interface User {
  user: object | null
}
export function useFirebase(){
  const state = reactive<User>({
    user: null
  })
  function userUpdate(user: object | null){    
    state.user = user    
  }
  onMounted(() => {
    firebase.auth().onAuthStateChanged(user => {      
      userUpdate(user)      
    });
  })
}




