<script setup lang="ts">
import { useStore } from '@/store'
import { useI18n } from 'vue-i18n'
import { RouterView } from 'vue-router'

const { t } = useI18n()
const store = useStore()

function toggle() {
  if (store.i18n.global.locale === 'en') {
    store.i18n.global.locale = 'zh'
  }
  else {
    store.i18n.global.locale = 'en'
  }
}
</script>

<template>
  <div class="container mx-auto">
    {{ t('title') }}
    <button
      @click="toggle"
    >
      toggle
    </button>
    <RouterView />
  </div>
</template>
