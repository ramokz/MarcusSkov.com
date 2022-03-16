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
          class="text-light no-underline hover:text-core"
        >
          <h3 class="projectYear mx-auto text-center">
            ({{ story.content.year }})
          </h3>
          <h1 class="h1 text-center">
            {{ story.name }}
          </h1>
        </RouterLink>
      </div>
    </div>
  </div>
</template>