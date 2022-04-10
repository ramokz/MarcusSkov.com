<script setup lang="ts">

/////////////////////////////
// Imports
/////////////////////////////
import { gsap } from 'gsap'
import { useGlobalStore } from '../stores/globalStore'

/////////////////////////////
// Variables
/////////////////////////////
const globalStore = useGlobalStore()
const modelsLoaded = ref(false)
const loadingOverlay = ref<HTMLDivElement>()
const loadingText = ref<HTMLDivElement>()
const loadingProgress = ref<HTMLDivElement>()
const loadingComplete = ref<HTMLDivElement>()

globalStore.$subscribe(() => {

  if (globalStore.modelsLoaded && !globalStore.loadingComplete) {
    const tl = gsap.timeline({
      delay: 0.3,
      onComplete: () => {
        globalStore.loadingComplete = true
        document.body.style.overflowY = 'visible'
      }
    })

    gsap.set(loadingText.value as HTMLDivElement, {
      display: 'none'
    })

    const largestScreenAspect = Math.max(window.innerWidth, window.innerHeight) * 1.5
    document.body.style.overflowY = 'hidden'

    tl.set(loadingProgress.value as HTMLDivElement, {
      visibility: 'hidden'
    })
      .set(loadingComplete.value as HTMLDivElement, {
        visibility: 'visible'
      })
      .from(loadingComplete.value as HTMLDivElement, {
        width: '100vw',
        height: 2,
        duration: 0.6,
        ease: 'power2. out'
      })
      .to(loadingComplete.value as HTMLDivElement, {
        rotateZ: '45deg',
        duration: 0.6,
        ease: 'power2.inOut'
      })
      .to(loadingComplete.value as HTMLDivElement, {
        width: largestScreenAspect,
        height: largestScreenAspect,
        duration: 0.6,
        ease: 'power2.in'
      })
      .to(loadingOverlay.value as HTMLDivElement, {
        opacity: 0,
        duration: 0.3
      })

  }
})

/////////////////////////////
// Lifecycle Hooks
/////////////////////////////
onMounted(() => {

  gsap.to(loadingOverlay.value as HTMLDivElement, {
    opacity: 1,
    delay: 0.6
  })

  const tl = gsap.timeline({
    repeat: -1,
    repeatDelay: 0,
    defaults: {
      duration: 0.6,
      ease: 'back.out',
      stagger: 0.07
    }
  })

  tl.to('.loading-text', {
    y: -30
  }).to('.loading-text', {
    y: 0
  })
})

</script>

<!--    v-if="!modelsLoaded"-->

<template>
  <div
    v-if="!globalStore.loadingComplete"
    id="loading-overlay"
    ref="loadingOverlay"
    class="
      w-screen
      h-screen
      bg-dark
      fixed
      top-0
    "
  >
    <div
      id="loading-progress"
      ref="loadingProgress"
      class="
        absolute
        top-1/2
        -translate-y-1/2
        mx-auto
        h-2px
        w-full
        bg-core
        scale-x-0
        origin-center
        transition-transform
        duration-50
      "
    />
    <div ref="loadingText">
      <TextSplitter
        string="Loading"
        target-class="loading-text"
        class="
      h3
      absolute
      top-1/2
      left-1/2
      -translate-x-1/2
      -translate-y-1/2
      -mt-32px
    "
      />
    </div>
    <div
      ref="loadingComplete"
      class="
      h-120px
      w-120px
      border-2
      border-core
      absolute
      top-1/2
      left-1/2
      -translate-y-1/2
      -translate-x-1/2
      invisible
    "
    />
  </div>
</template>