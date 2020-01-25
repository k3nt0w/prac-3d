import * as THREE from 'three'
import gravel from '../textures/gravel.jpg'
import water from '../textures/water.png'
import wood from '../textures/wood.jpg'

let camera: THREE.Camera
let scene: THREE.Scene
let renderer: THREE.Renderer
let geometry: THREE.Geometry
let material: THREE.Material
let mesh: THREE.Mesh
let output: HTMLElement | null
let map: THREE.Texture
const width = window.innerWidth
const height = window.innerHeight

type TextureType = 'gravel' | 'water' | 'wood'
let selectedTexture = 'water'

init()
animate()

function init() {
  camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.01,
    10
  )
  camera.position.z = 1
  scene = new THREE.Scene()
  geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2)

  const loader = new THREE.TextureLoader()
  const gravelTexture = loader.load(gravel)
  const waterTexture = loader.load(water)
  const woodTexture = loader.load(wood)

  if (selectedTexture == 'water') {
    map = waterTexture
  } else if (selectedTexture == 'water') {
    map = woodTexture
  }

  material = new THREE.MeshBasicMaterial({
    map
  })

  mesh = new THREE.Mesh(geometry, material)
  scene.add(mesh)
  material.needsUpdate = true
  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)

  document.body.appendChild(renderer.domElement)
  const waterE = document.getElementById('water')
  const woodE = document.getElementById('wood')
  const selectWater = (event: MouseEvent) => {
    console.log('water')
    selectedTexture = 'water'
    mesh.updateMatrix()
  }
  const selectWood = (event: MouseEvent) => {
    console.log('wood')
    selectedTexture = 'wood'
    mesh.updateMatrix()
  }
  waterE?.addEventListener('click', selectWater, false)
  woodE?.addEventListener('click', selectWood, false)
}

function animate() {
  requestAnimationFrame(animate)
  mesh.rotation.x += 0.01
  mesh.rotation.y += 0.02
  renderer.render(scene, camera)
}

function updateDate() {
  if (output) output.textContent = Date()
}
