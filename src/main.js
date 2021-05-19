import { World } from "./World/World.js";

//create the main function
async function main() {
  //code to set up the World app will go here
  //1. get a reference to the container element
  const container = document.querySelector("#scene-container");

  //2. create an instance of the World app
  const world = new World(container);

  await world.init();

  //3. render the scene
  //world.render();

  //start the animation loop
  world.start();
}

//call main to start the app
main().catch((err) => {
  console.error(err);
});
