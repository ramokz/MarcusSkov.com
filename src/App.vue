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

router.beforeEach((to, from) => {

  stories.$patch({
    projectSlug: to.params.project
  })

  /////////////////////////////
  // TODO - Check if needed
  /////////////////////////////
  if (from.name === indexPage && to.name === projectPage) {
    // console.log(stories.projectIndex)
    // console.log('Going to a project page from the index page')
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
  // else if (to.name === indexPage) {
  //   console.log('Opening index page directly or refreshing')
  // }

  // if (stories.projectIndex >= 0) {
  //   if (to.name === projectPage) {
  //     projectPageSetter(stories.projectIndex)
  //   }
  // }

  // console.log(from)
  // console.log(`Coming from ${String(from.name)}`)
  // console.log(`Going to ${String(to.name)}`)
  // console.log(to)
  // console.log(to.params.project)
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