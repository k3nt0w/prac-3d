import * as THREE from 'three'
import gravel from '../textures/gravel.jpg'

let camera: THREE.Camera
let scene: THREE.Scene
let renderer: THREE.Renderer
let geometry: THREE.Geometry
let material: THREE.Material
let mesh: THREE.Mesh

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
  material = new THREE.MeshBasicMaterial({
    map: loader.load(gravel)
  })

  mesh = new THREE.Mesh(geometry, material)
  scene.add(mesh)

  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement)
}

function animate() {
  requestAnimationFrame(animate)

  mesh.rotation.x += 0.01
  mesh.rotation.y += 0.02

  renderer.render(scene, camera)
}
