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

    const { ambientLight, mainLight, hemiLight, recLight, frontLight } =
      createLights();
    // const train = new Train();

    recLight.add(createRectLigthHelper(recLight));
    frontLight.add(createRectLigthHelper(frontLight));

    mainLight.visible = true;
    ambientLight.visible = true;
    hemiLight.visible = true;
    recLight.visible = true;
    frontLight.visible = true;

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

  //2. render the scene
  render() {
    //draw a single frame
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
