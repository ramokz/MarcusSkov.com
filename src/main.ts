import { createApp } from 'vue'
import App from './App.vue'
import { StoryblokVue, apiPlugin } from '@storyblok/vue'
import { createPinia } from 'pinia'
import { createHead } from '@vueuse/head'
import { createRouter, createWebHistory } from 'vue-router'
import routes from '~pages'

// StyleSheet imports
import 'uno.css'
import '@unocss/reset/eric-meyer.css'
import './styles/main.sass'

const app = createApp(App)
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
	  return {
      top: 0,
      behavior: 'smooth'
    }
  }
})

app
  .use(createPinia())
  .use(StoryblokVue, {
    accessToken: import.meta.env.VITE_ACCESS_TOKEN,
    use: [apiPlugin]
  })
  .use(createHead())
  .use(router)
  .mount('#app')