import { reactive, computed } from '@vue/composition-api';
import Vue from 'vue'
import CompositionApi from '@vue/composition-api'
Vue.use(CompositionApi)
interface ITest { 
  test: string
  user: {
    name: string
    id: string
  }
}
const state = reactive<ITest>({
  test: 'testify',
  user:{
    name: 'yasunari',
    id: 'u7df25c588m737'
  }
})
export default function userStore() {
  // getter
  const getTest = computed(() => state.test )
  // setter
  function setTest(test: string){
    state.test = test
  }
  return {    
    getTest,
    setTest
  }
}

export type userStore = ReturnType<typeof userStore>;