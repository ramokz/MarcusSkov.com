<template lang="pug">
div(class="text-2xl text-center") Three Model
</template>

<script setup lang="ts">

import {useThreeSetup} from '~/composables/ModelRender'
import {onMounted} from 'vue'

const props = defineProps({
	content: {
		type: Object,
		required: true
	}
})

// const {testFunc} = useThreeSetup()
//
// onMounted(() => {
//   testFunc()
// })

</script>

<style scoped>

</style>