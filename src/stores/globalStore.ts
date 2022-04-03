import { defineStore } from 'pinia'

export const useGlobalStore = defineStore('globalStore', {
  state: () => {
    return {
      modelsLoaded: false,
      loadingComplete: false,
      seenIntro: false,
      projectListScrollY: 0
    }
  }
})