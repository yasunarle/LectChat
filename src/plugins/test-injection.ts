import Vue from 'vue'
import VueCompositionApi from '@vue/composition-api'
import { inject, provide } from '@vue/composition-api'
import { defineComponent, reactive, computed } from '@vue/composition-api'

Vue.use(VueCompositionApi)

function createContext(contextName = '') {
  const contextKey = Symbol(contextName) // Reflect.ownKeys をサポートしていない環境もサポートする場合はuuid生成のライブラリをベースにkeyの構築をする方が良いかも

  return [
    contextValue => provide(contextKey, contextValue), // useSharedCounterProvider
    () => inject(contextKey) // useSharedCounter
  ]
}

const [useSharedCounterProvider, useSharedCounter] = createContext(
  'SharedCounter'
)

function useCounter(initial = 0) {
  const state = reactive({ count: initial })
  return {
    count: computed(() => state.count),
    set: count => {
      state.count = count
    },
    inc: () => {
      state.count++
    },
    dec: () => {
      state.count--
    }
  }
}

const providerComponentFactory = (providerHooks, providerName = '') =>
  defineComponent({
    template: '<div><slot/></div>', // Vue 3.xではfragmentが使える
    name: providerName,
    setup() {
      useSharedCounterProvider(providerHooks())
    }
  })

const SharedCounterProvider = providerComponentFactory(
  useCounter,
  'SharedCounterProvider'
)

const SampleInjectCounter = defineComponent({
  template: `
<div>
  <div>count: {{ count }}</div>
  <button @click="inc">inc</button>
  <button @click="dec">dec</button>
</div>
  `,
  name: 'SampleInjectCounter',
  setup() {
    return useSharedCounter()
  }
})

new Vue({
  components: {
    SharedCounterProvider,
    SampleInjectCounter
  },
  template: `
<shared-counter-provider>
  <sample-inject-counter/>
  <sample-inject-counter/>
  <shared-counter-provider>
    <sample-inject-counter/>
  </shared-counter-provider>
</shared-counter-provider>
  `,
  name: 'SampleApp'
}).$mount('#app')
