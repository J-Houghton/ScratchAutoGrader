import {
  Project,
  Sprite
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

import Stage from "./Stage/Stage.js";
import Ghost from "./Ghost/Ghost.js";
import Casey from "./Casey/Casey.js";

const stage = new Stage({ costumeNumber: 1 });

const sprites = {
  Ghost: new Ghost({
    x: -80.8176,
    y: -70,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 2,
    size: 130,
    visible: true,
    layerOrder: 1
  }),
  Casey: new Casey({
    x: 86.61887545,
    y: 32.85853992,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 4,
    size: 70,
    visible: true,
    layerOrder: 2
  })
};

const project = new Project(stage, sprites, {
  frameRate: 30 // Set to 60 to make your project run faster
});
export default project;
