<script setup lang="ts">

import AndroidIcon from '~/assets/platform/Android-icon.svg'
import iOSIcon from '~/assets/platform/iOS-icon.svg'
import PlaystationIcon from '~/assets/platform/Playstation-icon.svg'
import SteamIcon from '~/assets/platform/Steam-icon.svg'
import TVIcon from '~/assets/platform/TV-icon.svg'
import tvOSIcon from '~/assets/platform/tvOS-icon.svg'
import WebIcon from '~/assets/platform/Web-icon.svg'
import WindowsIcon from '~/assets/platform/Windows-icon.svg'
import XboxIcon from '~/assets/platform/Xbox-icon.svg'

const props = defineProps({
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
// const getPlatformIcon = (iconName: string) => {
//   return new URL(`./../${iconName}-icon.svg`, import.meta.url)
// }

// console.log(getPlatformIcon('TV'))

const contentString = computed(() => {
  // Need a type checker to convert array<strings>

  // Studio name
  if (typeof props.content as string === 'string') {
    return props.content
  }

  // Roles
  return props.content.join(' & ')
})

// console.log(tvOSIcon)

// if (props.showShowIcon) {
//   console.log(props.content[0])
//   console.log(getPlatformIcon(props.content[0]))
// }

const platformIcon = computed(() => {

  const platformArray = []

  if (props.showShowIcon) {
    for (let i = 0; i < props.content.length; i++) {
      switch (props.content[i]) {
        case 'Android':
          platformArray.push(AndroidIcon)
          break

        case 'iOS':
          platformArray.push(iOSIcon)
          break

        case 'Playstation':
          platformArray.push(PlaystationIcon)
          break

        case 'Steam':
          platformArray.push(SteamIcon)
          break

        case 'TV':
          platformArray.push(TVIcon)
          break

        case 'tvOS':
          platformArray.push(tvOSIcon)
          break

        case 'Web':
          platformArray.push(WebIcon)
          break

        case 'Windows':
          platformArray.push(WindowsIcon)
          break

        case 'Xbox':
          platformArray.push(XboxIcon)
          break
      }
    }
  }
  return platformArray
})

</script>
<template>
  <div class="flex flex-col">
    <div>
      <h3 class="uppercase h5">
        {{ title }}
      </h3>
      <div class="divider" />
    </div>
    <h4
      v-if="!props.showShowIcon"
      class="font-bold h4"
    >
      {{ contentString }}
    </h4>
    <div
      v-if="props.showShowIcon"
      class="flex space-x-2"
    >
      <img
        v-for="icon in platformIcon"
        :key="icon"
        :src="icon"
        :alt="`${icon}`"
        height="32"
        width="32"
      >
    </div>
  </div>
</template>