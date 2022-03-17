<template>
  <div>
    <span
      v-for="(words, index) in textSplitter(string)"
      :key="index"
      class="inline-block"
    >
      <span
        v-for="(letter, index) in words"
        :key="index"
        class="inline-block text-block"
        :class="[fontClass, targetClass]"
        v-html="letter"
      />
    </span>
  </div>
</template>

<script setup lang="ts">

const props = defineProps({
  string: {
    type: String,
    required: true
  },
  targetClass: {
    type: String,
    required: true
  },
  fontClass: {
    type: String,
    required: false
  }
})
const textSplitter = (text: string) => {
  const projectLetterArray = [...text]
  let wordArray: string[] = []
  let fullArray: Array = []

  projectLetterArray.forEach((letter, index) => {
    if (letter === ' ') {
      wordArray.push('&nbsp;')
      fullArray.push(wordArray)
      wordArray = []
    }
    else if (projectLetterArray.length === index + 1) {
      wordArray.push(letter)
      fullArray.push(wordArray)
    }
    else {
      wordArray.push(letter)
    }
  })

  return fullArray
}

</script>