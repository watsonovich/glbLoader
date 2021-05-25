import { UnsignedByteType } from "https://unpkg.com/three@0.126.1/build/three.module.js";
import { PMREMGenerator } from "https://unpkg.com/three@0.126.1/src/extras/PMREMGenerator.js";
import { RGBELoader } from "https://unpkg.com/three@0.126.1/examples/jsm/loaders/RGBELoader.js";

//Abandoned workshop HDR path
// ./assets/textures/abandoned_workshop_2k.hdr

function createEnvironment(renderer, scene) {
  const pmremGenerator = new PMREMGenerator(renderer);
  pmremGenerator.compileEquirectangularShader();
  new RGBELoader()
    .setDataType(UnsignedByteType)
    .load("./assets/textures/START_CONTRAST_WATSON.hdr", function (texture) {
      var envMap = pmremGenerator.fromEquirectangular(texture).texture;

      scene.environment = envMap;

      texture.dispose();
      pmremGenerator.dispose();
    });

  return pmremGenerator;
}

export { createEnvironment };
