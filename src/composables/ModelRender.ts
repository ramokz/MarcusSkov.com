import * as THREE from 'three'
import { sRGBEncoding } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { gsap } from 'gsap'
import { useScreenState } from '~/stores/screenState'

/////////////////////////////
// Variables
/////////////////////////////
let canvas: HTMLCanvasElement
let scene: THREE.scene
let renderer: THREE.renderer
let camera: THREE.PerspectiveCamera
let projectListPage = true
const projectModels: object[] = []
let scrollY: number = window.scrollY
const modelDistance = 4

/////////////////////////////
// Interfaces
/////////////////////////////
interface RenderModal {
    model: string
    domEl: HTMLDivElement
    noAnimation: boolean
    playOnce: boolean
}

/////////////////////////////
// Define the main 3D scene
/////////////////////////////
export const useThreeInit = (canvasRef: HTMLCanvasElement) => {

  canvas = unref(canvasRef)

  const screenState = useScreenState()

  screenState.setScreenStates()

  /////////////////////////////
  // Initial Setup
  /////////////////////////////

  renderer = new THREE.WebGL1Renderer({
    canvas,
    alpha: true,
    antialias: true
  })
  renderer.outputEncoding = sRGBEncoding
  scene = new THREE.Scene()

  const screenChange = () => {
    screenState.setScreenStates()

    camera.aspect = screenState.screenWidth / screenState.screenHeight
    camera.updateProjectionMatrix()

    renderer.setSize(screenState.screenWidth, screenState.screenHeight)

    renderer.setPixelRatio(screenState.getDevicePixelRatio)

  }
  /////////////////////////////
  // Light
  /////////////////////////////
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.1)
  const keyLight = new THREE.DirectionalLight(0xffffff, 0.5)

  keyLight.position.set(-2, 2, 4)
  scene.add(ambientLight, keyLight)

  /////////////////////////////
  // Event Listeners
  /////////////////////////////
  window.addEventListener('resize', screenChange)
  window.addEventListener('scroll', () => {
    scrollY = window.scrollY
  })

  camera = new THREE.PerspectiveCamera(35, screenState.screenWidth / screenState.screenHeight, 0.1, 100)
  camera.position.z = 6

  screenChange()

  scene.add(camera)

  const render = () => {

    if (projectListPage) {
      camera.position.y = -scrollY / screenState.screenHeight * modelDistance
    }
    // / useScreenState.screenHeight * modelCount

    renderer.render(scene, camera)
    window.requestAnimationFrame(render)

  }

  render()

}


/////////////////////////////
// Model Renderer
/////////////////////////////

// TODO - Decide on whether to use interface or class (below)
// interface RenderModelValues {
//     model: string,
//     target?: HTMLElement
//     noAnimation?: boolean,
//     playOnce?: boolean
//   }

// class RenderAnimation {
// 	model: string
// 	target?: HTMLElement
// 	animation: boolean
// 	playOnce: boolean

// 	constructor() {
// 		this.model = ''
// 		this.animation = false
// 		this.playOnce = true
// 	}
// }

export const rotateModel = (modelScene: GLTFLoader) => {
  const duration = 4
  const distance = 0.2

  gsap.fromTo(modelScene.rotation, {
    y: -distance
  }, {
    y: distance,
    duration: duration,
    ease: 'sine.inOut',
    repeat: -1,
    yoyoEase: true
  })
}

export const modelToScene = (model: string) => {
  let modelScene: object
  const gltfLoader = new GLTFLoader()

  gltfLoader.load(model, (gltf: GLTFLoader) => {
    modelScene = gltf.scene

    rotateModel(modelScene)

    scene.add(modelScene)
  })
}

export const projectPageSetter = (index: number) => {
  // console.log(projectModels[index])
  projectListPage = false

  const screenState = useScreenState()

  screenState.setScreenStates()

  // console.log(camera.position.y)

  gsap.to(camera.position, {
    y: -index * 4 - 0.5
  })

  gsap.set(canvas, {
    position: 'absolute'
  })
  // camera.position.y =
  // console.log(camera.position.y)
}

