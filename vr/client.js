// Auto-generated content.
// This file contains the boilerplate to set up your React app.
// If you want to modify your application, start in "index.vr.js"

// Auto-generated content.
import {VRInstance} from 'react-vr-web';
import {Module} from 'react-vr-web';
import * as THREE from 'three';

function init(bundle, parent, options) {
  const scene = new THREE.Scene();

  const cubeModule = new CubeModule();

  const vr = new VRInstance(bundle, 'WelcomeToVR', parent, {
    // Add custom options here
    nativeModules: [ cubeModule ],
    scene: scene,
    cursorVisibility: 'visible',
  });

  const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial()
  );

  const torus = new THREE.Mesh(
    new THREE.TorusGeometry(3, .5),
    new THREE.MeshBasicMaterial()
  );

  cube.position.z = -4;
  torus.position.z = 4;

  scene.add(cube);
  scene.add(torus)

  cubeModule.init([cube, torus]);

  vr.render = function(timestamp) {
    // Any custom behavior you want to perform on each frame goes here
    const seconds = timestamp / 1000;
      cube.position.x = 0 + (1.3 * (Math.cos(seconds)));
      cube.position.y = -2.2 + (1 * Math.abs(Math.sin(seconds)));

      torus.position.x = cube.position.x
      torus.position.y = cube.position.y
  };

  vr.start();
  return vr;
}

export default class CubeModule extends Module {
  // CubeModule is a React Native Module, which implements functionality
  // that can be called asynchronously across the React Native brige.

  // Constructor calls super() with one argument: module name.
  constructor() {
    super('CubeModule');
  }

  // Called directly after the module is created.
  init(cubes) {
    this.cubes = cubes;
  }

  // Change the cube material color to the given value.
  // Called remotely by the CubeModule on the React side.
  changeCubeColor(color) {
    // THREE.Color() accepts either a six-digit hex color or a CSS style.
    // e.g. 0xff0000, 'rgb(255,0,0)', 'red'
    this.cubes.map(cube => {
      cube.material.color = new THREE.Color(color);
    });
  }
}

window.ReactVR = {init};
