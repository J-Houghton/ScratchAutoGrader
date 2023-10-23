import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Ghost extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("ghost-d", "./Ghost/costumes/ghost-d.svg", {
        x: 77.614,
        y: 68.13078652010829
      }),
      new Costume("ghost-d2", "./Ghost/costumes/ghost-d2.svg", {
        x: 77.61399999999998,
        y: 68.13077978016244
      })
    ];

    this.sounds = [
      new Sound("space ripple", "./Ghost/sounds/space ripple.wav")
    ];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whengreenflagclicked)
    ];
  }

  *whengreenflagclicked() {
    while (true) {
      this.costumeNumber++;
      yield* this.glide(0.5, -80, -70);
      this.costumeNumber++;
      yield* this.glide(0.5, -120, -70);
      yield;
    }
  }
}
