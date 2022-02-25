<script setup lang="ts">

useHead({
	title: 'Marcus Skov',
	meta: [
		{ name: 'description', content: 'My portfolio site' }
	]
})

</script>

<template lang="pug">
div(class="antialiasing")
	TheHeader
	RouterView
	Suspense
		ProjectList
</template>