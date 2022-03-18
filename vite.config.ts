import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Pages from 'vite-plugin-pages'
// import { VitePWA } from 'vite-plugin-pwa'

import Unocss from 'unocss/vite'


// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
      '@': path.resolve(__dirname, './src')
    }
  },
  // optimizeDeps: {
  //   esbuildOptions: {
  //     target: 'es2020'
  //   }
  // },
  build: {
    assetsInlineLimit: 0
  },
  // base: './',
  plugins: [
    vue(),
    Pages(),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        '@vueuse/head'
      ],
      eslintrc: {
        enabled: true,
        filepath: './.eslintrc-auto-import.json',
        globalsPropValue: true
      },
      dts: 'src/auto-imports.d.ts'
    }),
    Components({
      dts: 'src/components.d.ts'
    }),
    Unocss({
      theme: {
        colors: {
          dark: '#171717',
          light: '#F2F2F2',
          grey: '#C0C0C0',
          core: '#D32753'
        },
        fontFamily: {
          sans: ['Kanit', 'sans-serif'],
          serif: ['Playfair Display', 'serif']
        }
      },
      rules: [
        ['h-screen-1/2', {
          height: '50vh'
        }]
      ],
      shortcuts: {
        'projectYear': 'text-2xl italic',
        'textContentHeader': 'text-5xl font-bold font-semibold mb-2',
        'textContentBody': 'text-xl',
        'navbarLinks': 'text-lg text-light no-underline uppercase hover:text-core',
        'h1': 'font-bold text-5xl lg:text-8xl',
        'h2': 'font-bold text-5xl lg:text-6xl mb-4 font-serif',
        'h3': 'font-bold text-2xl uppercase color-grey',
        'h4': 'font-semibold text-lg font-serif',
        'h5': 'font-semibold text-base uppercase color-grey',
        'body': 'text-lg',
        'divider': 'h-1px bg-grey my-2 opacity-20'
      }
    })
  ]
})
