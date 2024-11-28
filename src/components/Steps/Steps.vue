<script setup lang="ts">
import type { StepperRootProps } from 'radix-vue'
import { Stepper } from '@/components/ui/stepper'
import { useOrderedChildren } from '@/hooks/useOrderedChildren'
import { getCurrentInstance, type HTMLAttributes, provide } from 'vue'

defineOptions({
  name: 'IceSteps',
})

const props = defineProps<StepperRootProps & { class?: HTMLAttributes['class'] }>()

const { children: steps, addChild: addStep, removeChild: removeStep } = useOrderedChildren(getCurrentInstance()!, 'IceStep')

provide('IceSteps', { props, steps, addStep, removeStep })
</script>

<template>
  <Stepper v-bind="props">
    <slot />
  </Stepper>
</template>

<style scoped>

</style>
