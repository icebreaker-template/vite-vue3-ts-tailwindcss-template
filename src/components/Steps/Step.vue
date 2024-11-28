<script setup lang="ts">
import type { StepperItemProps } from 'radix-vue'
import { StepperDescription, StepperIndicator, StepperItem, StepperSeparator, StepperTitle, StepperTrigger } from '@/components/ui/stepper'
import { getCurrentInstance, type HTMLAttributes, inject, reactive, type Ref } from 'vue'

defineOptions({
  name: 'IceStep',
})
const props = defineProps<StepperItemProps & { class?: HTMLAttributes['class'] }>()
const currentInstance = getCurrentInstance()
export interface IStepsProps {

}

export interface StepItemState {
  uid: number
}

export interface IStepsInject {
  props: IStepsProps
  steps: Ref<StepItemState[]>
  addStep: (item: StepItemState) => void
  removeStep: (uid: number) => void
}

const parent = inject('IceSteps') as IStepsInject

const stepItemState = reactive({
  uid: currentInstance!.uid,
})

parent.addStep(stepItemState)
</script>

<template>
  <StepperItem :class="props.class" :step="props.step">
    <StepperTrigger>
      <StepperIndicator>
        <slot name="dot">
          <div class="bg-red-600 w-4 h-4" />
        </slot>
      </StepperIndicator>
      <div class="flex flex-col">
        <StepperTitle>
          title
        </StepperTitle>
        <StepperDescription>
          description
        </StepperDescription>
      </div>
    </StepperTrigger>
    <StepperSeparator class="w-full h-px" />
  </StepperItem>
</template>

<style scoped></style>
