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
        usluge: resolve(__dirname, 'usluge/index.html'),
        oNama: resolve(__dirname, 'o-nama/index.html'),
        kontakti: resolve(__dirname, 'kontakti-i-rezervacije/index.html'),
        enHome: resolve(__dirname, 'en/index.html'),
        enServices: resolve(__dirname, 'en/services/index.html'),
        enAbout: resolve(__dirname, 'en/about/index.html'),
        enContact: resolve(__dirname, 'en/contact/index.html'),
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
