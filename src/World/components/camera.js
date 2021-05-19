import { PerspectiveCamera } from "https://unpkg.com/three@0.126.1/build/three.module.js";

function createCamera() {
  const camera = new PerspectiveCamera(
    50, //FOV
    1, //dummy value for aspect
    0.01, //near clipping plane
    100 //far clipping plane
  );

  camera.position.set(0, 0.15, 0.3);

  return camera;
}

export { createCamera };
