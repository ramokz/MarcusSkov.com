<script setup lang="ts">

import { projectPageSetter, projectPageExiter } from '~/composables/ModelRender'
import { useStories } from '~/stores/storyblok'
import { useGlobalStore } from './stores/globalStore'

useHead({
  title: 'Marcus Skov',
  meta: [
    {
      name: 'description', content: 'My portfolio site'
    }
  ]
})



const globalStore = useGlobalStore()
const router = useRouter()
/////////////////////////////
// Stores
/////////////////////////////
const stories = useStories()
/////////////////////////////
// Page Names
/////////////////////////////
const indexPage = 'index'
const projectPage = 'project'
const aboutPage = 'about'

router.beforeEach((to, from) => {

  stories.$patch({
    projectSlug: to.params.project
  })

  if (from.name === indexPage && to.params.project) {
    // console.log('Going to a project page from the index page')
    globalStore.projectListScrollY = window.scrollY

    projectPageSetter(stories.getProjectIndex(to.params.project))
  }
  else if (from.name === projectPage && to.name === indexPage) {
    // console.log('Returning to the index page from the project page')
    projectPageExiter()
  }
  else if (!from.name && to.name === projectPage) {
    // console.log(stories.projectIndex)
    // console.log('Navigating with history keys')
  }
  else if (to.name !== projectPage && to.name !== indexPage) {
    // console.log('About page')
  }
  else if (to.name === projectPage) {
    projectPageSetter(stories.getProjectIndex(to.params.project), true)
    // console.log('Opening project page directly or refreshing')
  }
})



</script>

<template>
  <div class="antialiasing">
    <!--    <TheHeader />-->

    <RouterView v-slot="{Component}">
      <Transition>
        <Suspense>
          <component :is="Component" />
        </Suspense>
      </Transition>
    </RouterView>
    <Suspense>
      <ProjectModels />
    </Suspense>
  </div>
</template>