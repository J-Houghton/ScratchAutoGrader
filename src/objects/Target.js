export class Target {
  constructor(data) {
    this.isStage = data.isStage;
    this.name = data.name;
    this.x = data.x;
    this.y = data.y;
    this.direction = data.direction;
    this.size = data.size;
    // this.currentCostume = currentCostume;
    this.costumes = data.costumes;

    // this.blocks = [];
    // Other properties
    //vars
    //lists
    //broadcasts
    //comments
    //currentCostume
    //customes
    //sounds
    //volume
    //layerOrder
    //tempo
    //videoTransparency
    //videoState
    //textToSpeechLanguage
  }

  addBlock(block) {
    this.blocks.push(block);
  }

  buildAST() {
    return {
      type: 'Target',
      name: this.name,
      blocks: this.blocks.map(block => block.buildAST()),
      // Other properties...
    };
  }
  // Other methods...
}