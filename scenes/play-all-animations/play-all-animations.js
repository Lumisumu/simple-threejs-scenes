import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const loader = new GLTFLoader();
const scene = new THREE.Scene();
const clock = new THREE.Clock();
let mixer = new THREE.AnimationMixer();

const canvas = document.querySelector("#c");
const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });

const fov = 75;
const aspect = 2; // the canvas default
const near = 0.1;
const far = 10;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 5;

const directionalLight = new THREE.DirectionalLight(0xffffff, 10);
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
directionalLight.position.set(0, 10, 10);
scene.add(directionalLight, ambientLight);

//Load model and play animation
loader.load("/scenes/play-all-animations/letters.glb", function (gltf) {
  scene.add(gltf.scene);
  mixer = new THREE.AnimationMixer(gltf.scene);
  const clips = gltf.animations;

  clips.forEach(function (clip) {
    mixer.clipAction(clip).play();
  });
});

function resizeRendererToDisplaySize(renderer) {
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
  }
  return needResize;
}

//Render loop
function animate() {
  const delta = clock.getDelta();

  if (resizeRendererToDisplaySize(renderer)) {
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }

  const canvas = renderer.domElement;
  camera.aspect = canvas.clientWidth / canvas.clientHeight;
  camera.updateProjectionMatrix();

  mixer.update(delta);
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();
