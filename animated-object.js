import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const loader = new GLTFLoader();
const scene = new THREE.Scene();
const clock = new THREE.Clock();
let mixer = new THREE.AnimationMixer();
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//Camera and lights
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

const directionalLight = new THREE.DirectionalLight(0xffffff, 10);
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
directionalLight.position.set(0, 10, 10);
scene.add(directionalLight, ambientLight);

//Load model and play animation
loader.load("/model.glb", function (gltf) {
  scene.add(gltf.scene);
  mixer = new THREE.AnimationMixer(gltf.scene);
  const action = mixer.clipAction(
    THREE.AnimationClip.findByName(gltf.animations, "animation1")
  );
  action.play();
});

//Render loop
function animate() {
  const delta = clock.getDelta();
  mixer.update(delta);
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();
