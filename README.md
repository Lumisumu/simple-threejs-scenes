# Simple Three.js Scenes

## Install project and run in web browser

Install npm if you don't have it already: https://nodejs.org/

Open cmd, navigate to project root and run installs for Three.js and Vite:

```
npm install --save three
```

```
npm install --save-dev vite
```

Run in browser:

```
npx vite
```

## Blender Exporting Tips

Export as glTF 2.0 (.glb/.gltf). Only export selected items, do not export camera and lights. Object materials are included and exported by default and Three.js adds them to the model when loaded into the scene.

Animation clip ends to the last keyframe even if end frame far after that. If you want idle time before the animation restarts, you can either play an idle animation in between or add an extra keyframe at the end frame.

## Learning Resources

https://threejs.org/manual/

https://threejs.org/docs/
