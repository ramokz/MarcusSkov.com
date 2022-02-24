import * as THREE from 'three'
import { sRGBEncoding } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { gsap } from 'gsap'
import { useScreenState } from '~/stores/screenState'

/////////////////////////////
// Variables
/////////////////////////////
let scene: THREE.scene
let renderer: THREE.renderer
let camera: THREE.PerspectiveCamera
const isMobile = false
let modelRenderRequest
const projectScenes = []
let controls

/////////////////////////////
// Interfaces
/////////////////////////////
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
	console.log('Three init')

	const canvas = unref(canvasRef)


	const screenState = useScreenState()
	screenState.setScreenStates()
	renderer = new THREE.WebGL1Renderer({
		canvas,
		alpha: true,
		antialias: true
	})
	renderer.outputEncoding = sRGBEncoding
	scene = new THREE.Scene()

	const directionalLight = new THREE.DirectionalLight('#ffffff', 1)
	directionalLight.position.set(1, 1, 0)
	scene.add(directionalLight)


	const screenChange = () => {
		screenState.setScreenStates()
		camera.aspect = screenState.screenWidth / screenState.screenHeight
		camera.updateProjectionMatrix()

		renderer.setSize(screenState.screenWidth, screenState.screenHeight)
		renderer.setPixelRatio(screenState.getDevicePixelRatio)
	}
	window.addEventListener('resize', screenChange)

	camera = new THREE.PerspectiveCamera(35, screenState.screenWidth / screenState.screenHeight, 0.1, 100)
	camera.position.z = 6

	screenChange()

	scene.add(camera)

	const render = () =>
	{
		renderer.render(scene, camera)
		window.requestAnimationFrame(render)
	}

	render()
}


/////////////////////////////
// Model Renderer
/////////////////////////////
interface RenderModelValues {
    model: string,
    target?: HTMLElement
    noAnimation?: boolean,
    playOnce?: boolean
  }

class RenderAnimation {
	model: string
	target?: HTMLElement
	animation: boolean
	playOnce: boolean

	constructor() {
		this.model = ''
		this.animation = false
		this.playOnce = true
	}
}


export const addModel = (model: string) => {

	const gltfLoader = new GLTFLoader()

	gltfLoader.load(model, (gltf) => {
		// const renderElement = 	model.target
		//   const { scene, camera, controls } = makeScene(val.target)
		const model = gltf.scene

		// const clock = new THREE.Clock()

		// const mixer = new THREE.AnimationMixer(model)
		// const hasAnimation = false

		// if (!val.noAnimation) {
		// 	const tl = gsap.timeline({
		// 		repeat: -1,
		// 		yoyo: true
		// 	})

		// 	const duration  = 2
		// 	const distance  = 0.1

		// tl.fromTo(model.position, {
		//   y: -distance,
		// },{
		//   y: distance,
		//   duration: duration,
		//   ease: 'sine.inOut',
		//   yoyoEase: true
		// })
		// }

		scene.add(model)
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

	// if(!window.matchMedia('(pointer: coarse)').matches) {
	// 	controls = new OrbitControls(camera, el)
	// 	controls.enablePan = false
	// 	controls.enableZoom = false

	// 	controls.enableDamping = true
	// 	controls.dampingFactor = 0.05
	// 	controls.minAzimuthAngle = -Math.PI / 4
	// 	controls.maxAzimuthAngle = Math.PI / 4
	// 	controls.minPolarAngle = -Math.PI
	// 	controls.maxPolarAngle = Math.PI / 1.5
	// } else {
	// 	isMobile = true
	// }
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