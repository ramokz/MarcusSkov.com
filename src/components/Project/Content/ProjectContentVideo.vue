<template lang="pug">
div(ref="mediaContainer")
  div(
    class="relative mx-auto"
  )
    //:style="{width: videoOverlayComputed.width, height: videoOverlayComputed.height}"
    video(
      :id="props.content.asset.filename"
      ref="video"
      class="flex max-h-screen-md mx-auto max-w-full"
      loop muted controls
    )
      source(
        :src="props.content.asset.filename"
        type="video/mp4"
      )
    //.video-overlay(
    //  v-show="videoOverlayVisible"
    //  class="absolute opacity-80 top-0 bg-dark w-full h-full")
    //h2(class="text-white") {{videoOverlayComputed}}
    .video-play
        img(
          ref="videoPlay"
        )
        //src="~/assets/play.svg"

</template>

<script setup lang="ts">

import {computed, onMounted, ref} from 'vue'
import {gsap} from 'gsap'

const props = defineProps({
	content: {
		type: Object,
		required: true
	}})

const videoOverlay = ref()
const video = ref<HTMLVideoElement>()
const videoPlay = ref<HTMLElement>()

let options = {
	root: null,
	rootMargin: '0px',
	threshold: 0.7
}

// const videoOverlayComputed = computed(() => {
//   const videoWidth = `${video.value?.offsetWidth.toString()}px`
//   const videoHeight = `${video.value?.offsetHeight.toString()}px`
//
//   return {width: videoWidth, height: videoHeight}
// })

gsap.registerEffect({
	name: 'videoFade',
	effect: (targets: HTMLElement, config: { opacity: number }) => {
		return gsap.to(targets, {
			duration: 0.4,
			opacity: config.opacity
		})
	}
})



onMounted(() => {

	const videoObserver = (target: HTMLVideoElement) => {
		const io = new IntersectionObserver((entries,observer)=>{
      
			entries.forEach(entry=>{
        
				if (entry.isIntersecting) {
					// console.log('Playing')
          
					// gsap.to(video.value, {
					//   opacity: 1,
					//   duration: 0.4
					// })

					gsap.effects.videoFade(video.value, {opacity: 1})
          
					target.play()
				} else {
					// console.log('Pausing')
          
					gsap.effects.videoFade(video.value, {opacity: 0.2})
            
					// gsap.to(video.value, {
					//     opacity: 0.2,
					//     duration: 0.4
					//   })
          
					target.pause()
				}
			})
		},{
			threshold:0.9
		})

		io.observe(target)
	}
	videoObserver(video.value)


})

const playBtnDur = 0.12
const overlayOpacity = 0.8
const asset = null
const trigger = null

// const playBtn = (shouldPlay : boolean = false, shouldPause : boolean = false) => {
//   if (!video.value) return
//   if (video.value.paused && !shouldPause || shouldPlay) {
//
//     const playbackPromise = video.value.play()
//     if (playbackPromise !== undefined) {
//       playbackPromise.then(_ => {
//         gsap.set([videoOverlay.value, videoPlay.value], {
//           // opacity: 0,
//           visibility: 'hidden',
//           pointerEvents: 'inherit'
//         })
//         video.value.controls = true
//         videoOverlay.value.style.opacity = '0';
//         videoPlay.value.style.opacity = '0'
//       }).catch(err => {
//         console.log(err)
//       })
//     }
//   } else {
//     video.value.pause();
//     gsap.set(videoOverlay.value, {
//       opacity: overlayOpacity,
//       visibility: 'visible',
//       pointerEvents: 'none'
//     })
//     video.value.controls = false
//     // gsap.set(this.$refs.videoPlay, {
//     //   opacity: 1,
//     //   visibility: 'visible'
//     // })
//   }
// }
</script>
