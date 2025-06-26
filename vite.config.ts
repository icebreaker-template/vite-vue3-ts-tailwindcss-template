import path from 'node:path'
import Tailwindcss from '@tailwindcss/vite'
import Vue from '@vitejs/plugin-vue'
import VueRouter from 'unplugin-vue-router/vite'
import { defineConfig } from 'vite'
import Layouts from 'vite-plugin-vue-layouts'

const loads = []
let t1 = 0
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [
    VueRouter(),
    Layouts(),
    Vue(),
    Tailwindcss(),
    {
      name: 'x',
      buildStart() {
        t1 = Date.now()
        loads.length = 0
      },
      load(id) {
        loads.push(id)
      },
      buildEnd() {
        console.log(Date.now() - t1, loads.length)
      },
    },
  ],
  build: {
    watch: {

    },
  },
})
