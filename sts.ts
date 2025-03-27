import { Plugin } from 'vite'

export function sts(): Plugin {
  return {
    name: 'vite-plugin-sts',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url === '/sts') {
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({
            accessKeyId: 'yourAccessKeyId',
            accessKeySecret: 'yourAccessKeySecret',
          }))
        }
      })
    }
  }
}