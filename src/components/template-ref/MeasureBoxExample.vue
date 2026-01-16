<script setup lang="ts">
import { nextTick, onMounted, ref, useTemplateRef, watch } from 'vue'

const width = ref(220)
const size = ref({ width: 0, height: 0 })
const boxRef = useTemplateRef<HTMLDivElement>('box')

function measure() {
  const rect = boxRef.value?.getBoundingClientRect()
  if (!rect) { return }

  size.value = {
    width: Math.round(rect.width),
    height: Math.round(rect.height),
  }
}

async function scheduleMeasure() {
  await nextTick()
  measure()
}

watch(width, scheduleMeasure)
onMounted(measure)
</script>

<template>
  <section class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
    <div class="flex flex-wrap items-center justify-between gap-3">
      <div>
        <h2 class="text-lg font-semibold text-slate-900">
          Measure a box
        </h2>
        <p class="mt-1 text-sm text-slate-600">
          Read getBoundingClientRect after mount and when the width changes.
        </p>
      </div>
      <span
        class="
          rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold
          tracking-widest text-slate-500 uppercase
        "
      >
        Layout
      </span>
    </div>

    <div class="mt-4 flex flex-wrap items-center gap-4">
      <label
        class="text-xs font-semibold tracking-widest text-slate-500 uppercase"
      >
        Width
        <span class="ml-2 text-sm font-semibold text-slate-900">{{ width }}px</span>
      </label>
      <input
        v-model.number="width"
        class="w-56 accent-slate-900"
        max="360"
        min="140"
        step="10"
        type="range"
      >
      <button
        class="
          inline-flex items-center justify-center rounded-full border
          border-slate-200 px-4 py-2 text-xs font-semibold tracking-wide
          text-slate-700 uppercase transition
          hover:border-slate-300 hover:text-slate-900
        "
        type="button"
        @click="measure"
      >
        Re-measure
      </button>
    </div>

    <div
      ref="box"
      class="mt-4 h-24 rounded-xl border border-slate-200 bg-sky-100"
      :style="{ width: `${width}px` }"
    />

    <div class="mt-3 text-xs text-slate-500">
      Measured size: <span class="font-semibold text-slate-700">{{ size.width }}px</span> x
      <span class="font-semibold text-slate-700">{{ size.height }}px</span>
    </div>
  </section>
</template>
