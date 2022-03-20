import { createApp } from 'vue'
import App from './App.vue'
import { StoryblokVue, apiPlugin } from '@storyblok/vue'
import { createPinia } from 'pinia'
import { createHead } from '@vueuse/head'
import { createRouter, createWebHistory } from 'vue-router'
import routes from '~pages'
import Index from './pages/index.vue'
import { useStories } from './stores/storyblok'
import { useGlobalStore } from './stores/globalStore'

// StyleSheet imports
import 'uno.css'
import '@unocss/reset/eric-meyer.css'
import './styles/main.sass'

const app = createApp(App)
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/', name: 'index', component: Index
    },
    {
      path: '/project/:project',
      name: 'project',
      component: () => import('./pages/project/[project].vue'),
      beforeEnter(to, from) {
        const stories = useStories()

        if (stories.projectData.length > 0) {

          const projectPageExists = stories.getProject(to.params.project)

          if (!projectPageExists) {
            return {
              name: '404'
            }
          }
        }
      }
    },
    {
      path: `/${import.meta.env.VITE_ILLUSION}`,
      redirect: to => {
        localStorage.setItem('illusionaryWall', import.meta.env.VITE_ILLUSION as string)
        return {
          path: '/'
        }
      }
    },
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: () => import('./pages/404.vue')
    }
  ],
  scrollBehavior(to, from, savedPosition) {

    if (to.name === 'project') {
      return {
        top: 0
      }
    }
    else {
      const globalStore = useGlobalStore()

      return {
        top: globalStore.projectListScrollY
        // behavior: 'smooth'
      }
    }
  }
})

app
  .use(createPinia())
  .use(router)
  .use(StoryblokVue, {
    accessToken: import.meta.env.VITE_ACCESS_TOKEN,
    use: [apiPlugin]
  })
  .use(createHead())
  .mount('#app')