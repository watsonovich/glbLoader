import { AxesHelper } from "https://unpkg.com/three@0.126.1/src/helpers/AxesHelper.js";
import { GridHelper } from "https://unpkg.com/three@0.126.1/src/helpers/GridHelper.js";
import { RectAreaLightHelper } from "https://unpkg.com/three@0.126.1/examples/jsm/helpers/RectAreaLightHelper.js";

function createAxesHelper() {
  const helper = new AxesHelper(0.5);
  helper.position.set(-0.5, 0, -0.5);
  return helper;
}

function createGridHelper() {
  const helper = new GridHelper(1);
  return helper;
}

function createRectLigthHelper(light) {
  const helper = new RectAreaLightHelper(light);
  return helper;
}
export { createAxesHelper, createGridHelper, createRectLigthHelper };
