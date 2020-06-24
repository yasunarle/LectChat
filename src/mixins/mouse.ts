import { ref, onMounted, onUnmounted } from '@vue/composition-api'

export function useMousePosition() {
  const x = ref<number>(0)
  const y = ref<number>(0)

  function update(e: any) {
    x.value = e.pageX
    y.value = e.pageY
  }

  onMounted(() => {
    window.addEventListener('mousemove', update)
  })

  onUnmounted(() => {
    window.removeEventListener('mousemove', update)
  })

  return { x, y }
}