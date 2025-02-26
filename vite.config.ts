import path from 'node:path'
import Tailwindcss from '@tailwindcss/vite'
import Vue from '@vitejs/plugin-vue'
import { parse } from '@vue/compiler-dom'
import VueRouter from 'unplugin-vue-router/vite'
import { defineConfig } from 'vite'
import Layouts from 'vite-plugin-vue-layouts'
import replaceImgWithIceImage from './replaceImgWithIceImage'
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [
    {
      name: 'x',
      enforce: 'pre', // 在解析前处理
      transform(code, id, options) {
        if (!/\.(?:vue|jsx|tsx)$/.test(id)) {
          return
        }
        const ast = parse(code)
        console.log(ast)
      },
    },
    // replaceImgWithIceImage(),
    VueRouter({

    }),
    Layouts(),
    Vue(),
    Tailwindcss(),
  ],
  css: {
    preprocessorOptions: {
      scss: {

      },
    },
  },
})
