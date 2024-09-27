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

const terrainFolder = gui.addFolder('Terrain')
terrainFolder.add(terrain, 'width', 1, 20, 1).name('Width')
terrainFolder.add(terrain, 'height', 1, 20, 1).name('Height')
terrainFolder.addColor(terrain.material, 'color').name('Colour')
terrainFolder.onChange(() => {
  terrain.createGeometry()
})