<template lang="pug">
div(v-if="mediaType() === assetTypeEnum.image"
    :style="{background: assetColor}"
    class="flex")
  img(:alt="assetAlt" :src="asset" class="container mx-auto")
  
ProjectContentVideo(
  :content="content"
  v-if="mediaType() === assetTypeEnum.video")

ProjectContentThree(
  v-if="mediaType() === assetTypeEnum.three"
  :content="content")

</template>

<script setup lang="ts">

const props = defineProps({
	content: {
		type: Object,
		required: true
	}
})
  
const asset: string = props.content.asset.filename
const assetAlt: string = props.content.asset.alt
  
  enum assetTypeEnum {
    image = 'image',
    video = 'video',
    three = 'three'
  }
  
const mediaType = (): assetTypeEnum => {
	const assetTypeString: string = asset.split('.').pop() as string
    
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
  
let assetColor  = ''
  
if (props.content.color && props.content.color.color) {
	assetColor = props.content.color.color
}

</script>