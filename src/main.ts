import { createApp } from 'vue'
import App from './App.vue'
import { StoryblokVue, apiPlugin } from '@storyblok/vue'
import { createPinia } from 'pinia'
import { createHead } from '@vueuse/head'
import {createRouter, createWebHistory} from 'vue-router'
const app = createApp(App)

import 'uno.css'
import './styles/fonts.sass'
import './styles/main.sass'

app
	.use(createPinia())
	.use(StoryblokVue, {
		accessToken: import.meta.env.VITE_ACCESS_TOKEN,
		use: [apiPlugin],
	})
	.use(createHead())
	.mount('#app')