import { defineStore } from 'pinia'
import { createI18n } from 'vue-i18n'

export const i18n = createI18n({
  legacy: false,
  locale: 'zh',
  fallbackLocale: 'en',
  messages: {
    zh: {
      title: '你好',
    },
    en: {
      title: 'hello',
    },
  },
})

export const useStore = defineStore('system', {
  state() {
    return {
      i18n,
    }
  },
})
