import { defineConfig } from 'vite'
import { resolve } from 'path'
import fs from 'fs'

export default defineConfig({
  appType: 'mpa',
  server: {
    open: true
  },
  plugins: [
    {
      name: 'clean-urls',
      enforce: 'pre',
      configureServer(server) {
        return () => {
          server.middlewares.use((req, res, next) => {
            const url = req.url.split('?')[0]
            if (!url.endsWith('/') && !url.includes('.')) {
              const filePath = resolve(__dirname, '.' + url, 'index.html')
              if (fs.existsSync(filePath)) {
                req.url = url + '/index.html'
              }
            }
            next()
          })
        }
      }
    }
  ]
})
