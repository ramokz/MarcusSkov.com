<script setup lang="ts">

import { useStoryblokApi } from '@storyblok/vue'
const storyblokApi = useStoryblokApi()

const props = defineProps({
  content: {
    type: Object,
    required: true
  }
})

// const assetAlt: string = props.content.asset.alt

  enum assetTypeEnum {
    image = 'image',
    video = 'video',
    three = 'three'
  }

const mediaType = (): assetTypeEnum => {
  const assetTypeString: string = props.content.asset.filename.split('.').pop() as string
  // Defaulting to type image
  let assetTypeVar: assetTypeEnum = assetTypeEnum.image

  switch (assetTypeString) {
    case 'mp4':
      assetTypeVar = assetTypeEnum.video
      break

    case 'glb':
      assetTypeVar = assetTypeEnum.three
  }

  return assetTypeVar
}
let assetColor = computed(() => {
  return props.content.color ? props.content.color.color : 'transparent'
})

const richTextComputed = computed(() => {
  return storyblokApi.richTextResolver.render(props.content.caption)
})

</script>

<template>
    <h3 class="h3 container text-center mx-auto mb-2" v-if="props.content.title">{{props.content.title}}</h3>
    <p class="body w-1/2 mx-auto mb-4 text-center" v-if="richTextComputed" v-html="richTextComputed" />
    <div
      v-if="mediaType() === assetTypeEnum.image"
      :style="{background: assetColor}"
    >
      <img
        class="max-w-full mx-auto block select-none"
        :alt="props.content.asset.alt"
        :src="content.asset.filename"
      >
    </div>
  
    <ProjectContentVideo
      v-else-if="mediaType() === assetTypeEnum.video"
      :content="content"
    />
  
    <ProjectContentThree
      v-else-if="mediaType() === assetTypeEnum.three"
      :model="content.asset.filename"
    />
  
</template>

