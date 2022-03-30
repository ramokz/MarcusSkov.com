import * as THREE from 'three'
import { sRGBEncoding } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { gsap } from 'gsap'
import particleImage from '../assets/particles/circle_01.png'
import Stats from 'stats.js'

let stats: Stats

if (import.meta.env.DEV) {
  console.log('Running dev')

  stats = new Stats()

  stats.showPanel(0) // 0: fps, 1: ms, 2: mb, 3+: custom
  document.body.appendChild(stats.dom)
}

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
// Define the main 3D scene
/////////////////////////////
export const useThreeInit = (canvasRef: HTMLCanvasElement) => {

  canvas = unref(canvasRef)
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

    camera.aspect = document.documentElement.clientWidth / document.documentElement.clientHeight
    camera.updateProjectionMatrix()

    renderer.setSize(document.documentElement.clientWidth, document.documentElement.clientHeight)

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

  }

  /////////////////////////////
  // Event Listeners
  /////////////////////////////
  window.addEventListener('resize', screenChange)
  window.addEventListener('scroll', () => {
    scrollY = window.scrollY
  })

  camera = new THREE.PerspectiveCamera(35, document.documentElement.clientWidth / document.documentElement.clientHeight, 0.1, 100)
  camera.position.z = 6

  screenChange()

  scene.add(camera)

  const particlesCount = 2000
  const positions = new Float32Array(particlesCount * 3)
  const objectsDistance = 6
  const textureLoader = new THREE.TextureLoader()
  const particleTexture = textureLoader.load(particleImage)

  for(let i = 0; i < particlesCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 10
    positions[i * 3 + 1] = objectsDistance * 0.5 + 4 - Math.random() * objectsDistance * 6
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10
  }

  const particlesGeometry = new THREE.BufferGeometry()

  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

  // Material
  const particlesMaterial = new THREE.PointsMaterial({
    color: 0xc0c0c0,
    sizeAttenuation: true,
    size: 0.02
  })

  particlesMaterial.transparent = true
  particlesMaterial.alphaMap = particleTexture
  particlesMaterial.depthTest = false

  // Points
  const particles = new THREE.Points(particlesGeometry, particlesMaterial)

  scene.add(particles)

  const render = () => {

    if (import.meta.env.DEV) {
      stats.begin()
    }

    // const elapsedTime = clock.getElapsedTime()
    // console.log(elapsedTime)

    if (projectListPage) {
      camera.position.y = -scrollY / document.documentElement.clientHeight * modelDistance + 4
      particles.visible = true
    }
    else {
      particles.visible = false
    }

    renderer.render(scene, camera)
    window.requestAnimationFrame(render)

    if (import.meta.env.DEV) {
      stats.end()
    }
  }

  requestAnimationFrame(render)
}

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

let projectSetterTL: GSAPTimeline

export const projectPageSetter = (index: number, noAnimation = false) => {

  projectSetterTL = gsap.timeline()
  projectListPage = false

  if (noAnimation) {
    projectSetterTL.set(camera.position, {
      y: -index * 4 - 0.75
    })
    projectSetterTL.set(canvas, {
      position: 'absolute',
      onStart: () => {
        projectSetterTL.set(canvas, {
          zIndex: 0
        })
      },
      onComplete: () => {
        projectSetterTL.set(canvas, {
          position: 'absolute',
          zIndex: -2,
          delay: 0.8
        })
      }
    })
  }
  else {
    projectSetterTL.to(camera.position, {
      y: -index * 4 - 0.75,
      duration: 0.5,
      onStart: () => {
        projectSetterTL.set(canvas, {
          zIndex: 0
        })
      },
      onComplete: () => {
        projectSetterTL.set(canvas, {
          position: 'absolute',
          delay: 0.8
        })
        projectSetterTL.set(canvas, {
          zIndex: -2,
          delay: 2
        })
      }
    })
  }
  // camera.position.y =
  // console.log(camera.position.y)
}

export const projectPageExiter = () => {

  projectSetterTL.kill()

  /////////////////////////////
  // TODO - Make a smoother transition
  /////////////////////////////
  projectListPage = true
  gsap.set(canvas, {
    position: 'fixed',
    zIndex: -2
  })

}

export const addProjectModels = (models: [{ model: String; texture: String }]) => {

  /////////////////////////////
  // Draco Loader
  /////////////////////////////
  const dracoLoader = new DRACOLoader()
  dracoLoader.setDecoderPath('/draco/gltf/')
  dracoLoader.setDecoderConfig({
    type: 'js'
  })

  /////////////////////////////
  // GLTF Loader
  /////////////////////////////
  const gltfLoader = new GLTFLoader()
  gltfLoader.setDRACOLoader(dracoLoader)

  /////////////////////////////
  // Texture Loader
  /////////////////////////////
  const textureLoader = new THREE.TextureLoader()

  for (let index = 0; index < models.length; index++) {
    const model = models[index].model
    const texture = models[index].texture
    const loadedTexture = textureLoader.load(texture)
    loadedTexture.flipY = false
    loadedTexture.encoding = THREE.sRGBEncoding

    const materialTexture = new THREE.MeshBasicMaterial({
      map: loadedTexture
    })
    materialTexture.alphaMap = loadedTexture

    gltfLoader.load(model, (gltf: GLTFLoader) => {

      const modelScene = gltf.scene
      modelScene.traverse((child: any) => {
        child.material = materialTexture
      })

      projectModels.push(modelScene)

      rotateModel(modelScene)

      // modelScene.scale.x = 2.5
      // modelScene.scale.y = 2.5
      // modelScene.scale.z = 2.5
      modelScene.position.y = - modelDistance * index

      scene.add(modelScene)
    })
  }
}

export const hideProjectModels = () => {

  for (let i = 0; i < projectModels.length; i++) {
    console.log(projectModels[i])
  }
}


