<script setup lang="ts">

</script>

<template>
  <div class="bg-amber-50 ppp">
    ppp
    <div class="aaa">
      aaa
    </div>
  </div>
  <div class="bg-blue-100 ppp sm">
    ppp
    <div class="aaa">
      aaa
    </div>
  </div>
</template>

<style>
.ppp {
  color: red;

  .aaa {
    color: blue;
    font-size: 50px;
  }

  & {
    font-size: 100px;
  }

  &.sm {
    font-size: 50px;
  }
}
</style>
