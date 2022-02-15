import * as THREE from 'three'
import { sRGBEncoding } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { gsap } from 'gsap'
import { useScreenState } from '~/stores/screenState'

let scene
let renderer

const isMobile = false

let modelRenderRequest
const projectScenes = []
let controls


interface RenderModal {
    modal: string,
    target: HTMLElement,
    noAnimation: boolean,
    playOnce: boolean
}

/////////////////////////////
// Define the main 3D scene
/////////////////////////////
export const useThreeInit = (canvasRef: HTMLCanvasElement) => {

	onMounted(() => {
	// Canvas reference
		const canvas = unref(canvasRef)
		const screenState = useScreenState()

		const screenChange = () => {
			screenState.setScreenStates()
		}

		screenState.setScreenStates()
		console.log('Hi')
		window.addEventListener('resize', screenChange)

		renderer = new THREE.WebGL1Renderer({
			canvas,
			alpha: true,
			antialias: true
		})

		renderer.setSize(screenState.getViewPortSize.width, screenState.getViewPortSize.height)
		renderer.setPixelRatio(screenState.getDevicePixelRatio)
		renderer.outputEncoding = sRGBEncoding
		scene = new THREE.Scene()
	})
}

export const useMakeThreeScene = (el: HTMLElement) => {
	const scene = new THREE.Scene()

	const camera = new THREE.PerspectiveCamera(
		45,
		2,
		0.1,
		10)
	camera.position.set(0, 0, 3)
	camera.lookAt(0, -0.25, 0)

	const ambientLight = new THREE.AmbientLight(0xffffff, 0.1)

	const keyLight = new THREE.DirectionalLight(0xffffff, 0.5)
	keyLight.position.set(-2, 2, 4)

	// TODO - Might need to be setup as an array
	scene.add(ambientLight, keyLight)

	if(!window.matchMedia('(pointer: coarse)').matches) {
		controls = new OrbitControls(camera, el)
		controls.enablePan = false
		controls.enableZoom = false

		controls.enableDamping = true
		controls.dampingFactor = 0.05
		controls.minAzimuthAngle = -Math.PI / 4
		controls.maxAzimuthAngle = Math.PI / 4
		controls.minPolarAngle = -Math.PI
		controls.maxPolarAngle = Math.PI / 1.5
	} else {
		isMobile = true
	}
}

// export function addToScene() {
//
// }

export function useThreeSetup() {

	const testFunc = () => {
		console.log('Mounted something')
	}

	// onMounted(() => {
	// })
	//
	// onUnmounted(() => {
	//
	// })

	return {
		testFunc
	}
}