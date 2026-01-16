<script setup lang="ts">

</script>

<template>
  <div class="space-y-4 bg-amber-50 p-6">
    <div class="aaa bg-amber-500">
      aaa
    </div>
    <RouterLink
      class="
        inline-flex items-center gap-2 rounded-full border border-amber-300
        bg-white px-4 py-2 text-sm font-semibold text-amber-900 shadow-sm
        transition
        hover:border-amber-400
      "
      to="/template-ref"
    >
      useTemplateRef examples
    </RouterLink>
  </div>
</template>

<style>
.aaa {
  width: 100px;
  width: calc(var(--xxx) * 99);
}
</style>
