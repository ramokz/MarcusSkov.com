
<script setup lang="ts">

const props = defineProps({
  content: {
    type: Object,
    required: true
  }
})
const video = ref<HTMLVideoElement>()
let options = {
  root: null,
  rootMargin: '0px',
  threshold: 0.7
}
let pauseOverlay = ref(false)

onMounted(() => {

  const videoObserver = (target: HTMLVideoElement) => {
    const io = new IntersectionObserver((entries)=>{

      entries.forEach(entry=>{

        if (!entry.isIntersecting) {
          pauseOverlay.value = false
          video.value?.pause()

          target.pause()
        }
      })
    }, {
      threshold: 0.6
    })

    io.observe(target)
  }

  videoObserver(video.value as HTMLVideoElement)

})

const playVideo = () => {
  pauseOverlay.value = !pauseOverlay.value

  if (pauseOverlay.value) {
    video.value?.play()
  }
  else {
    video.value?.pause()
  }
}
</script>

<template>
  <div
    ref="mediaContainer"
    class="relative"
  >
    <div
      class="relative mx-auto"
    />
    <div
      :id="props.content.asset.filename"
    >
      <video
        ref="video"
        class="flex max-h-screen-md mx-auto max-w-full cursor-pointer"
        :style="[pauseOverlay ? {'opacity': 1} : {'opacity': 0.2}]"
        loop
        muted
        controls
      >
        <source
          :src="props.content.asset.filename"
          type="video/mp4"
        >
      </video>
      <div
        v-show="!pauseOverlay"
      >
        <div
          class="absolute top-0 w-full h-full cursor-pointer"
          @click="playVideo"
        />
        <svg
          width="64"
          height="64"
          viewBox="0 0 32 32"
          class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        >
          <circle
            cx="16"
            cy="16"
            r="14.5"
            class="stroke stroke-core"
          />
          <path
            d="M23.7876 16.1416L11.8938 23.0085L11.8938 9.27469L23.7876 16.1416Z"
            class="stroke-core stroke-1"
          />
        </svg>
      </div>
    </div>
  </div>
</template>