<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'

const inputValue = ref('')
const focusInputRef = useTemplateRef<HTMLInputElement>('focusInput')
const scrollTargetRef = useTemplateRef<HTMLDivElement>('scrollTarget')

function focusInput() {
  focusInputRef.value?.focus()
  focusInputRef.value?.select()
}

function scrollToTarget() {
  scrollTargetRef.value?.scrollIntoView({ behavior: 'smooth', block: 'center' })
}
</script>

<template>
  <section class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
    <div class="flex flex-wrap items-center justify-between gap-3">
      <div>
        <h2 class="text-lg font-semibold text-slate-900">
          DOM focus &amp; scroll
        </h2>
        <p class="mt-1 text-sm text-slate-600">
          useTemplateRef returns a DOM node so you can focus or scroll it on demand.
        </p>
      </div>
      <span
        class="
          rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold
          tracking-widest text-slate-500 uppercase
        "
      >
        DOM
      </span>
    </div>

    <div class="mt-4 flex flex-wrap items-center gap-3">
      <input
        ref="focusInput"
        v-model="inputValue"
        class="
          w-56 rounded-lg border border-slate-200 px-3 py-2 text-sm
          text-slate-800
          focus:border-slate-400 focus:outline-none
        "
        placeholder="Type then focus"
        type="text"
      >
      <button
        class="
          inline-flex items-center justify-center rounded-full bg-slate-900 px-4
          py-2 text-xs font-semibold tracking-wide text-white uppercase
          transition
          hover:bg-slate-800
        "
        type="button"
        @click="focusInput"
      >
        Focus input
      </button>
      <button
        class="
          inline-flex items-center justify-center rounded-full border
          border-slate-200 px-4 py-2 text-xs font-semibold tracking-wide
          text-slate-700 uppercase transition
          hover:border-slate-300 hover:text-slate-900
        "
        type="button"
        @click="scrollToTarget"
      >
        Scroll target
      </button>
    </div>

    <div
      class="
        mt-4 h-36 overflow-y-auto rounded-xl border border-dashed
        border-slate-200 bg-slate-50
      "
    >
      <div class="h-24" />
      <div
        ref="scrollTarget"
        class="
          mx-3 mb-3 rounded-lg bg-amber-100 px-3 py-2 text-sm font-medium
          text-amber-900
        "
      >
        Scroll target
      </div>
    </div>
  </section>
</template>
