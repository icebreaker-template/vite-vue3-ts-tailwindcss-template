import { ref, watch } from 'vue'

export const isDarkMode = ref(false)

watch(() => isDarkMode.value, (value) => {
  if (value) {
    document.documentElement.classList.add('dark')
  }
  else {
    document.documentElement.classList.remove('dark')
  }
}, {
  immediate: true,
})
