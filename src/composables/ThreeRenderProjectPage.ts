import * as THREE from 'three'
import { sRGBEncoding } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { gsap } from 'gsap'
import { useScreenState } from '~/stores/screenState'

let canvas: HTMLCanvasElement
let renderer: THREE.renderer
const projectScenes = []
const clearColor = new THREE.Color('#000')

interface sceneElement {
  domEl: HTMLDivElement
  fn: any
}

const sceneElements: sceneElement[] = []
const addSceneToArray = (domEl: HTMLDivElement, fn: any) => {
  sceneElements.push({
    domEl, fn
  })
}
const resizeRendererToDisplaySize = (renderer: THREE.renderer) => {
  const canvas = renderer.domElement
  const width = canvas.clientWidth
  const height = canvas.clientHeight
  const needResize = canvas.width !== width || canvas.height !== height

  if (needResize) {
    renderer.setSize(width, height, false)
  }
  return needResize
}
const render = (time: number) => {
  time *= 0.001

  resizeRendererToDisplaySize(renderer)

  renderer.setScissorTest(false)
  renderer.setClearColor(clearColor, 0)
  renderer.clear(true, true)
  renderer.setScissorTest(true)

  renderer.domElement.style.transform = `translateY(${window.scrollY}px)`

  for (const { domEl, fn } of sceneElements) {
    // get the viewport relative position of this element
    const rect = domEl.getBoundingClientRect()
    const { left, right, top, bottom, width, height } = rect
    const isOffscreen
        = bottom < 0
        || top > renderer.domElement.clientHeight
        || right < 0
        || left > renderer.domElement.clientWidth

    if (!isOffscreen) {
      const positiveYUpBottom = renderer.domElement.clientHeight - bottom

      renderer.setScissor(left, positiveYUpBottom, width, height)
      renderer.setViewport(left, positiveYUpBottom, width, height)

      fn(time, rect)
    }
  }
  requestAnimationFrame(render)
}

export const threeProjectPageInit = (canvasRef: HTMLCanvasElement) => {
  canvas = unref(canvasRef)

  renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true
  })
  renderer.outputEncoding = sRGBEncoding
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

  requestAnimationFrame(render)
}

const makeScene = () => {
  const scene = new THREE.Scene()
  const fov = 45
  const aspect = 2
  const near = 0.1
  const far = 100
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)

  camera.position.set(1, 0, 2)
  camera.lookAt(0, 0, 0)
  scene.add(camera)

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

  return {
    scene, camera
  }
}

export const addModelToScene = (model: string, domEl: HTMLDivElement, noAnimation = false) => {
  const gltfLoader = new GLTFLoader()

  gltfLoader.load(model,
    (gltf: GLTFLoader) => {
      const { scene, camera } = makeScene()
      const model = gltf.scene
      const clock = new THREE.Clock()
      const mixer = new THREE.AnimationMixer(model)
      let hasAnimation = false

      if (!noAnimation) {
        const tl = gsap.timeline({
          repeat: -1,
          yoyo: true
        })
        const duration = 4
        const distance = 0.1

        tl.fromTo(model.position, {
          y: -distance
        }, {
          y: distance,
          duration: duration,
          ease: 'sine.inOut',
          yoyoEase: true
        }).fromTo(model.rotation, {
          y: -0.2
        }, {
          y: 0.2,
          duration: duration,
          ease: 'sine.inOut',
          yoyoEase: true
        }, '<')
      }


      scene.add(model)

      if (gltf.animations[0]) {
        hasAnimation = true
        gltf.animations.forEach((ani: THREE.animations) => {
          mixer.clipAction(ani).play()
        })
      }

      addSceneToArray(domEl, (time: number, rect: any) => {
        camera.aspect = rect.width / rect.height
        camera.updateProjectionMatrix()

        if (hasAnimation) {
          const delta = clock.getDelta()

          mixer.update(delta)
        }


        renderer.render(scene, camera)
      })
    })
}