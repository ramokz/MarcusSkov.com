import {defineStore} from "pinia";

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
        getDevicePixelRatio: (state) => {
            return state.devicePixelRatio
        },
        getViewPortSize: (state) => {
            return state.viewPortSize
        }
    }
})


// pixelDensity
// viewPortSize