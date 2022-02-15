import { defineStore } from 'pinia'

export const useScreenState = defineStore('screenState', {
	state: () => {
		return {
			devicePixelRatio: 0,
			viewPortSize: {
				width: 0,
				height: 0
			}
		}
	},


	getters: {
		getViewPortSize: (state) => {
			return state.viewPortSize
		},
		getDevicePixelRatio: (state) => {
			return state.devicePixelRatio
		}
	},
	actions: {
		setScreenStates() {
			this.viewPortSize = {
				width: window.innerWidth,
				height: window.innerHeight
			}
			this.devicePixelRatio = Math.min(window.devicePixelRatio, 2)
		}
	}
})


// pixelDensity
// viewPortSize