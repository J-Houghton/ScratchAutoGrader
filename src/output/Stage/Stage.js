import {
  Stage as StageBase,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Stage extends StageBase {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("backdrop1", "./Stage/costumes/backdrop1.svg", {
        x: 250,
        y: 187
      }),
      new Costume("backdrop2", "./Stage/costumes/backdrop2.svg", {
        x: 250,
        y: 187
      }),
      new Costume("backdrop3", "./Stage/costumes/backdrop3.svg", {
        x: 250,
        y: 187
      }),
      new Costume("backdrop4", "./Stage/costumes/backdrop4.svg", {
        x: 250,
        y: 187
      }),
      new Costume("backdrop5", "./Stage/costumes/backdrop5.svg", {
        x: 250,
        y: 187
      }),
      new Costume("backdrop6", "./Stage/costumes/backdrop6.svg", {
        x: 250,
        y: 187
      })
    ];

    this.sounds = [
      new Sound("Girl Like You", "./Stage/sounds/Girl Like You.wav")
    ];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whengreenflagclicked),
      new Trigger(Trigger.GREEN_FLAG, this.whengreenflagclicked2)
    ];
  }

  *whengreenflagclicked() {
    while (true) {
      this.costumeNumber++;
      yield* this.wait(0.5);
      yield;
    }
  }

  *whengreenflagclicked2() {
    while (true) {
      yield* this.playSoundUntilDone("Girl Like You");
      yield;
    }
  }
}
