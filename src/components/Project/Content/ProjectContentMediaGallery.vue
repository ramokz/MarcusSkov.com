<script setup lang="ts">

import { gsap } from 'gsap'

const props = defineProps({
  content: {
    type: Object,
    required: true
  }
})
const modalOpen = ref<boolean>(false)
const mediaElement = ref<HTMLImageElement>(null)
const lightBox = ref<HTMLImageElement>(null)
const lightBoxAlt = ref<string>(null)
const transitionVal = {
  offsetLeft: 0,
  offsetTop: 0,
  mediaElementWidth: 0,
  mediaElementHeight: 0,
  endWidth: 0,
  endHeight: 0
}
const xPos = () => window.innerWidth / 2 - transitionVal.endWidth / 2 - 25 // -25 to make the transition cleaner
const yPos = () => window.innerHeight / 2 - transitionVal.endHeight / 2
const mediaModal = (event: Event) => {

  if (!modalOpen.value && event.target && lightBox.value) {
    mediaElement.value = event.target as HTMLMediaElement

    transitionVal.offsetLeft = mediaElement.value.getBoundingClientRect().left
    transitionVal.offsetTop = mediaElement.value.getBoundingClientRect().top
    transitionVal.mediaElementWidth = mediaElement.value.clientWidth
    transitionVal.mediaElementHeight = mediaElement.value.clientHeight
    transitionVal.endWidth = window.innerWidth / 100 * 90
    transitionVal.endHeight = window.innerHeight / 100 * 90

    lightBox.value.src = mediaElement.value.src
    lightBoxAlt.value = mediaElement.value.alt

    gsap.fromTo(lightBox.value, {
      width: transitionVal.mediaElementWidth,
      height: transitionVal.mediaElementHeight,
      x: transitionVal.offsetLeft,
      y: transitionVal.offsetTop
    }, {
      width: transitionVal.endWidth,
      height: transitionVal.endHeight,
      x: xPos,
      y: yPos,
      duration: 0.3,
      ease: 'power1.out',
      onStart: () => {

        modalOpen.value = true

        gsap.set(lightBox.value, {
          src: mediaElement.value.src,
          visibility: 'inherit'
        })

        gsap.set(mediaElement.value, {
          height: 'auto',
          visibility: 'hidden'
        })

        gsap.set('body', {
          overflow: 'hidden'
        })
      },
      onComplete: () => {
        gsap.set(lightBox.value, {
          width: '90vw',
          height: '90vh',
          x: '-50%',
          y: '-50%',
          left: '50%',
          top: '50%'
        })
      }
    })
  }
  else {
    gsap.fromTo(lightBox.value, {
      width: transitionVal.endWidth,
      height: transitionVal.endHeight,
      x: xPos,
      y: yPos,
      left: null,
      top: null
    }, {
      x: mediaElement.value?.getBoundingClientRect().left,
      y: mediaElement.value?.getBoundingClientRect().top,
      width: mediaElement.value?.clientWidth,
      height: mediaElement.value?.clientHeight,
      duration: 0.2,
      onComplete: () => {

        modalOpen.value = false

        gsap.set('body', {
          overflow: 'inherit'
        })

        gsap.set(lightBox.value, {
          src: null,
          x: null,
          y: null,
          width: null,
          height: null,
          visibility: 'hidden'
        })

        gsap.set(mediaElement.value, {
          visibility: 'initial'
        })
      }
    })
  }
}
</script>

<template>
  <h3
    class="
      h5
      text-center
      text-grey
      opacity-60
      mx-auto
      mb-4
      select-none
  "
  >
    Additional images
  </h3>
  <div
    class="
    container
    grid
    grid-cols-3
    mx-auto
    mb-12
    lg:mb-48
    gap-x-6
    gap-y-6
    items-center
    justify-items-center
  "
  >
    <div
      v-for="media in props.content.media"
      :key="media.id"
      class="h-auto w-full mx-auto flex-size basis-1/4"
      @click="mediaModal"
    >
      <img
        :src="media.filename"
        :alt="media.alt"
        class="
					w-full
					cursor-pointer
					object-contain
					max-h-72
          select-none"
      >
    </div>
  </div>
  <div
    v-show="modalOpen"
    class="fixed z-1 top-0 left-0 opacity-80 w-screen h-screen bg-dark cursor-pointer"
    @click="mediaModal"
  />
  <img
    ref="lightBox"
    src=""
    :alt="lightBoxAlt"
    class="lightBox fixed z-2 top-0 pointer-events-none w-11/12 object-contain"
  >
</template>