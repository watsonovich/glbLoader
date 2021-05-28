import { GLTFLoader } from "https://unpkg.com/three@0.126.1/examples/jsm/loaders/GLTFLoader.js";
import { setupModel } from "./setupModel.js";

async function loadModel() {
  const loader = new GLTFLoader();

  const [tubeData, rodData, puckData, flowDataA, flowDataB, secTubeData] =
    await Promise.all([
      loader.loadAsync("./assets/models/TUBE.glb"),
      loader.loadAsync("./assets/models/ROD.glb"),
      loader.loadAsync("./assets/models/PUCK.glb"),
      loader.loadAsync("./assets/models/AS-FS_A.glb"),
      loader.loadAsync("./assets/models/AS-FS_B.glb"),
      // loader.loadAsync("./assets/models/BACK_PANEL.glb"),
      loader.loadAsync("./assets/models/SECTIONED_TUBE.glb"),

      // loader.loadAsync("/assests/models/AS-FS MINI PANEL_v1.glb"),
      // loader.loadAsync("/assests/models/ASPART OCC TEXTURES 20X300.glb"),
    ]);

  // console.log("Pneumatics!", tubeData, rodData, puckData, flowDataA, flowDataB);

  const tube = setupModel(tubeData);
  // tube.position.set(0, 0, 0);
  // tube.scale.set(0.01, 0.01, 0.01);

  const rod = setupModel(rodData);
  // rod.position.set(-.05, 0, 0);
  // rod.scale.set(0.01, 0.01, 0.01);

  const puck = setupModel(puckData);
  // puck.position.set(-.1, 0, 0);
  // puck.scale.set(0.01, 0.01, 0.01);

  const flowControlA = setupModel(flowDataA);
  // flowControlA.position.set(0, 0, 0);
  // flowControlA.scale.set(0.01, 0.01, 0.01);

  const flowControlB = setupModel(flowDataB);
  // flowControlB.position.set(0, 0, 0);
  // flowControlB.scale.set(0.01, 0.01, 0.01);

  // const backPanel = setupModel(panelData);
  // backPanel.position.set(0, 0, 0);
  // backPanel.scale.set(0.01, 0.01, 0.01);

  const secTube = setupModel(secTubeData);
  // tube.position.set(0, 0, 0);
  // tube.scale.set(0.01, 0.01, 0.01);

  return {
    tube,
    rod,
    puck,
    flowControlA,
    flowControlB,
    secTube,
  };
}

export { loadModel };
