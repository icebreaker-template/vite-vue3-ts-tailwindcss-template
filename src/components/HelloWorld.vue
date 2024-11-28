<script setup lang="ts">
import { BookUser, Check, CreditCard, Truck } from 'lucide-vue-next'

import { Step, Steps } from './Steps'

const steps = [{
  step: 1,
  title: 'Address',
  description: 'Add your address here',
  icon: BookUser,
}, {
  step: 2,
  title: 'Shipping',
  description: 'Set your preferred shipping method',
  icon: Truck,
}, {
  step: 3,
  title: 'Payment',
  description: 'Add any payment information you have',
  icon: CreditCard,
}, {
  step: 4,
  title: 'Checkout',
  description: 'Confirm your order',
  icon: Check,
}]
</script>

<template>
  <Steps>
    <Step
      v-for="item in steps"
      :key="item.step"
      class="basis-1/4"
      :step="item.step"
    />
  </Steps>
  <Steps orientation="vertical" class="mx-auto flex w-full max-w-md flex-col justify-start gap-10">
    <Step
      v-for="item in steps"
      :key="item.step"
      class="basis-1/4"
      :step="item.step"
    />
  </Steps>
</template>
