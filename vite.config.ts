import path from 'node:path'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import Tailwindcss from '@tailwindcss/vite'
import Vue from '@vitejs/plugin-vue'
import VueRouter from 'unplugin-vue-router/vite'
import { defineConfig } from 'vite'
import Layouts from 'vite-plugin-vue-layouts'

function r(p: string) {
  return path.relative(__dirname, p)
}
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [
    VueRouter({

    }),
    Layouts(),
    Vue(),
    Tailwindcss(),
    VueI18nPlugin({

    }),
    {
      name: 'x',
      resolveId(source, importer, options) {
        console.log('resolveId', source)
      },
      load(id, options) {
        console.log('load', r(id))
      },
      transform(code, id, options) {
        console.log('transform', r(id))
      },
    },
  ],
  css: {
    preprocessorOptions: {
      scss: {

      },
    },
  },
})
