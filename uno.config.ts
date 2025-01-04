import { defineConfig, presetUno } from 'unocss'

export default defineConfig({
  presets: [
    // 办法单独分离出 tailwindcss 的写法和提取方式
    // https://github.com/unocss/unocss/blob/main/packages/preset-wind/src/rules/background.ts
    presetUno({

    }),
  ],
})
