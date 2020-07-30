import firebase from 'firebase'
import { reactive, onMounted, computed } from '@vue/composition-api'
// Types
import { IUser } from 'src/types/user'

const config: any = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID
}
firebase.initializeApp(config)

// Local Types
interface IFireBaseState {
  user: IUser | null
}
type RoomParams = {
  name: string
  description: string
  genre: string
}

// Local State
const state = reactive<IFireBaseState>({
  user: null
})

export default function useFirebase() {
  //
  // Getters
  //
  const getUser = computed(() => state.user)
  //
  // Mutations
  //
  function userUpdate(user: IUser | null) {
    state.user = user
  }
  //
  // Actions 非同期
  // - Room 関係
  //
  function createRoom(roomParams: RoomParams) {
    if (state.user) {
      firebase
        .firestore()
        .collection('rooms')
        .doc()
        .set({
          title: roomParams.name,
          description: roomParams.description,
          genre: roomParams.genre,
          owner_id: state.user.id,
          owner_name: state.user.name,
          created_at: firebase.firestore.FieldValue.serverTimestamp(),
          joined_users: []
          // + should add subcollection +
        })
        .catch(err => {
          alert(err.message)
        })
    } else {
      alert('To create new room, Please Sign in')
    }
  }
  function joinRoom(roomId: string) {
    if (state.user) {
      state.user.joined_rooms.push(roomId)
      firebase
        .firestore()
        .collection('rooms')
        .doc(roomId)
        .update({
          joined_users: firebase.firestore.FieldValue.arrayUnion(state.user.id)
        })
      firebase
        .firestore()
        .collection('users')
        .doc(state.user.id)
        .update({
          joined_rooms: firebase.firestore.FieldValue.arrayUnion(roomId)
        })
    } else {
      alert('ログインしてね')
    }
  }
  function leaveRoom(roomId: string) {
    if (state.user) {
      const index = state.user.joined_rooms.indexOf(roomId)
      state.user.joined_rooms.splice(index, 1)

      firebase
        .firestore()
        .collection('rooms')
        .doc(roomId)
        .update({
          joined_users: firebase.firestore.FieldValue.arrayRemove(state.user.id)
        })
      firebase
        .firestore()
        .collection('users')
        .doc(state.user.id)
        .update({
          joined_rooms: firebase.firestore.FieldValue.arrayRemove(roomId)
        })
      state.user.joined_rooms
    } else {
      alert('ログインしてね')
    }
  }
  function postTranScript(roomId: string, content: string) {
    if (state.user) {
      firebase
        .firestore()
        .collection('rooms')
        .doc(roomId)
        .collection('transcripts')
        .add({
          poster_id: state.user.id,
          poster_name: state.user.name,
          created_at: firebase.firestore.FieldValue.serverTimestamp(),
          // Params
          content: content
        })
        .then(res => {
          console.log(res)
        })
    } else {
      alert('To chat in a room, Please Sign in')
    }
  }
  // init Auth state
  onMounted(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const userRef = firebase
          .firestore()
          .collection('users')
          .doc(user.uid)
        userRef.get().then(doc => {
          if (doc.exists) {
            const userObj = { ...doc.data() } as IUser
            userUpdate(userObj)
          } else {
            userRef.set({
              id: user.uid,
              name: user.displayName,
              photoURL: user.photoURL,
              created_rooms: [],
              joined_rooms: []
            })
          }
        })
      } else {
        userUpdate(null)
      }
    })
  })
  return {
    getUser,
    createRoom,
    joinRoom,
    postTranScript,
    leaveRoom
  }
}
