const setSize = (container, camera, renderer) => {
  //set the camera's aspect ratio
  camera.aspect = container.clientWidth / container.clientHeight;
  //update the frustrum
  camera.updateProjectionMatrix();
  //update the size of the renderer AND the canvas
  renderer.setSize(container.clientWidth, container.clientHeight);
  //set pixel ration for mobile devices
  renderer.setPixelRatio(window.devicePixelRatio);
};

class Resizer {
  constructor(container, camera, renderer) {
    // set initial size on load
    setSize(container, camera, renderer);

    window.addEventListener("resize", () => {
      //set sizes again if a resize occurs
      setSize(container, camera, renderer);

      //perform any custom action
      this.onResize();
    });
  }

  onResize() {}
}

export { Resizer };
