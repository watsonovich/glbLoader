import {
  Color,
  Scene,
} from "https://unpkg.com/three@0.126.1/build/three.module.js";

function createScene() {
  const scene = new Scene();

  //set background color
  scene.background = new Color("skyblue");
  return scene;
}

export { createScene };
