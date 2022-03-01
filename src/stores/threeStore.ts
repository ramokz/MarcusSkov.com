import { defineStore } from 'pinia'
import * as THREE from 'three'

export const useThreeStore = defineStore('threeStore', {
  state: () => {
    return {
      canvas: HTMLCanvasElement,
      scene: THREE.scene,
      renderer: THREE.renderer,
      camera: THREE.PerspectiveCamera,
      projectListPage: true
    }
  }
})