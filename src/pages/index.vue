<script setup lang="ts">
import HelloWorld from '@/components/HelloWorld.vue';
</script>

<template>
  <h1>你好 WOrld</h1>
  <!-- 主题颜色背景 -->
  <header class="custom-header">
    @layer 示例展示
  </header>

  <main class="flex-center p-4">
    <div class="card">
      <h2 class="text-center">
        欢迎来到 CSS @layer 示例
      </h2>
      <p>
        这个示例展示了如何使用 <code>@layer</code> 组织 CSS 代码，使其更结构化、更易于维护。
      </p>

      <!-- 按钮组 -->
      <div class="flex-center mt-4">
        <button class="btn-primary">
          主要按钮
        </button>
        <button class="btn-secondary ml-4">
          次要按钮
        </button>
      </div>
    </div>
  </main>

  <!-- 另一张卡片 -->
  <section class="p-4">
    <div class="card">
      <h3>使用 @layer 的好处</h3>
      <ul>
        <li>清晰的分层，提高可读性</li>
        <li>避免样式冲突，增强维护性</li>
        <li>可以轻松地自定义主题</li>
        <li>提高复用性，减少重复代码</li>
      </ul>
    </div>
  </section>
  <HelloWorld></HelloWorld>
</template>
