import { loadModel } from "./components/actuatorParts/actuator.js";
import { createCamera } from "./components/camera.js";
import {
  createAxesHelper,
  createGridHelper,
  createRectLigthHelper,
} from "./components/helpers.js";
import { createLights } from "./components/lights.js";
import { createScene } from "./components/scene.js";
import { createControls } from "./systems/controls.js";
import { createRenderer } from "./systems/renderer.js";
import { Resizer } from "./systems/Resizer.js";
import { Loop } from "./systems/Loop.js";

//temporary to try the environment map
// import { createEnvironment } from "./components/environment.js";
import { UnsignedByteType } from "https://unpkg.com/three@0.126.1/build/three.module.js";
import { PMREMGenerator } from "https://unpkg.com/three@0.126.1/src/extras/PMREMGenerator.js";
import { RGBELoader } from "https://unpkg.com/three@0.126.1/examples/jsm/loaders/RGBELoader.js";

//create module scoped variables not accessible outside the World app

let camera;
let controls;
let renderer;
let scene;
let loop;

class World {
  //1. create and instance of the World app
  constructor(container) {
    camera = createCamera();
    renderer = createRenderer();
    scene = createScene();
    loop = new Loop(camera, scene, renderer);
    container.append(renderer.domElement);
    controls = createControls(camera, renderer.domElement);

    // Create the env. map using hdr image.

    const pmremGenerator = new PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();
    new RGBELoader()
      .setDataType(UnsignedByteType)
      .load("./assets/textures/abandoned_workshop_2k.hdr", function (texture) {
        var envMap = pmremGenerator.fromEquirectangular(texture).texture;

        scene.environment = envMap;

        texture.dispose();
        pmremGenerator.dispose();
      });

    // declare and create lights for the scene

    const { ambientLight, mainLight, hemiLight, recLight, frontLight } =
      createLights();

    recLight.add(createRectLigthHelper(recLight));
    frontLight.add(createRectLigthHelper(frontLight));

    mainLight.visible = false;
    ambientLight.visible = false;
    hemiLight.visible = true;
    recLight.visible = false;
    frontLight.visible = false;

    loop.updatables.push(controls);

    scene.add(ambientLight, mainLight, hemiLight, recLight, frontLight);

    const resizer = new Resizer(container, camera, renderer);
    scene.add(createAxesHelper(), createGridHelper());
  }

  async init() {
    const { tube, rod, puck, flowControlA, flowControlB } = await loadModel();

    puck.visible = true;
    tube.metalness = 0.1;
    tube.roughness = 0.5;

    scene.add(tube, rod, puck, flowControlA, flowControlB);
  }

  // render the scene
  render() {
    renderer.render(scene, camera);
  }

  start() {
    loop.start();
  }

  stop() {
    loop.stop();
  }
}

export { World };
