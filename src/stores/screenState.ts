import { defineStore } from 'pinia'

export const useScreenState = defineStore('screenState', {
	state: () => {
		return {
			devicePixelRatio: 0,
			screenWidth: 0,
			screenHeight: 0
		}
	},
	actions: {
		setScreenStates() {
			this.screenWidth = window.innerWidth,
			this.screenHeight = window.innerHeight
			this.devicePixelRatio = Math.min(window.devicePixelRatio, 2)
		}
	}
})


// pixelDensity
// viewPortSize