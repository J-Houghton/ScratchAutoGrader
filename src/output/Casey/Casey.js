import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Casey extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("cassy-dancing-1", "./Casey/costumes/cassy-dancing-1.png", {
        x: 66,
        y: 200
      }),
      new Costume("cassy-dancing-2", "./Casey/costumes/cassy-dancing-2.png", {
        x: 66,
        y: 200
      }),
      new Costume("cassy-dancing-3", "./Casey/costumes/cassy-dancing-3.png", {
        x: 124,
        y: 200
      }),
      new Costume("cassy-dancing-4", "./Casey/costumes/cassy-dancing-4.png", {
        x: 116,
        y: 200
      })
    ];

    this.sounds = [];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whengreenflagclicked),
      new Trigger(Trigger.GREEN_FLAG, this.whengreenflagclicked2)
    ];
  }

  *whengreenflagclicked() {
    while (true) {
      yield* this.wait(0.5);
      this.costumeNumber++;
      yield;
    }
  }

  *whengreenflagclicked2() {
    yield* this.wait(4);
  }
}
