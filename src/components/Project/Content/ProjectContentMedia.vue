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
    class="flex"
  >
    <img
      :src="content.asset.filename"
      class="container mx-auto shadow-xl"
    >
  </div>

  <ProjectContentVideo
    v-if="mediaType() === assetTypeEnum.video"
    :content="content"
  />

<!--  TODO - Setup with correct -->
<!--  <ProjectContentThree-->
<!--    v-if="mediaType() === assetTypeEnum.three"-->
<!--    :content="content"-->
<!--  />-->
</template>