// export const use

export const makeScene = (domEl: HTMLDivElement) => {
  const scene = new THREE.Scene()
  const fov = 45
  const aspect = 2 // the canvas default
  const near = 0.1
  const far = 5
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)

  camera.position.set(0, 0, 3)
  camera.lookAt(0, -0.25, 0)

  const ambientLight = new THREE.AmbientLight( 0xffffff, 0.1)

  scene.add(ambientLight)

  const keyLight = new THREE.DirectionalLight(0xffffff, 0.5)

  keyLight.position.set(-2, 2, 4)
  keyLight.target.position.set(0, 0, 0)
  scene.add(keyLight)

  const fillLight = new THREE.DirectionalLight(0xffffff, 0.4)

  fillLight.position.set(2, 2, 4)
  fillLight.target.position.set(0, 0, 0)
  scene.add(fillLight)

  const backLight = new THREE.DirectionalLight(0xffffff, 1)

  backLight.position.set(0, 0, -4)
  backLight.target.position.set(0, 0, 0)
  scene.add(backLight)

  // controls = new OrbitControls(camera, domEl)
  // controls.enablePan = false
  // controls.enableZoom = false
  //
  // controls.enableDamping = true
  // controls.dampingFactor = 0.05
  // controls.minAzimuthAngle = -Math.PI / 4
  // controls.maxAzimuthAngle = Math.PI / 4
  // controls.minPolarAngle = -Math.PI
  // controls.maxPolarAngle = Math.PI / 1.5

  return {
    scene, camera
    // controls
  }
}

const addScene = (el, fn) => {
  projectModels.push({
    el, fn
  })
}

export const renderModels = (val: RenderModal) => {
  const gltfLoader = new GLTFLoader()

  gltfLoader.load(val.model, (gltf: GLTFLoader) => {
    const renderElement = val.domEl
    const { scene, camera } = makeScene(val.domEl)
    const model = gltf.scene
    const clock = new THREE.Clock()
    const mixer = new THREE.AnimationMixer(model)
    const hasAnimation = false

    // if (!val.noAnimation) {
    //   const tl = gsap.timeline({
    //     repeat: -1,
    //     yoyo: true
    //   })
    //   const duration = 2
    //   const distance = 0.1
    //
    //   tl.fromTo(model.position, {
    //     y: -distance
    //   }, {
    //     y: distance,
    //     duration: duration,
    //     ease: 'sine.inOut',
    //     yoyoEase: true
    //   })
    // }

    // Checks if a model has any animation clips
    // if (gltf.animations[0]) {
    //   hasAnimation = true
    //   gltf.animations.forEach(ani => {
    //     mixer.clipAction(ani).play()
    //   })
    // }

    scene.add(model)

    addScene(renderElement, (time, rect) => {
      camera.aspect = rect.width / rect.height
      camera.updateProjectionMatrix()
      // controls.update()

      if (hasAnimation) {
        const delta = clock.getDelta()

        mixer.update(delta)
      }

      renderer.render(scene, camera)
    })
  },
  undefined,
  function(error) {
    console.error(error)
  }
  )
}

export const addProjectModels = (models: string[]) => {

  const gltfLoader = new GLTFLoader()

  for (let index = 0; index < models.length; index++) {
    const model = models[index]

    gltfLoader.load(model, (gltf: GLTFLoader) => {

      const modelScene = gltf.scene

      rotateModel(modelScene)

      // modelScene.scale.x = 1
      // modelScene.scale.y = 1
      // modelScene.scale.z = 1
      modelScene.position.y = - modelDistance * index

      // if (!val.noAnimation) {
      // 	const tl = gsap.timeline({
      // 		repeat: -1,
      // 		yoyo: true
      // 	})

      scene.add(modelScene)
    })
  }
}