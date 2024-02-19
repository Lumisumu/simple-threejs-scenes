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
camera.position.y = 1.5;
camera.rotation.x = -0.3;

const directionalLight = new THREE.DirectionalLight(0xffffff, 10);
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
directionalLight.position.set(0, 10, 10);
scene.add(directionalLight, ambientLight);

var model;

//Glass material
const bowlMaterial = new THREE.MeshPhysicalMaterial({
  metalness: 0,
  roughness: 1,
  envMapIntensity: 0.9,
  clearcoat: 1,
  transparent: true,
  transmission: 0.6,
  opacity: 0.7,
  reflectivity: 0.2,
  color: 0x648682,
});

//Water material
const waterMaterial = new THREE.MeshPhysicalMaterial({
  metalness: 0,
  roughness: 1,
  envMapIntensity: 0.9,
  clearcoat: 1,
  transparent: true,
  transmission: 0.6,
  opacity: 0.7,
  reflectivity: 0.2,
  color: 0x94c5ea,
});

//Load model and play animation
loader.load("/scenes/transparent-material/mini-beach.glb", function (gltf) {
  model = gltf.scene;
  scene.add(gltf.scene);

  const bowlModel = gltf.scene.getObjectByName("Bowl");
  const waterModel = gltf.scene.getObjectByName("Water");

  bowlModel.traverse((o) => {
    if (o.isMesh) {
      o.material = bowlMaterial;
    }
  });

  waterModel.traverse((o) => {
    if (o.isMesh) {
      o.material = waterMaterial;
    }
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
  if (resizeRendererToDisplaySize(renderer)) {
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }

  const canvas = renderer.domElement;
  camera.aspect = canvas.clientWidth / canvas.clientHeight;
  camera.updateProjectionMatrix();

  if (model) {
    model.rotation.y += 0.005;
  }

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();
