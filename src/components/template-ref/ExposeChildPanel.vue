<script setup lang="ts">
import { defineExpose, ref, useTemplateRef } from 'vue'

const value = ref('')
const inputRef = useTemplateRef<HTMLInputElement>('childInput')

function focusInput() {
  inputRef.value?.focus()
}

function reset() {
  value.value = ''
  focusInput()
}

defineExpose({ focusInput, reset })
</script>

<template>
  <div class="rounded-xl border border-slate-200 bg-slate-50 p-4">
    <label
      class="text-xs font-semibold tracking-widest text-slate-500 uppercase"
    >Child input</label>
    <input
      ref="childInput"
      v-model="value"
      class="
        mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2
        text-sm text-slate-800
        focus:border-slate-400 focus:outline-none
      "
      placeholder="Type inside child"
      type="text"
    >
    <p class="mt-2 text-xs text-slate-500">
      Current value: <span class="font-semibold text-slate-700">{{ value || 'empty' }}</span>
    </p>
  </div>
</template>
