import firebase from 'firebase'
import { reactive, onMounted, computed } from '@vue/composition-api'

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

interface IUser {
  user: object | null
}

const state = reactive<IUser>({
  user: null
})

export default function useFirebase(){
  // Getters
  const getUser = computed(() => state.user )
  // Mutations
  function userUpdate(user: object | null){    
    state.user = user  
  }
  // Actions 
  // init Auth state
  onMounted(() => {
    firebase.auth().onAuthStateChanged(user => {      
      userUpdate(user)      
    });
  })
  return {
    getUser
  }
}




