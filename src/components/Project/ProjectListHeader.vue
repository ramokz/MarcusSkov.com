<script setup lang="ts">

import { gsap } from 'gsap'
import { projectPageSetter } from '~/composables/ModelRender'

const props = defineProps({
  story: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
    required: true
  }
})
const threeFG = ref(null)
const mouseEvent = ref<boolean>(false)
const fadeBackground = (hover: boolean) => {
  if(hover) {
    gsap.to(threeFG.value, {
      opacity: 0,
      duration: 0.8
    })
  }
  else {
    gsap.to(threeFG.value, {
      opacity: 0.5,
      duration: 0.6
    })
  }
}

</script>

<template>
  <div class="relative">
    <div
      ref="threeFG"
      class="bg-dark w-full h-full absolute top-0 opacity-60 -z-1"
    />
    <div
      class="
        container
        project-header
        mx-auto
        flex
        lg:flex-row
        items-center
        h-screen
        even:flex-row-reverse"
    >
      <div class="flex mx-auto">
        <RouterLink
          :to="`/project/${story.slug}`"
          class="projectTitle hover:text-core"
          @mouseenter="fadeBackground(true)"
          @mouseleave="fadeBackground(false)"
        >
          <h3 class="projectYear mx-auto text-center">
            ({{ story.content.year }})
          </h3>
          <h1> {{ story.name }} </h1>
        </RouterLink>
      </div>
    </div>
  </div>
</template>