<script setup lang="ts">
import IceForm from '../components/IceForm.vue'
import IceFormItem from '../components/IceFormItem.vue'
</script>

<template>
  <div class="container mx-auto">
    <IceForm class="border grid gap-6 p-4">
      <IceFormItem name="1">
        <input type="text">
      </IceFormItem>
      <IceFormItem name="2">
        <input type="text">
      </IceFormItem>
      <IceFormItem name="3">
        <input type="text">
      </IceFormItem>
      <IceFormItem name="4">
        <IceForm>
          <IceFormItem name="1">
            <input type="text">
          </IceFormItem>
          <IceFormItem name="1">
            <input type="text">
          </IceFormItem>
          <IceFormItem name="1">
            <input type="text">
          </IceFormItem>
        </IceForm>
      </IceFormItem>
      <button type="submit">
        Submit
      </button>
    </IceForm>
  </div>
</template>
