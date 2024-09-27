import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

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
  renderer.render( scene, camera )
}