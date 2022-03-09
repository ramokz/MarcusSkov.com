<script setup lang="ts">

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

</script>

<template>
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

