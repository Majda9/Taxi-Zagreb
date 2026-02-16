import { defineConfig } from 'vite'
import { resolve } from 'path'
import fs from 'fs'

export default defineConfig({
  appType: 'mpa',
  server: {
    open: true
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        usluge: resolve(__dirname, 'usluge-i-cijene/index.html'),
        kontakti: resolve(__dirname, 'kontakti-i-rezervacije/index.html'),
      }
    }
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
