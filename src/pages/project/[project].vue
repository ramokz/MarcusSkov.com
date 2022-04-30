<script setup lang="ts">

/////////////////////////////
// Imports
/////////////////////////////
import { useStoryblok } from '@storyblok/vue'
import { useStories } from '~/stores/storyblok'
import { gsap } from 'gsap'
import { threeProjectPageInit } from '~/composables/ThreeRenderProjectPage'
import { onBeforeRouteLeave } from 'vue-router'
import { useGlobalStore } from '~/stores/globalStore'

/////////////////////////////
// Dynamic Imports
/////////////////////////////
const BackButton = defineAsyncComponent(() => import('../../components/BackButton.vue'))
const ProjectMetadata = defineAsyncComponent(() => import('../../components/project/ProjectMetadata.vue'))
const ProjectDescription = defineAsyncComponent(() => import('../../components/project/content/ProjectDescription.vue'))
const ProjectContentMedia = defineAsyncComponent(() => import('../../components/project/content/ProjectContentMedia.vue'))
const ProjectContentMediaText = defineAsyncComponent(() => import('../../components/project/content/ProjectContentMediaText.vue'))
const ProjectContentMediaGallery = defineAsyncComponent(() => import('../../components/project/content/ProjectContentMediaGallery.vue'))
const ProjectContentSectionHeader = defineAsyncComponent(() => import('../../components/project/content/ProjectContentSectionHeader.vue'))
/////////////////////////////
// Variables
/////////////////////////////
const route = useRoute()
const router = useRouter()
const storyStore = useStories()
const globalStore = useGlobalStore()
globalStore.seenIntro = true
const projectRoute: string = route.params.project as string
const version = import.meta.env.DEV ? 'draft' : 'published'
const projectData = await useStoryblok(`project/${projectRoute}`, {
  version: version
}).catch( () => {
  router.push({
    name: '404'
  })
})
/////////////////////////////
// Refs
/////////////////////////////
const projectContainer = ref<HTMLDivElement>()
const headerBG = ref<HTMLDivElement>()
const headerBGHeight = ref<Number>(0)
const projectHeader = ref<HTMLDivElement>()
const projectContent = ref<HTMLDivElement>()
const projectPageCanvas = ref<HTMLCanvasElement>()

/////////////////////////////
// Methods
/////////////////////////////
const headerBGHeightCalc = () => {
  headerBGHeight.value = document.documentElement.clientHeight / 100 * 65
}
headerBGHeightCalc()

window.addEventListener('resize', () => {
  headerBGHeightCalc()
})

/////////////////////////////
// Lifecycle Hooks
/////////////////////////////
onMounted(() => {
  const projectIndex = storyStore.getAllProjects.findIndex((project: object) => project.slug === route.params.project)

  threeProjectPageInit(projectPageCanvas)

  const tl = gsap.timeline()

  tl.from(headerBG.value, {
    height: 0,
    delay: 0.2,
    duration: 1,
    ease: 'power2.out'
  }).from(projectHeader.value, {
    opacity: 0,
    y: 80,
    duration: 0.7,
    ease: 'power3.out'
  }, '-=0.2 ')
    .from(projectContent.value, {
      opacity: 0,
      duration: 0.3
    })

  if (projectIndex !== storyStore.projectIndex) {
    storyStore.$patch({
      projectIndex: projectIndex
    })
  }
})

onUnmounted(() => {
  window.removeEventListener('resize', headerBGHeightCalc)
})

onBeforeRouteLeave(() => {
  gsap.set(projectContainer.value, {
    visibility: 'hidden'
  })
})

</script>

<template>
  <div
    ref="projectContainer"
    class="-z-4"
  >
    <BackButton v-if="globalStore.loadingComplete" />
    <div
      class="relative -z-5 headerBG"
    >
      <div
        ref="headerBG"
        :style="{backgroundColor: projectData.content.color.color, height: headerBGHeight + 'px'}"
      />
    </div>
    <div
      class="mx-auto px-6"
    >
      <div
        ref="projectHeader"
        class="
          project-header
          container
          mx-auto
          flex
          flex-col
          landscape:flex-row
          mt-10
          mb-32
          items-start
        "
      >
        <div class="flex flex-col landscape:mr-16 mb-12 landscape:mb-0 landscape:w-1/2">
          <h3 class="h3">
            {{ projectData.content.year }}
          </h3>
          <h1 class="h1">
            {{ projectData.name }}
          </h1>
          <div
            class="
            flex
            mt-6
            flex-col
            landscape:md:flex-row
            w-full
            space-y-8 landscape:md:space-y-0
            landscape:md:space-x-8
          "
          >
            <ProjectMetadata
              :title="'Role'"
              :content="projectData.content.role"
            />
            <ProjectMetadata
              :title="'Studio'"
              :content="projectData.content.company"
            />
            <ProjectMetadata
              :title="'Platforms'"
              :content="projectData.content.platforms"
              :show-show-icon="true"
            />
          </div>
        </div>
        <div class="lg:w-1/2">
          <ProjectDescription
            title="About the Project"
            :rich-text="projectData.content.intro"
          />
          <ProjectDescription
            class="mt-8"
            title="My Responsibilities"
            :rich-text="projectData.content.responsibilities"
          />
        </div>
      </div>

      <section ref="projectContent">
        <div
          v-for="content in projectData.content.projectContent"
          :key="content"
        >
          <ProjectContentMedia
            v-if="content.component === 'media'"
            :content="content"
          />
          <ProjectContentMediaText
            v-if="content.component === 'mediaText'"
            class="multi-media"
            :content="content"
          />
          <ProjectContentMediaGallery
            v-if="content.component === 'mediaGallery'"
            :content="content"
          />
          <ProjectContentSectionHeader
            v-if="content.component === 'sectionHeader'"
            :content="content"
          />
        </div>
      </section>
      <div
        class="
        flex
        flex-col
        mx-auto
        h-64
        items-center
        mt-32
        lg:mt-64
      "
      >
        <h3
          class="
            text-5xl
            lg:text-6xl
            font-serif
            mb-12
            select-none
            text-center
            opacity-10
            color-grey
            uppercase
          "
        >
          Thanks for reading
        </h3>

        <router-link
          to="/"
          class="no-underline"
        >
          <div
            class="
            h5
            mx-auto
            p-4
            border-2
            cursor-pointer
            select-none
            border-core
            hover:border-light"
          >
            Back to the project list
          </div>
        </router-link>
      </div>
    </div>
    <canvas
      ref="projectPageCanvas"
      class="absolute left-0 top-0 w-full h-full -z-1 block"
    />
  </div>
</template>
