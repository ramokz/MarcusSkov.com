<script setup lang="ts">

useHead({
  title: 'Marcus Skov',
  meta: [
    {
      name: 'description', content: 'My portfolio site'
    }
  ]
})


import { projectPageSetter, projectPageExiter } from '~/composables/ModelRender'
import { useStories } from '~/stores/storyblok'

const router = useRouter()
// const route = useRoute()

// function onEnter(el, done) {
//   switch(route.name){
//     // TODO - Figure out how to get a clean route name for project slugs
//     case 'project-project':
//       // console.log('Entering project page')
//       break
//
//     case 'about':
//       // console.log('Entering about page')
//       break
//
//     default:
//       // console.log('Entering index page')
//       break
//   }
//   done()
// }

/////////////////////////////
// Stores
/////////////////////////////
const stories = useStories()
/////////////////////////////
// Page Names
/////////////////////////////
const indexPage = 'index'
const projectPage = 'project-project'
const aboutPage = 'about'

router.afterEach((to, from) => {

  stories.$patch({
    projectSlug: to.params.project
  })

  /////////////////////////////
  // TODO - Check if needed
  /////////////////////////////
  // if (from.name === indexPage && to.name === projectPage) {
  //   console.log('Going to a project page from the index page')
  // }
  // else if (from.name === projectPage && to.name === indexPage) {
  //   console.log('Returning to the index page from the project page')
  //   projectPageExiter()
  // }
  // else if (to.name === projectPage) {
  //   console.log('Opening project page directly or refreshing')
  // }
  // else if (to.name === indexPage) {
  //   console.log('Opening index page directly or refreshing')
  // }

  // console.log(from)
  // console.log(from.name)
  // console.log(to)
  // console.log(to.params.project)
  // console.log(to.name)
})

</script>

<template>
  <div class="antialiasing">
    <TheHeader />

    <RouterView v-slot="{Component, route}">
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