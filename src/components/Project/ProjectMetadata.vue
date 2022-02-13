<template lang="pug">
div
  h3(class="uppercase") {{title}}
  h3 {{contentString}}
</template>

<script setup lang="ts">

const props = defineProps({
	slug: {
		type: String,
		required: true
	},
	title: {
		type: String,
		required: true
	},
	content: {
		type: [Array, String],
		required: true
	},
	showShowIcon: {
		type: Boolean,
		required: false,
		default: false
	}
})
  
const contentString = computed(() => {
	// Need a type checker to convert array<strings> 
  
	// Studio name
	if (typeof props.content === 'string') {
		return props.content
  
		// Platforms
	} else if (props.showShowIcon) {
		// TODO - Render platform icons
	}
  
	// Roles
	return props.content.join(', ')
})

</script>

<style scoped lang="sass">
 //.project-header
 //  &:nth-child(even)
 //    flex-direction: row-reverse
</style>