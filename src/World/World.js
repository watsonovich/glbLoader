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
import { createEnvironment } from "./components/environment.js";
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

    // Create the env. map which uses an hdr image.
    createEnvironment(renderer, scene);

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

    const grid = createGridHelper();
    const axes = createAxesHelper();
    scene.add(axes, grid);

    axes.visible = false;
    grid.visible = false;

    document
      .getElementById("helperhide")
      .addEventListener("click", function () {
        axes.visible = !axes.visible;
        grid.visible = !grid.visible;
      });
  }

  async init() {
    const { tube, rod, puck, flowControlA, flowControlB, backPanel, secTube } =
      await loadModel();

    // puck.visible = false;
    secTube.visible = false;

    document.getElementById("tubehide").addEventListener("click", function () {
      tube.visible = !tube.visible;
      secTube.visible = !secTube.visible;
    });

    scene.add(tube, rod, puck, flowControlA, flowControlB, backPanel, secTube);
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
