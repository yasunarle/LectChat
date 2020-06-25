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
  id: string,
  name: string,
  photoURL: string 
}
interface IFireBaseState {
  user: IUser | null
}
const state = reactive<IFireBaseState>({
  user: null,
})

export default function useFirebase(){
  // Getters
  const getUser = computed(() => state.user )
  // Mutations
  function userUpdate(user: IUser | null){
    state.user = user  
  }
  // Actions   
  function createRoom(room: any){
    if ( state.user ){
      firebase.firestore().collection('chatRooms').doc().set({
        owner_id: state.user.id, 
        created_at: new Date(), 
        room_name: room.roomName,
        description: room.description,
        genre: room.genre,
        // + should add subcollection +
      }).then( res => {
        console.log(res)
      })
    } else {
      alert('To create new room, Please Sign in')
    }
  }
  // init Auth state
  onMounted(() => {
    firebase.auth().onAuthStateChanged(user => {      
      if( user ){
        const userRef = firebase.firestore().collection('users').doc(user.uid)
        userRef.get().then( doc => {
          if( doc.exists ){            
            const userObj = {...doc.data()} as IUser
            userUpdate(userObj)
          } else {
            userRef.set({
              id: user.uid,
              name: user.displayName,
              photoURL: user.photoURL              
            })
          }
        })
      } else {
        userUpdate(null)
      }      
    });
  })
  return {
    getUser,
    createRoom
  }
}




