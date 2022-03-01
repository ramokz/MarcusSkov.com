<script setup lang="ts">

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const props = defineProps({
  content: {
    type: Object,
    required: true
  }
})
const imagesRefs = ref()
const assetUrls = computed(() => {
  return [props.content.asset_1.filename, props.content.asset_2.filename]
})
const imageMulti = ref()

onMounted(() => {

  // console.log(imageMulti.value)
  // console.log(imageMulti.value.offsetWidth)
  // console.log(imageMulti.value)

  // TODO - Needs proper async await method to check for ref value
  setTimeout(() => {
    // console.log(imagesRefs.value)
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: imageMulti.value,
        start: 'center center',
        end: () => '+=' + imageMulti.value.offsetWidth / 4,
        // markers: true,
        scrub: true,
        pin: true,
        anticipatePin: 1
      }, defaults: {
        ease: 'none'
      }
    })

    tl.fromTo(
          imageMulti.value!.querySelector('.image-after'),
          {
            xPercent: 100, x: 0
          },
          {
            xPercent: 0
          })
      .fromTo(
              imageMulti.value!.querySelector('.image-after img'),
              {
                xPercent: -100, x: 0
              },
              {
                xPercent: 0
              },
              0)
  }, 500)
})

</script>

<template>
  <div
    ref="imageMulti"
    class="
    relative
    max-w-screen
    overflow-hidden"
    :style="{paddingBottom: '56.25%'}"
  >
    <figure class="flex justify-center">
      <div
        v-for="(asset, index) in assetUrls"
        :key="index"
        :class="{'image-after' : index}"
        class="
          container
          w-full
          h-full
          absolute
          not-first:absolute
          not-first:overflow-hidden
          not-first:transform
          not-first:translate-x-full
          not-first:transform
          not-first:children:transform
          not-first:children:-translate-x-full"
      >
        <img
          ref="imagesRefs"
          :src="asset"
          class="
            w-full
            h-full
            absolute
            top-0
            object-contain"
        >
      </div>
    </figure>
  </div>
</template>
