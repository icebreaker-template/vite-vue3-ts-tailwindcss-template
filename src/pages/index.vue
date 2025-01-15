<script setup lang="ts">
import { Dropdown, vClosePopper } from 'floating-vue'
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold underline">
      Hello world!
    </h1>
    <Dropdown
      :distance="6"
    >
      <!-- This will be the popover reference (for the events and position) -->
      <button>Click me</button>

      <!-- This will be the content of the popover -->
      <template #popper>
        <div class="p-4">
          <div>额sad sad sad sad爱上爱上爱上</div>
        </div>
      </template>
    </Dropdown>
  </div>
</template>
