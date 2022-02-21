<script setup lang="ts">

import { gsap } from 'gsap'

const props = defineProps({
	content: {
		type: Object,
		required: true
	}
})

const modalOpen = ref<boolean>(false)
const mediaElement = ref<HTMLMediaElement>()

const lightBox = ref<HTMLMediaElement>()
const lightBoxTarget = ref<HTMLElement>()

const mediaModal = (event: Event) => {


	if (!modalOpen.value && event.target && lightBox.value) {
		mediaElement.value = event.target as HTMLMediaElement

		lightBox.value.src = mediaElement.value.src

		gsap.from(lightBox.value, {
			width: mediaElement.value.clientWidth,
			height: mediaElement.value.clientHeight,
			x: mediaElement.value.getBoundingClientRect().left,
			y: mediaElement.value.getBoundingClientRect().top,
			duration: 0.4,
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
			}
		})
	} else {
		gsap.to(lightBox.value, {
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

<template lang="pug">
div(class="grid grid-cols-3 gap-6 container mx-auto")
    div(class="h-full w-full mx-auto"
        v-for="media in props.content.media"
        :key="media.id"
        @click="mediaModal")
        img(
            :src="media.filename"
            class=`
                w-full
                cursor-pointer
                object-cover
                shadow-xl
            `)
div(
    class="fixed z-1 top-0 left-0 opacity-80 w-screen h-screen bg-dark cursor-pointer"
    @click="mediaModal"
    v-if="modalOpen")
img(ref="lightBox" class="lightBox fixed z-2 top-0 pointer-events-none w-11/12 bg-transparent")
</template>


<style>
/* .lightBox {
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
} */
</style>