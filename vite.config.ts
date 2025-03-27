import path from 'node:path'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import Tailwindcss from '@tailwindcss/vite'
import Vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import VueRouter from 'unplugin-vue-router/vite'
import { defineConfig, loadEnv } from 'vite'
import Layouts from 'vite-plugin-vue-layouts'

const { STS } = require('ali-oss')
// import { STS } from 'ali-oss'

const ENV = loadEnv('development', process.cwd())
console.log(ENV)
// 配置环境变量ALIBABA_CLOUD_ACCESS_KEY_ID。
const accessKeyId = ENV.ALIBABA_CLOUD_ACCESS_KEY_ID;
// 配置环境变量ALIBABA_CLOUD_ACCESS_SECRET。
const accessKeySecret = ENV.ALIBABA_CLOUD_ACCESS_SECRET;
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
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    {
      name: 'oss-sts',
      configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
          if (req.url === '/api/sts') {
            let sts = new STS({
              accessKeyId: accessKeyId,
              accessKeySecret: accessKeySecret
            });
            const result = await sts.assumeRole('acs:ram::1234567890123456:role/test', 'test', 3600)

            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({
              accessKeyId: 'test',
              accessKeySecret: 'test',
              stsToken: 'test',
              expiration: 'test',
            }))
          }
        })
      }
    }
  ],
  css: {
    preprocessorOptions: {
      scss: { api: 'modern-compiler' },
    },
  },
})
