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
  // else if (to.name === projectPage) {
  //   projectPageSetter(stories.getProjectIndex(to.params.project), true)
  //   // console.log('Opening project page directly or refreshing')
  // }
})
</script>

<template>
  <div class="antialiasing">
    <!--    <TheHeader />-->

    <RouterView v-slot="{Component}">
      <Suspense>
        <component :is="Component" />
      </Suspense>
    </RouterView>
    <Suspense>
      <ProjectModels />
    </Suspense>
    <div class="flex mx-auto container justify-center mb-6">
      <a
        href="https://github.com/MarcusSkov/MarcusSkov.com"
        target="_blank"
        class="
        container
        flex
        items-center
        justify-center
        space-x-2
        mt-32
        no-underline
        color-grey
        fill-grey
        opacity-20 hover:opacity-80
    "
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 32 32"
        >
          <path
            d="M16 2.21607C7.99292 2.21607 1.5 8.70755 1.5 16.7161C1.5 23.1223 5.65469 28.5575 11.416 30.4748C12.1406 30.6091 12.4067 30.1603 12.4067 29.7773C12.4067 29.4318 12.3932 28.2893 12.387 27.0777C8.35309 27.9548 7.50189 25.3669 7.50189 25.3669C6.8423 23.6911 5.89192 23.2452 5.89192 23.2452C4.57634 22.3453 5.99109 22.3638 5.99109 22.3638C7.44714 22.4661 8.21383 23.8583 8.21383 23.8583C9.50708 26.0748 11.6059 25.4339 12.4333 25.0634C12.5637 24.1265 12.9393 23.4866 13.3539 23.1245C10.1333 22.7581 6.74769 21.5145 6.74769 15.9585C6.74769 14.3757 7.31412 13.0822 8.24168 12.0667C8.09113 11.7013 7.59481 10.2265 8.38239 8.22925C8.38239 8.22925 9.6 7.83978 12.3707 9.71579C13.5273 9.39452 14.7677 9.2334 16 9.22764C17.2323 9.2334 18.4737 9.39452 19.6324 9.71579C22.4 7.83978 23.6159 8.22925 23.6159 8.22925C24.4052 10.2265 23.9089 11.7013 23.7583 12.0667C24.688 13.0822 25.2504 14.3757 25.2504 15.9585C25.2504 21.528 21.8583 22.754 18.6295 23.1129C19.1496 23.5629 19.613 24.4453 19.613 25.7981C19.613 27.7383 19.5964 29.2997 19.5964 29.7773C19.5964 30.1634 19.8572 30.6155 20.5922 30.4732C26.3506 28.5537 30.5 23.1204 30.5 16.7161C30.5 8.70755 24.008 2.21607 16 2.21607Z"
          />
        </svg>
        <h5 class="font-semibold mt-1 text-base uppercase">Site Source Code</h5>
      </a>
    </div>
  </div>
</template>