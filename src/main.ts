import { createApp } from 'vue'
import App from './App.vue'
import { StoryblokVue, apiPlugin } from "@storyblok/vue";
import { createPinia } from 'pinia'
import { createHead } from '@vueuse/head'
import 'uno.css'
const app = createApp(App)

app
    .use(createPinia())
    .use(StoryblokVue, {
        accessToken: import.meta.env.VITE_ACCESS_TOKEN,
        use: [apiPlugin],
    })
    .use(createHead())
    .mount('#app')