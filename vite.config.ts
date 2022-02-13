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
				'@vueuse/head'
			],
			eslintrc: {
				enabled: true, // Default `false`
				filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
				globalsPropValue: true // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
			},
			dts: 'src/auto-imports.d.ts',
		}),
		Components({
			dts: 'src/components.d.ts',
		})
	]
})
