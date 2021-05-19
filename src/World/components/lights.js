import {
  DirectionalLight,
  AmbientLight,
  HemisphereLight,
  RectAreaLight,
} from "https://unpkg.com/three@0.126.1/build/three.module.js";

function createLights() {
  //create a light
  const mainLight = new DirectionalLight("white", 1);
  //move the light away from the origin
  mainLight.position.set(0, 1, 1);

  const hemiLight = new HemisphereLight("white", "darkslategrey", 0.5);
  hemiLight.position.set(0, 4, 0);

  const ambientLight = new AmbientLight("white", 2);

  const recLight = new RectAreaLight("blue", 4, 1, 1);
  recLight.position.set(3.5, 2.5, 3.5);
  recLight.lookAt(0, 1.5, 0);

  const frontLight = new RectAreaLight(0xffffff, 2, 3, 2);
  frontLight.position.set(0, 2.5, 4);
  frontLight.lookAt(0, 1.5, 0);

  //const bottomLight = new DirectionalLight('white', 5);
  //bottomLight.position.set(0,-4, 0);

  //camera light position will remain at 0,0,0 because it will be added to the camera, not the scene.
  //const cameraLight = new DirectionalLight('red', 8);

  return {
    hemiLight,
    ambientLight,
    mainLight,
    recLight,
    frontLight,
  };
}

export { createLights };
