import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import Stats from 'three/addons/libs/stats.module.js'
import GUI from 'lil-gui'
import { Terrain } from './terrain'

const gui = new GUI
const stats = new Stats()
document.body.appendChild(stats.dom)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setAnimationLoop(animate)
document.body.appendChild(renderer.domElement)

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)
const controls = new OrbitControls( camera, renderer.domElement )

const terrain = new Terrain(10, 10)
scene.add(terrain)

const sun = new THREE.DirectionalLight()
sun.position.set(1, 2, 3)
scene.add(sun)
const ambient = new THREE.AmbientLight()
ambient.intensity = 0.5
scene.add(ambient)

const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshStandardMaterial({ color: 0xff4500 })
const cube = new THREE.Mesh(geometry, material)

scene.add(cube)
camera.position.z = 5
controls.update()

function animate() {
  controls.update()
  stats.update()
  renderer.render( scene, camera )
}

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerHeight, window.innerWidth)
})

const folder = gui.addFolder('Cube')
folder.add(cube.position, 'x', -2, 2, 0.1).name('X Position')
folder.add(cube.position, 'y', -2, 2, 0.1).name('Y Position')
folder.add(cube.position, 'z', -2, 2, 0.1).name('Z Position')
folder.addColor(cube.material, 'color').name('Colour')