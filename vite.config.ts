import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Pages from 'vite-plugin-pages'
import {VitePWA} from 'vite-plugin-pwa'

import Unocss from 'unocss/vite'


// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),  
		Unocss(),
		Pages({
			extensions: ['vue']
		}),
		VitePWA(),
		AutoImport({
			imports: [
				'vue',
				'vue-router',
				'@vueuse/head',
			],
			dts: 'src/auto-imports.d.ts',
		}),
		Components({
			dts: 'src/components.d.ts',
		})
	]
})
