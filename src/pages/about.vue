<script setup lang="ts">
import HelloWorld from '@/components/HelloWorld.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold underline">
      About
    </h1>
    <div>
      {{ t('hello') }}
    </div>
    <HelloWorld msg="About" />
  </div>
</template>

<i18n lang="json">
{
  "en": {
    "language": "Language",
    "hello": "hello, world!"
  },
  "zh": {
    "language": "言語",
    "hello": "こんにちは、世d sa d sa界！"
  }
}
</i18n>
