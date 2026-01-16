<script setup lang="ts">
import { computed, ref, useTemplateRef } from 'vue'

const items = ref(['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta'])
const itemRefs = useTemplateRef<HTMLLIElement[]>('item')
const activeIndex = ref<number | null>(null)

const refCount = computed(() => (Array.isArray(itemRefs.value) ? itemRefs.value.length : 0))

function scrollToIndex(index: number) {
  const nodes = itemRefs.value
  if (!Array.isArray(nodes) || !nodes[index]) { return }

  activeIndex.value = index
  nodes[index].scrollIntoView({ behavior: 'smooth', block: 'nearest' })
}

function scrollLast() {
  scrollToIndex(items.value.length - 1)
}

function addItem() {
  items.value.push(`Item ${items.value.length + 1}`)
}
</script>

<template>
  <section class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
    <div class="flex flex-wrap items-center justify-between gap-3">
      <div>
        <h2 class="text-lg font-semibold text-slate-900">
          v-for list refs
        </h2>
        <p class="mt-1 text-sm text-slate-600">
          Refs collected from a list are returned as an array.
        </p>
      </div>
      <span
        class="
          rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold
          tracking-widest text-slate-500 uppercase
        "
      >
        List
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
        @click="scrollLast"
      >
        Scroll last
      </button>
      <button
        class="
          inline-flex items-center justify-center rounded-full border
          border-slate-200 px-4 py-2 text-xs font-semibold tracking-wide
          text-slate-700 uppercase transition
          hover:border-slate-300 hover:text-slate-900
        "
        type="button"
        @click="() => scrollToIndex(2)"
      >
        Scroll item 3
      </button>
      <button
        class="
          inline-flex items-center justify-center rounded-full border
          border-slate-200 px-4 py-2 text-xs font-semibold tracking-wide
          text-slate-700 uppercase transition
          hover:border-slate-300 hover:text-slate-900
        "
        type="button"
        @click="addItem"
      >
        Add item
      </button>
      <span class="text-xs text-slate-500">Ref count: {{ refCount }}</span>
    </div>

    <ul
      class="
        mt-4 max-h-40 space-y-2 overflow-y-auto rounded-xl border border-dashed
        border-slate-200 bg-slate-50 p-3
      "
    >
      <li
        v-for="(item, index) in items"
        :key="item"
        ref="item"
        class="rounded-lg px-3 py-2 text-sm transition"
        :class="activeIndex === index
          ? 'bg-sky-100 text-sky-900'
          : 'bg-white text-slate-700'"
      >
        {{ item }}
      </li>
    </ul>
  </section>
</template>
