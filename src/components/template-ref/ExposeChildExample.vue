<script setup lang="ts">
import { useTemplateRef } from 'vue'
import ExposeChildPanel from './ExposeChildPanel.vue'

interface PanelExpose {
  focusInput: () => void
  reset: () => void
}

const panelRef = useTemplateRef<PanelExpose>('panel')

function focusChild() {
  panelRef.value?.focusInput()
}

function resetChild() {
  panelRef.value?.reset()
}
</script>

<template>
  <section class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
    <div class="flex flex-wrap items-center justify-between gap-3">
      <div>
        <h2 class="text-lg font-semibold text-slate-900">
          Component ref + defineExpose
        </h2>
        <p class="mt-1 text-sm text-slate-600">
          The parent calls methods exposed by the child component instance.
        </p>
      </div>
      <span
        class="
          rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold
          tracking-widest text-slate-500 uppercase
        "
      >
        Component
      </span>
    </div>

    <div
      class="
        mt-4 grid gap-4
        md:grid-cols-[1fr_auto]
      "
    >
      <ExposeChildPanel ref="panel" />
      <div class="flex flex-col gap-3">
        <button
          class="
            inline-flex items-center justify-center rounded-full bg-slate-900
            px-4 py-2 text-xs font-semibold tracking-wide text-white uppercase
            transition
            hover:bg-slate-800
          "
          type="button"
          @click="focusChild"
        >
          Focus child input
        </button>
        <button
          class="
            inline-flex items-center justify-center rounded-full border
            border-slate-200 px-4 py-2 text-xs font-semibold tracking-wide
            text-slate-700 uppercase transition
            hover:border-slate-300 hover:text-slate-900
          "
          type="button"
          @click="resetChild"
        >
          Reset child
        </button>
      </div>
    </div>
  </section>
</template>
