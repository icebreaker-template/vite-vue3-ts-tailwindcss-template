<script setup lang="ts">
import { computed, ref, useTemplateRef } from 'vue'

const showPanel = ref(true)
const panelRef = useTemplateRef<HTMLDivElement>('panel')
const lastCheck = ref('')

const refStatus = computed(() => (panelRef.value ? 'mounted' : 'null'))

function togglePanel() {
  showPanel.value = !showPanel.value
}

function pingPanel() {
  lastCheck.value = panelRef.value ? 'Panel ref is available.' : 'Panel ref is null.'
  panelRef.value?.scrollIntoView({ behavior: 'smooth', block: 'center' })
}
</script>

<template>
  <section class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
    <div class="flex flex-wrap items-center justify-between gap-3">
      <div>
        <h2 class="text-lg font-semibold text-slate-900">
          v-if conditional ref
        </h2>
        <p class="mt-1 text-sm text-slate-600">
          The ref becomes null when the element is unmounted.
        </p>
      </div>
      <span
        class="
          rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold
          tracking-widest text-slate-500 uppercase
        "
      >
        v-if
      </span>
    </div>

    <div class="mt-4 flex flex-wrap items-center gap-3">
      <button
        class="
          inline-flex items-center justify-center rounded-full bg-slate-900 px-4
          py-2 text-xs font-semibold tracking-wide text-white uppercase
          transition
          hover:bg-slate-800
        "
        type="button"
        @click="togglePanel"
      >
        {{ showPanel ? 'Hide panel' : 'Show panel' }}
      </button>
      <button
        class="
          inline-flex items-center justify-center rounded-full border
          border-slate-200 px-4 py-2 text-xs font-semibold tracking-wide
          text-slate-700 uppercase transition
          hover:border-slate-300 hover:text-slate-900
        "
        type="button"
        @click="pingPanel"
      >
        Ping panel
      </button>
      <span class="text-xs text-slate-500">Ref: {{ refStatus }}</span>
    </div>

    <div class="mt-4">
      <div
        v-if="showPanel"
        ref="panel"
        class="
          rounded-xl border border-slate-200 bg-lime-50 px-4 py-3 text-sm
          text-lime-900
        "
      >
        This panel is mounted. Toggle it off to see the ref become null.
      </div>
      <div
        v-else
        class="
          rounded-xl border border-dashed border-slate-200 px-4 py-3 text-xs
          text-slate-500
        "
      >
        Panel is unmounted, so the template ref is null.
      </div>
    </div>

    <p v-if="lastCheck" class="mt-2 text-xs text-slate-500">
      Last check: {{ lastCheck }}
    </p>
  </section>
</template>
