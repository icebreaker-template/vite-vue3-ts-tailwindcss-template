<script setup lang="ts">
import ConditionalRefExample from './template-ref/ConditionalRefExample.vue'
import DomFocusExample from './template-ref/DomFocusExample.vue'
import ExposeChildExample from './template-ref/ExposeChildExample.vue'
import ListRefsExample from './template-ref/ListRefsExample.vue'
import MeasureBoxExample from './template-ref/MeasureBoxExample.vue'
</script>

<template>
  <section class="mx-auto max-w-4xl space-y-8 px-6">
    <header class="space-y-2">
      <p class="text-xs font-semibold tracking-[0.2em] text-slate-400 uppercase">
        Vue 3.5
      </p>
      <h1 class="text-3xl font-semibold text-slate-900">
        useTemplateRef examples
      </h1>
      <p class="text-sm text-slate-600">
        Each card shows a focused pattern with a template ref and guarded handlers.
      </p>
      <RouterLink
        class="
          inline-flex items-center gap-2 text-sm font-medium text-slate-900
          underline decoration-slate-300 underline-offset-4
          hover:decoration-slate-500
        "
        to="/"
      >
        Back to home
      </RouterLink>
    </header>

    <DomFocusExample />
    <MeasureBoxExample />
    <ExposeChildExample />
    <ListRefsExample />
    <ConditionalRefExample />
  </section>
</template>
