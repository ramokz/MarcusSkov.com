import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Pages from 'vite-plugin-pages'
import { VitePWA } from 'vite-plugin-pwa'

import Unocss from 'unocss/vite'


// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			'~/': `${path.resolve(__dirname, 'src')}/`
		}
	},
	plugins: [
		vue(),
		Pages({
		}),
		VitePWA(),
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
					core: '#D32753'
				},
				fontFamily: {
					sans: ['Kanit', 'sans-serif']
				}
			},
			shortcuts: {
				'projectTitle': 'text-5xl lg:text-6xl text-light uppercase font-bold no-underline',
				'projectYear': 'text-2xl italic',
				'textContentHeader': 'text-5xl font-bold font-semibold mb-2',
				'textContentBody' : 'text-xl',
				'navbarLinks': 'text-lg text-light no-underline uppercase hover:text-core'
			}
		})
	]
})
