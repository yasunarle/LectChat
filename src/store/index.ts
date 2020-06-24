import { reactive } from '@vue/composition-api';

interface IUser {
  user: {
    name: string
    id: string
  }
}
export default function userStore() {
  const state = reactive<IUser>({
    user:{
      name: 'yasunari',
      id: 'u7df25c588m737'
    }
  })
  const setUserFireStore = async () => {
    console.log('test')
  }

  return {    
    get userName() {
      return state.user.name;
    },
    setUserFireStore
    // increment() {
    //   state.count += 1;
    // },
  }
}

export type userStore = ReturnType<typeof userStore>;