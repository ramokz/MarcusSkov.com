import * as THREE from 'three'
import { sRGBEncoding } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { gsap } from 'gsap'
import particleImage from '../assets/particles/circle_01.png'
import { useGlobalStore } from '../stores/globalStore'
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
const setModelXPos = (model: any, index: number) => {

  // Changes the 3D layout depending on the screen orientation
  if(window.innerWidth / window.innerHeight <= 1) { // Portrait Mode
    if (projectListPage) {
      model.position.x = 0
      if (window.innerHeight >= 768) {
        // model.position.y = -modelDistance * index - 0.1
        model.position.y = -modelDistance * index - (index * 0.1) + 0.4
      }
      else {
        model.position.y = -modelDistance * index - (index * 0.5)
      }
    }
    else {
      model.position.y = -modelDistance * index + 0.1
    }
  }
  // Landscape Mode
  else {
    if (projectListPage) {
      model.position.x = index % 2 ? -1.25 : 1.25
    }
    model.position.y = -modelDistance * index + 0.1
  }
}

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

    if (projectModels.length > 0) {
      for (let index = 0; index < projectModels.length; index++) {
        setModelXPos(projectModels[index], index)
      }
    }

    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()

    renderer.setSize(window.innerWidth, window.innerHeight)

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

  }

  /////////////////////////////
  // Event Listeners
  /////////////////////////////
  window.addEventListener('resize', screenChange)
  window.addEventListener('scroll', () => {
    scrollY = window.scrollY
  })

  camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 100)
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
      camera.position.y = -scrollY / document.documentElement.clientHeight * modelDistance + 4.2
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
      y: -index * 4 - 0.5
    }).set(canvas, {
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
    projectSetterTL.set('#projectList', {
      visibility: 'hidden'
    })
      .to(camera.position, {
        y: -index * 4 - 0.5,
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
      }).to(projectModels[index].position, {
        x: 0
      }, '0')
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

  for (let index = 0; index < projectModels.length; index++) {
    setModelXPos(projectModels[index], index)
  }

}

export const addProjectModels = (models: [{ model: String; texture: String }]) => {

  document.body.style.overflow = 'hidden'

  /////////////////////////////
  // Variables
  /////////////////////////////
  const globalStore = useGlobalStore()
  const loadingBar: HTMLDivElement = document.querySelector('#loading-progress') as HTMLDivElement
  /////////////////////////////
  // Loaders
  /////////////////////////////
  const dracoLoader = new DRACOLoader()
  dracoLoader.setDecoderPath('/draco/gltf/')
  dracoLoader.setDecoderConfig({
    type: 'js'
  })

  const loadingManager = new THREE.LoadingManager(
    // Loaded
    () => {
      document.body.style.overflowY = 'visible'
      globalStore.modelsLoaded = true
    },
    // Progress
    (itemUrl: string, itemsLoaded: number, itemsTotal: number) => {
      if (loadingBar) {
        window.setTimeout(() => {
          const progressRatio = itemsLoaded / itemsTotal
          loadingBar.style.transform = `scaleX(${progressRatio}`
        }, 500)
      }
    }
  )
  const gltfLoader = new GLTFLoader(loadingManager)
  gltfLoader.setDRACOLoader(dracoLoader)
  const textureLoader = new THREE.TextureLoader(loadingManager)

  for (let i = 0; i < models.length; i++) {
    const model = models[i].model
    const texture = models[i].texture
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

      projectModels[i] = modelScene

      rotateModel(modelScene)
      setModelXPos(modelScene, i)

      // modelScene.scale.x = 2.5
      // modelScene.scale.y = 2.5
      // modelScene.scale.z = 2.5

      scene.add(modelScene)
    })
  }
}

export const hideProjectModels = () => {

  for (let i = 0; i < projectModels.length; i++) {
    console.log(projectModels[i])
  }
}


