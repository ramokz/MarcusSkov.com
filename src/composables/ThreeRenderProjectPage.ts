import * as THREE from 'three'
import { sRGBEncoding } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { makeScene } from './ModelRender'


let canvas: HTMLCanvasElement
let scene: THREE.scene
let renderer: THREE.renderer
let camera: THREE.PerspectiveCamera



export const makeScene = (domEl: HTMLDivElement) => {
  const scene = new THREE.Scene()
  const fov = 45
  const aspect = 2 // the canvas default
  const near = 0.1
  const far = 5
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)

  camera.position.set(0, 0, 3)
  camera.lookAt(0, -0.25, 0)
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

export const renderModels = (model: string, domEl: HTMLDivElement, noAnimation?: boolean, playOnce?: boolean) => {
  const gltfLoader = new GLTFLoader()

  // console.log(model)

  gltfLoader.load(model, (gltf: GLTFLoader) => {
    const renderElement = domEl
    const { scene, camera } = makeScene(domEl)
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

      // if (hasAnimation) {
      //   const delta = clock.getDelta()
      //
      //   mixer.update(delta)
      // }

      renderer.render(scene, camera)
    })
  },
  undefined,
  function(error) {
    console.error(error)
  }
  )
}